// const search_product = require('./searchProduct');

const add_product_to_cart = (item, cart, products) => {
    let total_bill =0;
    let search_res = search_product(item["item"], products);

    if(search_res){
        if(item["quty"] <= search_res["quantity"]){
            cart[item["item"]] = { "quty" : item["quty"], "price": search_res["price"]};
            total_bill += item["quty"]*search_res["price"];
        }else{
            console.log("Quantity exceeds than available");
        }
    }else{
        console.log("Item Not FOund");
    }
    // return {cart, total_bill};
}


const search_product = (searck_keyword, products) => {
    for (itemName in products){
        if(searck_keyword == itemName){
            return products[itemName];
        }
    }
}




const update_quantity = (cart, item) => {
    var err="";
    for (itemName in cart){
        if(itemName == item["item"]){
            if(item["action"] == "add" && !(item["quty"] < 0) ){
                cart[itemName]["quty"] += item["quty"];
            }else if (item["action"] == "remove" && !(item["quty"] < 0) && !(item["quty"] >! cart[itemName]["quty"])){
                cart[itemName]["quty"] -= item["quty"];
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

exports.add_product_to_cart = add_product_to_cart;
exports.search_product = search_product;
exports.update_quantity = update_quantity;