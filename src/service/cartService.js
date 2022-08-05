const Store = require('../repository/dbRepository');
const Schema = require('../models/cartModel');



/* Add product to cart
@params
    1.cartId: Id of cart, unique for each customer
    2.product: "Product with productid and quantity", productObject
@returns
    @if(added sucessfully)
        return sucess
    @else
        return error
*/

const add_product_to_cart = async(cartId, userId, product) => {
    try{
        const product_res = await Store.product.find_product(product.productId);
        const cart_res = await Store.cart.find_cart(cartId);

        if(cart_res && (cart_res.status === "active") && product_res && (product.quantity <= product_res.quantity)){
            for(var oldProduct of cart_res.products){ // if item already available in cart
                if(oldProduct.productId === product.productId){
                    oldProduct.quantity += product.quantity;
                    cart_res.total_bill += product.quantity*product_res.price;
                    if(Store.cart.update_cart(cartId, cart_res)){
                        console.log("Product added Sucessfully");
                        return;
                    }
                    throw new Error(`Error occurs try again later`);
                }
            }
            // cart is present but item is new
            cart_res.products.push({...product});
            cart_res.total_bill += product.quantity*product_res.price;
            if(Store.cart.update_cart(cartId , cart_res)){
                console.log("Product added Sucessfully");
                return;
            }
            throw new Error(`Error occurs try again later`);
            // no earlier cart is present
        }else if((!cart_res || cart_res.status !=="active") && product_res && (product.quantity <= product_res.quantity)){
            const cart = Schema.Cart(userId);
            cart.products.push({...product});
            cart.total_bill += product.quantity * product_res.price;
            if(Store.cart.add_cart(cart)){
                console.log(`Added to cart Sucessfully`);
                return
            }
            throw new Error(`Error occurs try again later`);
        }
        throw new Error(`Currently No Product Available`);
    }catch(err){
        console.log(`${err.name} => ${err.message}`);
    }
}


// */
// add_product_to_cart("3799a1a1-e02b-44ca-8df0-1e818593bd29","60eeaa21-39d9-4025-80ed-5da261dc0576", {productId: "68d61adb-9442-47d4-89b6-cd0098e228b1", quantity : 5} );


/* Update quantity in cart
@params
    1.cartId: unique Id of cart
    2.product: "Product with productId and quantity", productObject
    3. action: "to be performed i.e add/remove"
@returns
    @if(updated sucessfully)
        return sucess
    @else
        return error
*/
const update_quantity_in_cart = async(cartId, product, action) => {
    try{
        const product_res = await Store.product.find_product(product.productId);
        const cart_res = await Store.cart.find_cart(cartId);
        if(!cart_res) throw new Error(`No Cart Found For Id :${cartId}`)

       if(product.quantity <= 0){
            throw new Error(`Qyantity must be greater than 0`);
        }
        
        switch (action) {
            case "add":
                if(product.quantity <= product_res.quantity){
                    for(var oldProduct of cart_res.products){
                        if(oldProduct.productId === product.productId){
                            oldProduct.quantity += product.quantity;
                            cart_res.total_bill += product.quantity*product_res.price;
                            if(Store.cart.update_cart(cartId, cart_res)){
                                console.log("Product added to cart Sucessfully");
                                return;
                            }
                            throw new Error(`Error occurs adding to cart. Try again later`);
                        }
                    }
                    throw new Error(`No product found in order to update for ID: ${product.productId}`)
                }
                throw new Error(`Entered number of quantity is not sufficient in store`);

            case "remove":
                    for(var oldProduct of cart_res.products){
                        if(oldProduct.productId === product.productId && product.quantity <= oldProduct.quantity){
                            oldProduct.quantity -= product.quantity;
                            cart_res.total_bill -= product.quantity*product_res.price;
                            if(Store.cart.update_cart(cartId, cart_res)){
                                console.log("Product removed from cart Sucessfully");
                                return;
                            }
                            throw new Error(`Error occurs removing from cart. Try again later`);
                        }
                        throw new Error(`No product found in order to update for ID: ${product.productId}`)
                    }
                    throw new Error(`Entered number of quantity is greater than quantity in cart`);

            default:
                throw new Error(`Invalid action to be performed: ${action}`);
        }
    }catch(err){
        console.log(`${err.name} => ${err.message}`);
    }
}

// update_quantity_in_cart("3799a1a1-e02b-44ca-8df0-1e818593bd29", {productId: "68d61adb-9442-47d4-89b6-cd0098e228b1", quantity : 10}, "remove");

module.exports ={add_product_to_cart, update_quantity_in_cart};