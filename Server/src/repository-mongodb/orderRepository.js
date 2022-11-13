const Db = require('../config/mongoDb');
require('dotenv').config();
const mongodb = require('mongodb');
const orderCollection = process.env.MONGO_COL_ORDERS;

const read_all_orders = async() =>{
    let db = await Db.db_connect(orderCollection);
        const orders = await db.find().toArray();
        return orders;
}


const place_order = async(order) => {
    try{
        let db = await Db.db_connect(orderCollection);
        const result = await db.insertOne(order);
        return result.acknowledged;
    }catch(err){
        throw err;
    }
}


const read_order_from_id = async(orderId) =>{
    try{
        let db = await Db.db_connect(orderCollection);
        const order = await db.findOne({_id:new mongodb.ObjectId(orderId)});
        if(order){
            if(order) return order;
        }
        throw new Error(`No Order Found for ID: ${orderId}`);
    }catch(err){
        throw err;
    }
}
 
const update_order = async(orderId, newOrder) =>{
    try{
        let db = await Db.db_connect(orderCollection);
        const order = await db.findOne({_id:new mongodb.ObjectId(orderId)});
        if(order){
            const result = await db.updateOne({_id:new mongodb.ObjectId(orderId)},{$set:newOrder});
            return result.acknowledged;
        }
        throw new Error(`No order Found for ID: ${orderId}`)
    }catch(err){
        throw err;
    }
}

module.exports = {read_all_orders, read_order_from_id, update_order, place_order}