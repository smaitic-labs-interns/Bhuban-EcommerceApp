const store = require('../database/db.js');
const { v4: uuidv4 } = require('uuid');


// Read all Products
const products = store.product.read_all_products();
const allOrders = store.order.read_all_orders();

// Search Product
exports.search_product = (searck_keyword) => {
    return (Object.keys(products).filter((item) => item == searck_keyword).map((item) => products[item]));
}

/* Management: Add Product to file
@params
    1) productDetails: "Products with full details", productObject
@returns
    @if(added sucessfully)
        return success message
    @else
        return Error
*/
exports.add_product = (productDetails) => {
    try{
        products[uuidv4()] = productDetails;
        const res = store.product.add_product(products);
        if(res){
            console.log("Product added to Database sucessfully");
        }else{
            throw new Error('Error occurs while saving file to database');
        }
    }catch(err){
        console.log(`${err.name} => ${err.message}`);
    }
}

/*Management:  Remove Product from file
@params 
    1)productName: "Name of product"
@returns
    @if(removed sucessfully)
        return success message
    @else
        return Error
*/
exports.remove_product = (productName) => {
    try{
        for(id in products){
            if(productName === products[id]['name']){
                if(delete products[id]){
                    if(store.product.add_product(products)){
                        console.log("Product removed sucessfully");
                    }else{
                        console.log("Error occurs while removing product");
                    }
                 }else{
                    console.log('Error occurs while deleting');
                 }
             }
        }
    }catch(err){
        console.log(`${err.name} => ${err.message}`);
    }
}

/*Management:  Update Product from file
@params
    1) productDetails: "Product with full details", productObject
@returns
    @if(Updated sucessfully)
        return success message
    @else
        return Error
*/
exports.update_product = (productDetails) => {
    try{
        for(id in products){
            if(productDetails['name'] === products[id]['name']){
                for (key in productDetails){
                    products[id][key] = productDetails[key];
                }
                if(store.product.add_product(products)){
                    console.log("Product Updated sucessfully");
                }else{
                    throw new Error("Error occurs while updating product");
                }
            }
        }
    }catch(err){
        console.log(`${err.name} => ${err.message}`);
    }
}

