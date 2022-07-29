const utils = require("../utils/fileUtils.js");
require('dotenv').config();
const fileName = process.env.CART_FILE_PATH;

const read_all_cart = () =>{
    try{
        return utils.read_data(fileName);
    }catch(err){
        throw err;
    }
}
const allCart = read_all_cart(); // read all products

const add_cart = (cart) =>{
    try{
        allCart.push(cart);
        return utils.write_data(fileName, allCart);
    }catch(err){
        console.log(`${err.name} => ${err.message}`);
        return false;
    }
}

const find_cart = (cartId) => { // find cart from id
    try{
        for(var cart of allCart){
            if(cart.id === cartId) return cart;
        }
        throw new Error(`No cart Found for ID: ${cartId}`);
    }catch(err){
        throw err;
    }
}

const update_cart = (cartId, newCart) => {
    try{
        for(var oldCart of allCart){
            if(oldCart.id === cartId){
                allCart[allCart.indexOf(oldCart)] = newCart;
                return utils.write_data(fileName, allCart);
            }
        }
        throw new Error(`Error occur Updating Cart`);
    }catch(err){
        throw err;
    }
}

const delete_cart = (cartId) => {
    try{
        for (var cart of allCart){
            if(cart.id === cartId){
                const remainingCart = allCart.filter((item) => item.id !== cartId);
                return utils.write_data(fileName, remainingCart);
            }
        }
        throw new Error(`No cart found for ID: ${cartId}`);
    }catch(err){
        throw err;
    }
}

module.exports ={add_cart, read_all_cart, find_cart, update_cart, delete_cart}