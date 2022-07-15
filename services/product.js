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

// Add product to cart
const add_product_to_cart = (item, cart) => {
    let search_res = search_product(item["item"], products);
    if(search_res){
        if(item["quty"] <= search_res["quantity"]){
            cart["products"].push({"item": item["item"], "quty" : item["quty"], "price": search_res["price"]});
            cart["total_bill"] += item["quty"]*search_res["price"];
        }else{
            console.log("Quantity exceeds than available");
        }
    }else{
        console.log("Item Not FOund");
    }
    return cart;
}

// Update quantity in cart
const update_quantity_in_cart = (cart, item) => {
    var err="";
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
                console.log("Quantity Error occurs");
            }
            err=""
            return;
        }else{
            err = `Unknown Item "${item["item"]}" to Update`;
        }
    }
    if(err){
        console.log(err);
    }

}

// Place order
const place_order = (cart, shipping_address, payments) =>{
    const order = cart;
    order["shipping"] = shipping_address;
    order["payment"] = payments;
    order["status"] ="On the Way";
    store.order.place_order("CustomerName2",order);
    return {"CustomerName2":order};


}

// Update Address
const update_address = (customerName ,new_address) => {
    var err;    
    for (key in allOrders){
        if(key == customerName){
            for(subKey in new_address){
                if(new_address[subKey].length != 0){
                    allOrders[key]["shipping"][subKey] = new_address[subKey];
                }
            }
            store.order.place_order(key,allOrders[key]);
            err=false;
            return;
        }else{
            err = `Could not found any order on customer: ${customerName}`
        }
    }
    console.log( err ? err : "Address Updated Sucessfully");
}

// Update Payment 
const update_payment = (customerName, new_payment) => {
    var err;    
    for (key in allOrders){
        if(key == customerName){
            for(subKey in new_payment){
                if(new_payment[subKey].length != 0){
                    allOrders[key]["payment"][subKey] = new_payment[subKey];
                }
            }
            store.order.place_order(key,allOrders[key]);
            err=false;
            return;
        }else{
            err = `Could not found any order on customer: ${customerName}`
        }
    }
    console.log( err ? err : "Payment Updated Sucessfully");
}

// track Order
const track_order = (customerName) => {  
    for (key in allOrders){
        if(key == customerName){
            return allOrders[key]["status"];
        }
    }
    console.log( err ? err : "Payment Updated Sucessfully");
}

// Cancel Order
const cancel_order = (customerName) => {  
    for (key in allOrders){
        if(key == customerName){
            allOrders[key]["status"] = "cancelled";
            return `Ordered Cancelled Sucessfully`;
        }
    }
    console.log( err ? err : "Payment Updated Sucessfully");
}


module.exports={add_product_to_cart, search_product, update_quantity_in_cart, place_order, update_address, update_payment, track_order, cancel_order};