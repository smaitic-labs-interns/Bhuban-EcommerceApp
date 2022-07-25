const store = require('../database/db.js');
const { v4: uuidv4 } = require('uuid');


const allProducts = store.product.read_all_products(); // Read all Products
const allCarts = store.cart.read_all();    // Read all orders

// Check if Product available
const check_product = (productId) => {
    return (Object.keys(allProducts).filter((id) => id == productId).map((item) => allProducts[item]));
}


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
const add_product_to_cart = (cartId, product) => {
    try{
        const cart ={products:{}, total_bill:0};
        var noCartIdFound = true;
        let search_res = check_product(product["productId"]);
        if(search_res.length>0){
            for(key in allCarts){
                if(key === cartId){
                    if(product["quty"] <= search_res[0]["quantity"] && (Object.keys(allCarts[key]["products"]).indexOf(product["productId"]) === -1)){
                        allCarts[key]["products"][product["productId"]]=({name: search_res[0]["name"] , price:search_res[0]["price"], quty: product["quty"]});
                        allCarts[key]["total_bill"] += product["quty"]*search_res[0]["price"];
                        if(store.cart.add_product(allCarts)){
                            console.log("Added to cart Sucessfully");
                        }
                    }else if(product["quty"] <= search_res[0]["quantity"] && (Object.keys(allCarts[key]["products"]).indexOf(product["productId"]) !== -1)){
                        allCarts[key]["products"][product["productId"]]["quty"] += product["quty"];
                        allCarts[key]["total_bill"] += product["quty"]*search_res[0]["price"];
                        if(store.cart.add_product(allCarts)){
                            console.log("Added to cart Sucessfully");
                        }
                    }else{
                        throw new Error("Quantity exceeds than available");
                    } 
                    noCartIdFound = false;
                    break;
                }
            }
            if(noCartIdFound){
                cart["products"][product["productId"]]=({name: search_res[0]["name"] , price:search_res[0]["price"], quty: product["quty"]});
                cart["total_bill"] += product["quty"]*search_res[0]["price"];
                allCarts[cartId] = cart;
                if(store.cart.add_product(allCarts)){
                    console.log("Added to cart Sucessfully");
                }
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
const update_quantity_in_cart = (cartId, product, action) => {
    try{
        var noCartIdFound = true;
        let search_res = check_product(product["productId"]);
        if(search_res.length>0){
            for(key in allCarts){
                if(key === cartId){
                    if(product["quty"] <= search_res[0]["quantity"] && action === "add"){
                        allCarts[key]["products"][product["productId"]]["quty"] += product["quty"];
                        allCarts[key]["total_bill"] += product["quty"]*search_res[0]["price"];
                        if(store.cart.add_product(allCarts)){
                            console.log("Product added to cart Sucessfully");
                        }
                    }else if((product["quty"] <= allCarts[key]["products"][product["productId"]]["quty"]) && action === "remove"){
                        allCarts[key]["products"][product["productId"]]["quty"] -= product["quty"];
                        allCarts[key]["total_bill"] -= product["quty"]*search_res[0]["price"];
                        if(store.cart.add_product(allCarts)){
                            console.log("Removed from cart Sucessfully");
                        }
                    }else{
                        throw new Error("Quantity exceeds/less than available/cart");
                    } 
                    noCartIdFound = false;
                    break;
                }
            }
            if(noCartIdFound){
                throw new Error(`No cart found for ID: ${cartId}`);
            }
        }
    }catch(err){
        console.log(`${err.name} => ${err.message}`);
    }

}