const Store = require('../repository/dbRepository');
const Validate = require('../utils/validations');
const Schema = require('../models/orderModel');
const AddressSchema = require('../models/addressModule');


/* Place order
@params
    1) cartId: "cartId where products are placed",
    2) Shipping_address: "Address of customer", addressObject
    3) payments: "Payments Details", paymentObject
@returns
    @if(placed order sucessfully)
        return order_details
    @else
        return error
*/

const place_order = async(cartId, shipping_address, paymentType, shipmentType) =>{
    try{
        const cart = await Store.cart.find_cart(cartId);
        if(!cart) throw new Error(`NO Cart Found For ID: ${cartId}`);
        if(cart.status !== "active") throw new Error(`Cart has been Placed for order`)
        const address = AddressSchema.Address(shipping_address);
        const order = Schema.Order(cart, address, paymentType, shipmentType);

        for (product of cart.products){
           await Store.product.update_quantity(product.productId, product.quantity, "decrease");
        }
        cart.status = "deactive"; // change status of cart or delete cart
        // Store.cart.delete_cart(cartId);
        if(Store.order.place_order(order) ){
            console.log(`Your order has been placed with order Id : ${order.id}`);
        }
    }catch (err){
        console.log(`${err.name} => ${err.message}`)
    }
}

const shipping_address = {
    "country": "Nepal",
    "province": "3",
    "city": "abc",
    "ward": 23,
    "tole": "xyz",
    "houseNo": 12
    }

// place_order("307a5463-b654-4be3-8538-496bfee01a10", shipping_address, "CASH", "International");

const update_quantity_order = async(orderID, product, action) =>{
    try{
        const order = await Store.order.read_order_from_id(orderID);
        const product_res = await Store.product.find_product(product.productId);

        switch (action) {
            case "add":
                if(product.quantity <= product_res.quantity){
                    for(var oldProduct of order.products){
                        if(oldProduct.productId === product.productId){
                            oldProduct.quantity += product.quantity;
                            order.totalBill += product.quantity*product_res.price;
                            Store.product.update_quantity(product.productId, product.quantity, "decrease");
                            if(Store.order.update_order(orderID, order)){
                                console.log("Quantity in order has been added sucessfully");
                                return;
                            }
                            throw new Error(`Error Occurs while Placing Order`);
                        }
                    }
                    throw new Error(`No product found for ID: ${product.productId} on order  ID: ${orderID}`)
                }
                throw new Error(`Entered number of quantity is not sufficient in store`);

            case "remove":
                    for(var oldProduct of order.products){
                        if(oldProduct.productId === product.productId && product.quantity <= oldProduct.quantity){
                            oldProduct.quantity -= product.quantity;
                            order.totalBill -= product.quantity*product_res.price;
                            Store.product.update_quantity(product.productId, product.quantity, "increase");

                            if(Store.order.update_order(orderID, order)){
                                console.log("Quantity from order has been decreased sucessfully");
                                return;
                            }
                            throw new Error(`Error Occurs while Placing Order`);
                        }
                    }
                    throw new Error(`Entered quantity must be lessthan or equal to orderd quantity.`)        
        }
    }catch(err){
        console.log(`${err.name} => ${err.message}`);
    }
}
update_quantity_order("3486b83f-44da-4b28-96a3-858c6db79b72", {productId: "bfb17318-a9e4-41e3-b6b1-6ed9e745c4ed", "quantity": 5}, "add")


/* Update Address
@params
    1) orderId : Unique Id of order,
    2) new_address: object containing new address, addressObject
@returns
    @if(sucessfully update)
        returns updated address
    @else
        return error
*/
const update_address = async(orderID ,new_address) => {
    try{
        const order = await Store.order.read_order_from_id(orderID);
        const {error, value} = Validate.Updatable_address_validation(new_address);
        if(error) throw error;
        const address = value;
        for(key in address){
            if((address[key]).length !== 0){               
                order.shipping_address[key] = address[key];
            }
        }
        if(Store.order.update_order(orderID, order)){
            console.log("Address Updated Sucessfully");
        } 
        
    }catch(err){
        console.log(`${err.name} => ${err.message}`);
    }
}

const new_address = {
    "country": "Nepal",
    "province": "Bagmati",
    "city": "Lalitpur",
    "ward": "23",
    "tole": "Dhapakhel",
    "house_no": 42
    }
// update_address("cb0341f6-b038-4b7d-b609-f806cb3eef3c", new_address);

/* Update Payment 
@params
    1) orderID: Unique Id,
    2) new_payment: Object containing payment details, paymentObject
@returns
    @if(Sucessful updated)
        return sucess_message
    @else
        return error
*/
const update_payment = async(orderID, new_payment) => {
    try{
        const order = await Store.order.read_order_from_id(orderID);
        const PAYMENT_TYPES = ['E-sewa', 'Khalti', 'CONNECT-IPS', 'CASH']
        
        if(!PAYMENT_TYPES.includes(new_payment.type)){
            throw new Error('Invalid Payment');
        }
        order.payment =new_payment;

        if(Store.order.update_order(orderID, order)){
            console.log("Payment Updated Sucessfully");
        }

    }catch(err){
        console.log(`${err.name} => ${err.message}`);
    }
}

