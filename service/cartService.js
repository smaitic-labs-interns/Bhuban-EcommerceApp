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
        let search_res = check_product(product["productId"]);
        if(search_res.length>0){
            if(cartId in allCarts){
                if(product["quty"] <= search_res[0]["quantity"] && (Object.keys(allCarts[cartId]["products"]).indexOf(product["productId"]) === -1)){
                    allCarts[cartId]["products"][product["productId"]]=({name: search_res[0]["name"] , price:search_res[0]["price"], quty: product["quty"]});
                    allCarts[cartId]["total_bill"] += product["quty"]*search_res[0]["price"];
                }else if(product["quty"] <= search_res[0]["quantity"] && (Object.keys(allCarts[cartId]["products"]).indexOf(product["productId"]) !== -1)){
                    allCarts[cartId]["products"][product["productId"]]["quty"] += product["quty"];
                    allCarts[cartId]["total_bill"] += product["quty"]*search_res[0]["price"];
                }else{
                    throw new Error("Quantity exceeds than available");
                }
            }else{
                cart["products"][product["productId"]]=({name: search_res[0]["name"] , price:search_res[0]["price"], quty: product["quty"]});
                cart["total_bill"] += product["quty"]*search_res[0]["price"];
                allCarts[cartId] = cart;
            }
            if(store.cart.add_product(allCarts)){
                console.log("Added to cart Sucessfully");
            }else{
                throw new Error(`Error occurs while adding product to cart`);
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
        let search_res = check_product(product["productId"]);
        if(search_res.length>0){
            if(cartId in allCarts){
                if(product["quty"] <= search_res[0]["quantity"] && action === "add"){
                    allCarts[cartId]["products"][product["productId"]]["quty"] += product["quty"];
                    allCarts[cartId]["total_bill"] += product["quty"]*search_res[0]["price"];
                }else if((product["quty"] <= allCarts[cartId]["products"][product["productId"]]["quty"]) && action === "remove"){
                    allCarts[cartId]["products"][product["productId"]]["quty"] -= product["quty"];
                    allCarts[cartId]["total_bill"] -= product["quty"]*search_res[0]["price"];
                }else{
                    throw new Error("Quantity exceeds/less than available/cart");
                }
                if(store.cart.add_product(allCarts)){
                    console.log(`Product ${action} to/from cart Sucessfully`);
                }else{
                    console.log(`Error occurs while ${action}ing products to cart`);
                }
            }else{
                throw new Error(`No cart found for ID: ${cartId}`);
            }
        }else{
            throw new Error(`No product found for ID: ${product["productId"]}`);
        }
    }catch(err){
        console.log(`${err.name} => ${err.message}`);
    }
}

module.exports ={add_product_to_cart, update_quantity_in_cart};