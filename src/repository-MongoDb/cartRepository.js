const Db = require('../config/mongoDb');
const cartCollection = "carts";

const read_all_cart = async() =>{
    try{
        let db = await Db.db_connect(cartCollection);
        const carts = await db.find().toArray();
        return carts;
    }catch(err){
        throw err;
    }
}


const add_cart = async(cart) =>{
    try{
        let db = await Db.db_connect(cartCollection);
        const result = await db.insertOne(cart);
        return result.acknowledged;
    }catch(err){
        console.log(`${err.name} => ${err.message}`);
        return false;
    }
}

const find_cart = async(cartId) => { // find cart from id
    try{
        let db = await Db.db_connect(cartCollection);
        const cart = await db.findOne({id:cartId});
        if(cart) return cart;
        return false;
    }catch(err){
        throw err;
    }
}

const update_cart = async(cartId, newCart) => {
    try{
        let db = await Db.db_connect(cartCollection);
        const cart = await db.findOne({id:cartId});
        if(cart){
            const result = await db.updateOne({id:cartId},{$set:newCart});
            return result.acknowledged;
        }
        throw new Error(`Error occur Updating Cart`);
    }catch(err){
        throw err;
    }
}

const delete_cart = async(cartId) => {
    try{
        let db = await Db.db_connect(cartCollection);
        const cart = await db.findOne({id:cartId});
        if(cart){
            const result = await db.deleteOne({id:cartId});
            return result.acknowledged;
        }
        throw new Error(`No cart found for ID: ${cartId}`);
    }catch(err){
        throw err;
    }
}

module.exports ={add_cart, read_all_cart, find_cart, update_cart, delete_cart}