// update_payment("cb0341f6-b038-4b7d-b609-f806cb3eef3c",{"type": "CONNECT-IPS", "status": "paid"})

/* track Order 
@params
    1) orderID: "Unique Id"
@returns
    @if(order found)
        return status
    @else
        return error
*/
const track_order = async(orderID) => {
    try{
        const order = await Store.order.read_order_from_id(orderID);
        console.log(`Type: ${order.shipment.type}, Status : ${order.shipment.status}`);
        return order.shipment;

    }catch(err){
        console.log(`${err.name} => ${err.message}`);
    }
}

// track_order("3486b83f-44da-4b28-96a3-858c6db79b72");
/* Cancel Order  
@param
    1) orderID: "Unique ID"
@returns
    @if(order cancelled sucessfully)
        return status
    @else
        return error
*/

const cancel_order = async(orderID) => {
    try{
        const order = await Store.order.read_order_from_id(orderID);
        if(order.order_status === "cancelled"){
            throw new Error(`Already Placed for cancelled. Id: ${orderID}`);
        }
        for(product of order.products){
            if(!Store.product.update_quantity(product.productId, product.quantity, "increase")){
                throw new Error(`Error occurs adding cancelled product in store`);
            }
        }
        order.order_status = "cancelled";

        if(Store.order.update_order(orderID, order)){
            console.log("Order has been placed for cancellation");
        }
    }catch(err){
        console.log(`${err.name} => ${err.message}`);
    }
}

// cancel_order("a699efaa-0e54-490d-b197-10e32a76efc2");

/* return replace Order  
@param
    1) orderID : "Unique ID"
    2) action  : either replace or return
@returns
    @if(order replace/return sucessfully)
        return status
    @else
        return error
*/
const return_replace_order = async(orderID, action) =>{
    try{
        const order = await Store.order.read_order_from_id(orderID);

        if(order.order_status === "cancelled"){
            throw new Error(`Order is already Placed for cancellation. Id: ${orderID}`);
        }
        if(order.order_status === "return"){
            throw new Error(`Already Placed for return. Id: ${orderID}`);
        }

        if(action === "return"){
            for(product of order.products){
                Store.product.update_quantity(product.productId, product.quantity, "increase");
            }
        }
        
        order.order_status = action;
        if(Store.order.update_order(orderID, order)){
            console.log(`Your order has been placed for ${action} Sucessfully`);
        }

    }catch(err){
        console.log(`${err.name} => ${err.message}`);
    }
}

// return_replace_order("a699efaa-0e54-490d-b197-10e32a76efc2", "return");
/* Track refund updates 
@params
    1) orderID: "Unique ID"
@returns
    @if(order found)
        return refund status
    @else
        return error
*/
const refund_updates = async(orderId) =>{
    try{
        const order = await Store.order.read_order_from_id(orderId);
        if(order.order_status === "refund"){
            console.log(`Type: ${order.payment.type}, Status : ${order.payment.status}`);
            return order.payment;
        }
        throw new Error(`No refund order found for ID:  "${orderId}"`);

    }catch(err){
        console.log(`${err.name} => ${err.message}`);
    }
}

// refund_updates("cb0341f6-b038-4b7d-b609-f806cb3eef3c")

/* Management: Send shipment updates
@params
    1) orderId: "Unique order Id"
@returns
    @if(order found)
        return order status 
    @else
        return error
*/
const send_shipment_updates = async(orderId) => {
    try{
        const order = await Store.order.read_order_from_id(orderId);
        console.log(`Type: ${order.shipment.type}, Status : ${order.shipment.status}`);
        return order.shipment;

    }catch(err){
        console.log(`${err.name} => ${err.message}`);
    }
}

// send_shipment_updates("cb0341f6-b038-4b7d-b609-f806cb3eef3c");

/* Management: Send return updates
@params
    1) orderId: "Unique order id"
@returns
    @if(order found)
        return order status
    @else
        return Error
*/
const send_return_updates = async(orderId) => {
    try{
        const order = await Store.order.read_order_from_id(orderId);
        if(order.order_status === "return"){
            console.log(`Type: ${order.shipment.type}, Status : ${order.shipment.status}`);
            return order.shipment;
        }
        throw new Error(`No return order found for ID:  "${orderId}"`);
    }catch(err){
        console.log(`${err.name} => ${err.message}`);
    }
}

// send_return_updates("a699efaa-0e54-490d-b197-10e32a76efc2");

/* Management: Send Payment updates
@params
    1) orderId: "Unique order Id"
@returns
    @if(order found)
        return payment status
    @else
        return Error
    */
const send_payment_updates = async(orderId) => {
    try{
        const order = await Store.order.read_order_from_id(orderId);
        console.log(`Type: ${order.payment.type}, Status : ${order.payment.status}`);
        return order.payment;
    }catch(err){
        console.log(`${err.name} => ${err.message}`);
    }
}



// send_payment_updates("a699efaa-0e54-490d-b197-10e32a76efc2");




module.exports = {place_order, update_quantity_order, update_address, update_payment, track_order, cancel_order, return_replace_order, refund_updates, send_shipment_updates, send_return_updates, send_payment_updates}