/* Management: Send shipment updates
@params
    1) orderId: "Unique order Id"
@returns
    @if(order found)
        return order status 
    @else
        return error
*/
exports.send_shipment_updates = (orderId) => {
    try{
        for (key in allOrders){
            if(orderId === key){
                // console.log(allOrders[key]["status"]);
                return allOrders[key]["status"];
            }
        }
    }catch(err){
        console.log(`${err.naem} => ${err.message}`);
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
exports.send_return_updates = (orderId) => {
    try{
        for (key in allOrders){
            if(orderId === key){
                // console.log(allOrders[key]["status"]);
                return allOrders[key]["status"];
            }
        }
    }catch(err){
        console.log(`${err.naem} => ${err.message}`);
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
exports.send_payment_updates = (orderId) => {
    try{
        for (key in allOrders){
            if(orderId === key){
                // console.log(`${allOrders[key]["payment"]["type"]} => ${allOrders[key]["payment"]["status"]}`);
                return (`${allOrders[key]["payment"]["type"]} => ${allOrders[key]["payment"]["status"]}`);
            }
        }
    }catch(err){
        console.log(`${err.naem} => ${err.message}`);
    }
}

/* Management: Prepare revenue report
@params 
    
*/
exports.prepare_revenue_report = () => {
    try{
    }catch(err){
        console.log(`${err.naem} => ${err.message}`);
    }
}

// Management: Prepare AR Aging report
exports.prepare_ar_aging_report = () => {
    try{
    }catch(err){
        console.log(`${err.naem} => ${err.message}`);
    }
}

/************* CUSTOMER FEATURES*****************/

/* Add product to cart
@params
    1.cart: "Object empty at begining/containing product details", cartObject
    2.item: "Product with details", productObject
@returns
    @if(added sucessfully)
        return cart
    @else
        return error
*/

exports.add_product_to_cart = (cart, item) => {
    try{
        let search_res = search_product(item["item"], products);
        if(search_res){
            if(item["quty"] <= search_res["quantity"]){
                cart["products"].push({"item": item["item"], "quty" : item["quty"], "price": search_res["price"]});
                cart["total_bill"] += item["quty"]*search_res["price"];
                return cart;
            }else{
                throw new Error("Quantity exceeds than available");
            }
        }
    }catch(err){
        console.log(`${err.name} => ${err.message}`);
    }
}

/* Update quantity in cart
@params
    1.cart: "Object containing product details", cartObject
    2.item: "Product with details", productObject
@returns
    @if(updated sucessfully)
        return cart
    @else
        return error
*/
exports.update_quantity_in_cart = (cart, item) => {
    try{
        let search_res = search_product(item["item"], products);
        for (let i=0; i< cart["products"].length; i++){
            if(cart["products"][i]["item"] == item["item"]){
                if(item["action"] == "add" && !(item["quty"] < 0) ){
                    cart["products"][i]["quty"] += item["quty"];
                    cart["total_bill"] += item["quty"]*search_res["price"];

                }else if (item["action"] == "remove" && !(item["quty"] < 0) && !(item["quty"] >! cart["products"][i]["quty"])){
                    cart["products"][i]["quty"] -= item["quty"];
                    cart["total_bill"] -= item["quty"]*search_res["price"];

                }else{
                    throw new Error('Quantity Error occurs');
                }
                return cart;
            }else{
                err = `Unknown Item "${item["item"]}" to Update`;
            }
        }
    }catch (err){
        console.log(`${err.name} => ${err.message}`);
    }

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
exports.place_order = (cart, shipping_address, payments) =>{
    try{
        const order = cart;
        order["shipping"] = shipping_address;
        order["payment"] = payments;
        order["status"] ="On the Way";
        store.order.place_order(order);
        return order;
    }catch (err){
        return (`${err.name} => ${err.message}`)
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
exports.update_address = (orderID ,new_address) => {
    try{  
        for (key in allOrders){
            if(key == orderID){
                for(subKey in new_address){
                    if(new_address[subKey].length != 0){
                        allOrders[key]["shipping"][subKey] = new_address[subKey];
                    }
                }
                store.order.place_order(key,allOrders[key]);
                console.log("Address Updated Sucessfully");
                return allOrders[key]["shipping"];
            }else{
                throw new Error(`Could not found any order on customer: ${orderID}`);
            }
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
exports.update_payment = (orderID, new_payment) => {
    try{
        for (key in allOrders){
            if(key === orderID){
                for(subKey in new_payment){
                    if(new_payment[subKey].length != 0){
                        allOrders[key]["payment"][subKey] = new_payment[subKey];
                    }
                }
                store.order.place_order(key,allOrders[key]);
                console.log("Payment Updated Successfully!");
                break;
            }else{
                throw new Error(`Could not found any order on customer "${orderID}"`);
            }
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
exports.track_order = (orderID) => {
    try{
        for (key in allOrders){
            if(key == orderID){
                console.log(`Current status of your order: ${allOrders[key]["status"]}`);
                return allOrders[key]["status"];
            }else{
                throw new Error(`Could not found any order for "${orderID}"`);
            }
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
exports.cancel_order = (orderID) => {
    try{
        for (key in allOrders){
            if(key == orderID){
                allOrders[key]["status"] = "cancelled";
                store.order.place_order(key,allOrders[key]);
                console.log("Your order has been cancelled Sucessfully");
                return allOrders[key]["status"];
            }else{
                throw new Error(`Could not found any order on customer "${orderID}"`);
            }
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
exports.return_replace_order = (orderID, action) =>{
    try{
        for (key in allOrders){
            if(key == orderID){
                allOrders[key]["status"] = action;
                store.order.place_order(key,allOrders[key]);
                console.log(`Your order has been processed for ${action} Sucessfully`);
                return allOrders[key]["status"];
            }else{
                throw new Error(`Could not found any order on customer "${orderID}"`);
            }
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
exports.refund_updates = (orderID) =>{
    try{
        for (key in allOrders){
            if(key == orderID){
                console.log(`Payment type : ${allOrders[key]["payment"]["type"]}, and payment status => ${allOrders[key]["payment"]["status"]}`);
                return allOrders[key]["payment"];
            }else{
                throw new Error(`Could not found any order on customer "${orderID}"`);
            }         
        }
    }catch(err){
        console.log(`${err.name} => ${err.message}`);
    }
}
