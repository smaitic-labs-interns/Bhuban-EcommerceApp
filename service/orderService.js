const Store = require('../repository/dbRepository');
const { v4: uuidv4 } = require('uuid');
const Validate = require('../utils/validations');
const Schema = require('../models/orderModel');

// const allProducts = store.product.read_all_products(); // Read all Products
// const allOrders = store.order.read_all_orders();    // Read all orders
// const allCarts = store.cart.read_all();    // Read all cart

// Check if Product available
const check_product = (productId) => {
    return (Object.keys(allProducts).filter((id) => id == productId).map((item) => allProducts[item]));
}






/* Place order
@params
    1) cart: "Object with products", cartObject
    2) Shipping_address: "Address of customer", addressObject
    3) payments: "Payments Details", paymentObject
@returns
    @if(placed order sucessfully)
        return order_details
    @else
        return error
*/

const place_order = (cartId, shipping_address, payments) =>{
    try{
        const {error, value} = Validate.address_validation(shipping_address);
        if(error) throw error;
        const cart = Store.cart.find_cart(cartId);
        if(! cart){
            throw new Error(`No cart found for Id: ${cartId}`);
        }
        const shipment = {type: "active", status: "paid"};
        const order = Schema.Order(cart, value, payments, shipment);

        for (product of cart.products){
            if(!Store.product.decrease_quantity(product.productId, product.quantity)){
                throw new Error(`Error occurs updating remaining product`);
            }
        }
        
        if(!Store.cart.delete_cart(cartId)){
            throw new Error(`Error Occurs Removing cart`);
        }

        if(! Store.order.place_order(order)){
            throw new Error(`Error Occurs while Placing Order`);
        }
        console.log(`Your order has been placed with order Id : ${order.id}`);
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
    "house_no": 12
    }
const payment ={"type": "cash", "status": "onDelivery"}
// place_order("60eeaa21-39d9-4025-80ed-5da261dc0576", shipping_address, payment);

// console.log(order);

const update_quantity_order = (orderID, product, action) =>{
    try{
        const order = store.order.read_user_order("1b7d2299-8a5f-4700-b45f-8865003df463");
        let search_res = check_product(product["productId"]);
        if(search_res.length>0 && order){
            // if(orderID in allOrders){
                if(product["quty"] <= search_res[0]["quantity"] && action === "add"){
                    order["products"][product["productId"]]["quty"] += product["quty"];
                    order["total_bill"] += product["quty"]*search_res[0]["price"];
                    allProducts[product["productId"]]["quantity"] -= product["quty"];

                }else if((product["quty"] <= allOrders[orderID]["products"][product["productId"]]["quty"]) && action === "remove"){
                    order["products"][product["productId"]]["quty"] -= product["quty"];
                    order["total_bill"] -= product["quty"]*search_res[0]["price"];
                    allProducts[product["productId"]]["quantity"] += product["quty"];
               
                }else{
                    throw new Error("Quantity exceeds/less than available/cart");
                } 
                
                if(store.order.update_user_order(orderID, order) && store.product.save_product(allProducts)){
                    console.log(`Item ${action} from order sucessfully`);
                }else{
                    throw new Error(`Error occurs while updating`)
                }
            // }else{
            //     throw new Error(`No cart found for ID: ${cartId}`);
            // }
        }else{
            throw new Error(`No Product found for ID: ${product["productId"]}`)
        }
    }catch(err){
        console.log(`${err.name} => ${err.message}`);
    }
}
// update_quantity_order("1b7d2299-8a5f-4700-b45f-8865003df463", {productId: "84401b07-7089-41cc-9abb-431792a388db", "quty": 5}, "add")

// const update_quantity_order = (orderID, product, action) =>{
//     try{
//         let search_res = check_product(product["productId"]);
//         if(search_res.length>0){
//             if(orderID in allOrders){
//                 if(product["quty"] <= search_res[0]["quantity"] && action === "add"){
//                     allOrders[orderID]["products"][product["productId"]]["quty"] += product["quty"];
//                     allOrders[orderID]["total_bill"] += product["quty"]*search_res[0]["price"];
//                     allProducts[product["productId"]]["quantity"] -= product["quty"];

//                 }else if((product["quty"] <= allOrders[orderID]["products"][product["productId"]]["quty"]) && action === "remove"){
//                     allOrders[orderID]["products"][product["productId"]]["quty"] -= product["quty"];
//                     allOrders[orderID]["total_bill"] -= product["quty"]*search_res[0]["price"];
//                     allProducts[product["productId"]]["quantity"] += product["quty"];
               
//                 }else{
//                     throw new Error("Quantity exceeds/less than available/cart");
//                 } 
                
//                 if(store.order.place_order(allOrders) && store.product.save_product(allProducts)){
//                     console.log(`Item ${action} from order sucessfully`);
//                 }else{
//                     throw new Error(`Error occurs while updating`)
//                 }
//             }else{
//                 throw new Error(`No cart found for ID: ${cartId}`);
//             }
//         }else{
//             throw new Error(`No Product found for ID: ${product["productId"]}`)
//         }
//     }catch(err){
//         console.log(`${err.name} => ${err.message}`);
//     }
// }


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
const update_address = (orderID ,new_address) => {
    try{
        if(orderID in allOrders){
            for(subKey in new_address){
                if(new_address[subKey].length != 0){
                    allOrders[orderID]["address"][subKey] = new_address[subKey];
                }
            }
            if(store.order.place_order(allOrders)){
                console.log("Address Updated Sucessfully");
            }else{
                throw new Error(`Error occurs while updating order`);
            }
        }else{
            throw new Error(`Could not found any order on customer: ${orderID}`);
        }         
    }catch(err){
        console.log(`${err.name} => ${err.message}`);
    }
}

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
const update_payment = (orderID, new_payment) => {
    try{
        if(orderID in allOrders){
            for(subKey in new_payment){
                if(new_payment[subKey].length != 0){
                    allOrders[orderID]["payment"][subKey] = new_payment[subKey];
                }
            }
            if(store.order.place_order(allOrders)){
                console.log("Payment Updated Successfully!");
            }else{
                throw new Error(`Error occurs while updating payment`)
            }
        }else{
            throw new Error(`Could not found any order on customer "${orderID}"`);
        }
    }catch(err) {
        console.log(`${err.name} => ${err.message}`);
    }
}

/* track Order 
@params
    1) orderID: "Unique Id"
@returns
    @if(order found)
        return status
    @else
        return error
*/
const track_order = (orderID) => {
    try{
        if(orderID in allOrders){
            console.log(`Type: ${allOrders[orderID]["shipment"]["type"]}, Status : ${allOrders[orderID]["shipment"]["status"]}`);
            return allOrders[orderID]["shipment"];
        }else{
            throw new Error(`Could not found any order for "${orderID}"`);
        }
    }catch(err){
        console.log(`${err.name} => ${err.message}`);
    }
}

/* Cancel Order  
@param
    1) orderID: "Unique ID"
@returns
    @if(order cancelled sucessfully)
        return status
    @else
        return error
*/

const cancel_order = (orderID) => {
    try{
        if((orderID in allOrders) && !(allOrders[orderID]["shipment"]["type"] === "cancelled")){
            for(subKey in allOrders[orderID]["products"]){
                if(check_product(subKey).length>0){
                    allProducts[subKey]["quantity"] += allOrders[orderID]["products"][subKey]["quty"];
                }
            }
            allOrders[orderID]["shipment"]= {type: "cancelled", status: "placed for cancelling"};
            allOrders[orderID]["payment"] = {type: "refund", status: "Placed for refund"}
            // delete allOrders[orderID];
            if(store.order.place_order(allOrders) && store.product.save_product(allProducts)){
                console.log("Your order has been placed for cancelling");
                return allOrders[orderID]["shipment"];
            }
        }else{
            throw new Error(`Could not found any order to csncel on Id "${orderID}"`);
        }
    }catch(err){
        console.log(`${err.name} => ${err.message}`);
    }
}


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
const return_replace_order = (orderID, action) =>{
    try{
        if((orderID in allOrders) && !(allOrders[orderID]["shipment"]["type"] === "cancelled") && !(allOrders[orderID]["shipment"]["type"] === "return")){
            if(action === "return"){
                for(subKey in allOrders[orderID]["products"]){
                    if(check_product(subKey).length>0){
                        allProducts[subKey]["quantity"] += allOrders[orderID]["products"][subKey]["quty"];
                    }
                }
                allOrders[orderID]["payment"] = {type: "refund", status: "Placed for refund"};
            }

            allOrders[orderID]["shipment"] = {type: action, status: `placed for ${action}`};
            if(store.order.place_order(allOrders) && store.product.save_product(allProducts)){
                console.log(`Your order has been placed for ${action} Sucessfully`);
            }else{
                throw new Error(`Error occurs while ${action}. Try again later.`)
            }
        }else{
            throw new Error(`Could not found any order for return/replace on Id: "${orderID}"`);
        }
    }catch(err){
        console.log(`${err.name} => ${err.message}`);
    }
}


/* Track refund updates 
@params
    1) orderID: "Unique ID"
@returns
    @if(order found)
        return refund status
    @else
        return error
*/
const refund_updates = (orderID) =>{
    try{
        if((orderID in allOrders) && (allOrders[orderID]["payment"]["type"] === "refund")){
            console.log(allOrders[orderID]["payment"]);
            return allOrders[orderID]["payment"];
        }else{
            throw new Error(`Could not found any order on customer "${orderID}"`);
        }  
    }catch(err){
        console.log(`${err.name} => ${err.message}`);
    }
}




// update_product("eb83b188-a9a6-4035-bd61-f44689128529", "laptop",  "macbook", "apple", "", "", "", 10);
/* Management: Send shipment updates
@params
    1) orderId: "Unique order Id"
@returns
    @if(order found)
        return order status 
    @else
        return error
*/
const send_shipment_updates = (orderId) => {
    try{
        if(orderId in allOrders){
            console.log(allOrders[orderId]["shipment"]);
            return allOrders[orderId]["shipment"];
        }else{
           throw new Error(`No order found for ID: ${orderId}`);
        }
    }catch(err){
        return (`${err.name} => ${err.message}`);
    }
}


/* Management: Send return updates
@params
    1) orderId: "Unique order id"
@returns
    @if(order found)
        return order status
    @else
        return Error
*/
const send_return_updates = (orderId) => {
    try{
        if((orderId in allOrders) && (allOrders[orderId]["shipment"]["type"] === "return")){
            console.log(allOrders[orderId]["shipment"]);
            return allOrders[orderId]["shipment"];
        }else{
            throw new Error(`No order found for return on ID: ${orderId}`);
        }
    }catch(err){
        console.log(`${err.name} => ${err.message}`);
    }
}


/* Management: Send Payment updates
@params
    1) orderId: "Unique order Id"
@returns
    @if(order found)
        return payment status
    @else
        return Error
    */
const send_payment_updates = (orderId) => {
    try{
        if(orderId in allOrders){
            console.log(`Payment type: ${allOrders[orderId]["payment"]["type"]} , Status:  ${allOrders[orderId]["payment"]["status"]}`);
            return (`Payment type: ${allOrders[orderId]["payment"]["type"]} , status : ${allOrders[orderId]["payment"]["status"]}`);
        }else{
            throw new Error(`No order found for ID: ${orderId}`);
        }
    }catch(err){
        console.log(`${err.name} => ${err.message}`);
    }
}








module.exports = {place_order, update_quantity_order, update_address, update_payment, track_order, cancel_order, return_replace_order, refund_updates}