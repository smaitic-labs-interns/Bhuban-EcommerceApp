const store = require('../database/db.js');
const { v4: uuidv4 } = require('uuid');
const validate_data = require('../models/dataValidator');

const allProducts = store.product.read_all_products(); // Read all Products
const allOrders = store.order.read_all_orders();    // Read all orders
const allCarts = store.cart.read_all();    // Read all cart

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
        const val_res = validate_data.address_schema.validateAsync(shipping_address);
        if(val_res){
            const orderId = uuidv4();
            const order = {...allCarts[cartId], customer: cartId};
            order["address"] = shipping_address;
            order["payment"] = payments;
            order["shipment"] ={type: "active", status: "Order Placed for validation"};
            allOrders[orderId] = order;
            for (key in allCarts[cartId]["products"]){
                if(key in allProducts){
                    allProducts[key]["quantity"] -= allCarts[cartId]["products"][key]["quty"];
                }
            }
            delete allCarts[cartId]
            if(store.product.save_product(allProducts) && store.order.place_order(allOrders) && store.cart.add_product(allCarts)){
                console.log(`Order Placed Sucessfully. Your order Id is : ${orderId}`)
            
            }else{
                throw new Error('Error Occurs while updating remaining Quantity. Try again later.')
            }
        }else{
            throw new Error(val_res)
        }
    }catch (err){
        console.log(`${err.name} => ${err.message}`)
    }
}



const update_quantity_order = (orderID, product, action) =>{
    try{
        let search_res = check_product(product["productId"]);
        if(search_res.length>0){
            if(orderID in allOrders){
                if(product["quty"] <= search_res[0]["quantity"] && action === "add"){
                    allOrders[orderID]["products"][product["productId"]]["quty"] += product["quty"];
                    allOrders[orderID]["total_bill"] += product["quty"]*search_res[0]["price"];
                    allProducts[product["productId"]]["quantity"] -= product["quty"];

                }else if((product["quty"] <= allOrders[orderID]["products"][product["productId"]]["quty"]) && action === "remove"){
                    allOrders[orderID]["products"][product["productId"]]["quty"] -= product["quty"];
                    allOrders[orderID]["total_bill"] -= product["quty"]*search_res[0]["price"];
                    allProducts[product["productId"]]["quantity"] += product["quty"];
               
                }else{
                    throw new Error("Quantity exceeds/less than available/cart");
                } 
                
                if(store.order.place_order(allOrders) && store.product.save_product(allProducts)){
                    console.log(`Item ${action} from order sucessfully`);
                }else{
                    throw new Error(`Error occurs while updating`)
                }
            }else{
                throw new Error(`No cart found for ID: ${cartId}`);
            }
        }else{
            throw new Error(`No Product found for ID: ${product["productId"]}`)
        }
    }catch(err){
        console.log(`${err.name} => ${err.message}`);
    }
}


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

module.exports = {place_order, update_quantity_order, update_address, update_payment, track_order, cancel_order, return_replace_order, refund_updates}