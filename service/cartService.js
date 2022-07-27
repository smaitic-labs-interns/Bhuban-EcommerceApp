const Store = require('../repository/dbRepository');
const Schema = require('../models/cartModel');



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
        const product_res = Store.product.find_product(product.productId);
        const cart_res = Store.cart.find_cart(cartId);

        if(cart_res && product_res && (product.quantity <= product_res.quantity)){
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
        }else if(!cart_res && product_res && (product.quantity <= product_res.quantity)){
            const cart = Schema.Cart(cartId);
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

      add_product_to_cart("60eeaa21-39d9-4025-80ed-5da261dc0576", {productId: "eb83b188-a9a6-4035-bd61-f44689128529", quantity : 5} );

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
        const product_res = Store.product.find_product(product.productId);
        const cart_res = Store.cart.find_cart(cartId);

        if(!product_res){
            throw new Error(`Not any available product for Id: ${product.productId}`);
        }else if(!cart_res){
            throw new Error(`No cart found for Id: ${cartId}`);
        }else if(product.quantity <= 0){
            throw new Error(`Qyantity must be greater than 0`);
        }
        
        switch (action) {
            case action = "add":
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
                }
                throw new Error(`Entered number of quantity is not sufficient in store`);

            case action = "remove":
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
                    }
                    throw new Error(`Entered number of quantity is greater than quantity in cart`);

            default:
                throw new Error(`Invalid action to be performed: ${action}`);
        }
    }catch(err){
        console.log(`${err.name} => ${err.message}`);
    }
}

// update_quantity_in_cart("60eeaa21-39d9-4025-80ed-5da261dc0576", {productId: "eb83b188-a9a6-4035-bd61-f44689128529", quantity : 100}, "add");

module.exports ={add_product_to_cart, update_quantity_in_cart};