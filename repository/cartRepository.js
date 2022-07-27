const utils = require("../utils/fileUtils.js");
require('dotenv').config();
const fileName = process.env.CART_FILE_PATH;

const read_all_cart = () =>{
    return utils.read_data(fileName);
}
const allCart = read_all_cart(); // read all products

const add_cart = (cart) =>{
    try{
        allCart.push(cart);
        utils.write_data(fileName, allCart);
        return true;
    }catch(err){
        console.log(`${err.name} => ${err.message}`);
        return false;
    }
}

const find_cart = (cartId) => { // find cart from id
    for(var cart of allCart){
        if(cart.id === cartId) return cart;
    }
    return false;
}

const update_cart = (cartId, newCart) => {
    for(var oldCart of allCart){
        if(oldCart.id === cartId){
            allCart[allCart.indexOf(oldCart)] = newCart;
            utils.write_data(fileName, allCart);
            return true;
        }
    }
    return false;
}

const delete_cart = (cartId) => {
    for (var cart of allCart){
        if(cart.id === cartId){
            const remainingCart = allCart.filter((item) => item.id !== cartId);
            utils.write_data(fileName, remainingCart);
            return true;
        }
    }
    return false;
}

module.exports ={add_cart, read_all_cart, find_cart, update_cart, delete_cart}