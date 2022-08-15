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
        // no earlier cart is present
        if((cartId === " " || cartId === "" ) && (product_res && product.quantity <= product_res.quantity)){
            const cart = Schema.Cart(userId);
            cart.products.push({...product});
            cart.totalBill += product.quantity * product_res.price;
            if(Store.cart.add_cart(cart)){
                console.log(`Added to cart Sucessfully`);
                return
            }
            throw new Error(`Error occurs try again later`);
        
        }else{
            const cart_res = await Store.cart.find_cart(cartId);
            if(!cart_res || cart_res.status !== "active") throw new Error ('No active Cart Found');

            if(cart_res && product_res && (product.quantity <= product_res.quantity)){
                for(var oldProduct of cart_res.products){ // if item already available in cart
                    if(oldProduct.productId === product.productId){
                        oldProduct.quantity += product.quantity;
                        cart_res.totalBill += product.quantity*product_res.price;
                        if(Store.cart.update_cart(cartId, cart_res)){
                            console.log("Product added Sucessfully");
                            return;
                        }
                        throw new Error(`Error occurs try again later`);
                    }
                }
            // cart is present but item is new
                cart_res.products.push({...product});
                cart_res.totalBill += product.quantity*product_res.price;
                if(Store.cart.update_cart(cartId , cart_res)){
                    console.log("Product added Sucessfully");
                    return;
                }
                throw new Error(`Error occurs try again later`);
            }
        }
        throw new Error(`Currently No Product Available`);
    }catch(err){
        console.log(`${err.name} => ${err.message}`);
    }
}

// add_product_to_cart("","e8b62f59-a933-4382-98ab-fbef316847f5", {productId: "c8a12d5b-b3eb-4760-8041-57798338ad7b", quantity : 5} );


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
                            cart_res.totalBill += product.quantity*product_res.price;
                            if(Store.cart.update_cart(cartId, cart_res)){
                                console.log("Product added to cart Sucessfully");
                                return;
                            }
                        }
                    }
                    throw new Error(`No product found in order to update for ID: ${product.productId}`)
                }
                throw new Error(`Entered number of quantity is not sufficient in store`);

            case "remove":
                    for(var oldProduct of cart_res.products){
                        if(oldProduct.productId === product.productId && product.quantity <= oldProduct.quantity){
                            oldProduct.quantity -= product.quantity;
                            cart_res.totalBill -= product.quantity*product_res.price;
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

// update_quantity_in_cart("30989433-6d78-472a-86b2-8948126c2b1c", {productId: "c8a12d5b-b3eb-4760-8041-57798338ad7b", quantity : 10}, "add");

module.exports ={add_product_to_cart, update_quantity_in_cart};