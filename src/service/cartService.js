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

const add_product_to_cart = async(userId, product) => {
    try{
        const product_res = await Store.product.find_product(product.productId);
        if(!product_res || (product.quantity > product_res.quantity)) throw new Error(`Not sufficient product on store`);
        //no earlier cart is present
        const cart_res = await Store.cart.find_active_cart(userId)
        if(cart_res){
            for(var oldProduct of cart_res.products){ // if item already available in cart
                if(oldProduct.productId === product.productId){
                    oldProduct.quantity += product.quantity;
                    cart_res.totalBill += product.quantity*product_res.price;
                    if(Store.cart.update_cart(cart_res)){
                        console.log("Product added Sucessfully");
                        return;
                    }
                    throw new Error(`Error occurs try again later`);
                }
            }
        // cart is present but item is new
            cart_res.products.push({...product});
            cart_res.totalBill += product.quantity*product_res.price;
            if(await Store.cart.update_cart(cart_res)){
                console.log("Product added Sucessfully");
                return;
            }
            throw new Error(`Error occurs try again later`);
        }
        // creating new cart
        const cart = Schema.Cart(userId);
        cart.products.push({...product});
        cart.totalBill += product.quantity * product_res.price;
        if(await Store.cart.add_cart(cart)){
            console.log(`Added to cart Sucessfully`);
            return
        }
        throw new Error(`Error occurs try again later`);
        
    }catch(err){
        console.log(`${err.name} => ${err.message}`);
    }
}

// add_product_to_cart("947d2b87-2691-4d12-bc3b-d1b9b17e2f81", {productId: "0c4936f5-12e7-40bf-9345-2d4476d9cee4", quantity : 5} );


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
        const cart_res = await Store.cart.find_cart(cartId);
        if(cart_res.status !== "active") throw new Error(`No active cart found for Id: ${cartId}`)
        const product_res = await Store.product.find_product(product.productId);

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
                            if(await Store.cart.update_cart(cart_res)){
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
                            if(await Store.cart.update_cart(cart_res)){
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

// update_quantity_in_cart("837331ba-d342-4fce-8467-b0b447302b33", {productId: "0c4936f5-12e7-40bf-9345-2d4476d9cee4", quantity : 5}, "remove");

module.exports ={add_product_to_cart, update_quantity_in_cart};