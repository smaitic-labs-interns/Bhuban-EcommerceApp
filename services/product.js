const store = require('../database/db.js');

// Read all Products
const products = store.product.read_all_products();
const allOrders = store.order.read_all_orders();

// Search Product
const search_product = (searck_keyword) => {
    for (itemName in products){
        if(searck_keyword == itemName){
            return products[itemName];
        }
    }
}

// Add product to cart {arguments => (cart: "Object empty at begining/containing product details", item: "Product with details"), returns => if(addedsucessfully){returns cart} else{Show Error message}}
const add_product_to_cart = (cart, item) => {
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

// Update quantity in cart {arguments => (cart: "Object containing product details", item: "Product with details"), returns => if(updated sucessfully){returns cart} else{show error message}}
const update_quantity_in_cart = (cart, item) => {
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

// Place order
const place_order = (cart, shipping_address, payments) =>{
    const order = cart;
    order["shipping"] = shipping_address;
    order["payment"] = payments;
    order["status"] ="On the Way";
    store.order.place_order(order);
    return order;


}

// Update Address => arguments(Customer name : Unique String, new_address: object containing new address) returns => if(sucessfully update){returns updated address} else{show error}
const update_address = (orderID ,new_address) => {
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

// Update Payment {Arguments => (orderID: Unique String, new_payment: Object containing payment details), returns => Sucessful message on updation}
const update_payment = (orderID, new_payment) => {
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


// track Order {Argument => (orderID: "Unique Id"), returns => if(order found){its status }else{error message}}
const track_order = (orderID) => {
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

// Cancel Order  {Argument => (orderID: "Unique String"), returns => if(order cancelled sucessfully){order status }else{error message}}
const cancel_order = (orderID) => {
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

const return_replace_order = (orderID, action) =>{
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

// Track refund updates {arguments => (orderID: "Unique ID"), returns => if(order found){refund status} else{error message}}
const refund_updates = (orderID) =>{
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

module.exports={add_product_to_cart, search_product, update_quantity_in_cart, place_order, update_address, update_payment, track_order, cancel_order, return_replace_order, refund_updates};