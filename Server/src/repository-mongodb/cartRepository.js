const Db = require('../config/mongoDb');
require('dotenv').config();
const mongodb = require('mongodb');
const cartCollection = process.env.MONGO_COL_CARTS;

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
        const cart = await db.findOne({_id:new mongodb.ObjectId(cartId)});
        if(cart) return cart;
        throw new Error(`No Cart Found For Id :${cartId}`)
    }catch(err){
        throw err;
    }
}

const update_cart = async(newCart) => {
    try{
        let db = await Db.db_connect(cartCollection);
        const cart = await db.findOne({_id:new mongodb.ObjectId(newCart._id)});
        if(cart){
            const result = await db.updateOne({_id:new mongodb.ObjectId(newCart._id)},{$set:newCart});
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
        const cart = await db.findOne({_id:new mongodb.ObjectId(cartId)});
        if(cart){
            const result = await db.deleteOne({_id:new mongodb.ObjectId(cartId)});
            return result.acknowledged;
        }
        throw new Error(`No cart found for ID: ${cartId}`);
    }catch(err){
        throw err;
    }
}

const update_cart_status = async(cartId, status) => {
    try{
        let db = await Db.db_connect(cartCollection);
        const cart = await db.findOne({_id:new mongodb.ObjectId(cartId)});
        if(cart){
            const result = await db.updateOne({_id:new mongodb.ObjectId(cartId)}, {$set:{status:status}});
            return result.acknowledged;
        }
        throw new Error(`No cart found for ID: ${cartId}`);
    }catch(err){
        throw err;
    }
}

const find_active_cart = async(userId) => {
    try{
        let db = await Db.db_connect(cartCollection);
        let cart = await db.findOne({userId:new mongodb.ObjectId(userId), status:"active"});
        if(cart) return cart;
        return false;
    }catch(err){
        throw err;
    }
}


module.exports ={add_cart, read_all_cart, find_cart, update_cart, delete_cart, update_cart_status, find_active_cart}