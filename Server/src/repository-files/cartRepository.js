const utils = require("../utils/fileUtils.js");
require('dotenv').config();
const fileName = process.env.CART_FILE_PATH;

const read_all_cart = async() =>{
    try{
        return await utils.read_data(fileName);
    }catch(err){
        throw err;
    }
}


const add_cart = async(cart) =>{
    try{
        const allCart = await read_all_cart();
        allCart.push(cart);
        return utils.write_data(fileName, allCart);
    }catch(err){
        console.log(`${err.name} => ${err.message}`);
        return false;
    }
}

const find_cart = async(cartId) => { // find cart from id
    try{
        const allCart = await read_all_cart();
        for(var cart of allCart){
            if(cart.id === cartId) return cart;
        }
        return false;
    }catch(err){
        throw err;
    }
}

const update_cart = async(newCart) => {
    try{
        const allCart = await read_all_cart();
        for(var oldCart of allCart){
            if(oldCart.id === newCart.id){
                allCart[allCart.indexOf(oldCart)] = newCart;
                return utils.write_data(fileName, allCart);
            }
        }
        throw new Error(`Error occur Updating Cart`);
    }catch(err){
        throw err;
    }
}

const delete_cart = async(cartId) => {
    try{
        const allCart = await read_all_cart();
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

const update_cart_status = async(cartId, status) => {
    try{
        const allCart = await read_all_cart();
        for (var cart of allCart){
            if(cart.id === cartId){
                cart.status = status;
                return utils.write_data(fileName, allCart);
            }
        }
        throw new Error(`No cart found for ID: ${cartId}`);
    }catch(err){
        throw err;
    }
}

const find_active_cart = async(userId) => {
    try{
        const allCart = await read_all_cart();
        for (var cart of allCart){
            if(cart.userId === userId && cart.status === "active"){
                return cart;
            }
        }
        return false;
    }catch(err){
        throw err;
    }
}

module.exports ={add_cart, read_all_cart, find_cart, update_cart, delete_cart, update_cart_status, find_active_cart}