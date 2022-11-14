const utils = require("../utils/fileUtils.js");
require('dotenv').config();
const fileName = process.env.ORDER_FILE_PATH;

const read_all_orders = async() =>{
    return await utils.read_data(fileName);
}


const place_order = async(order) => {
    try{
        const allOrders = await read_all_orders();
        allOrders.push(order);
        return utils.write_data(fileName, allOrders);
    }catch(err){
        throw err;
    }
}


const read_order_from_id = async(orderId) =>{
    try{
        const allOrders = await read_all_orders();
        for(order of allOrders){
            if(order.id === orderId) return order;
        }
        throw new Error(`No Order Found for ID: ${orderId}`);
    }catch(err){
        throw err;
    }
}
 
const update_order = async(orderId, newOrder) =>{
    try{
        const allOrders = await read_all_orders();
        for(var oldOrder of allOrders){
            if(oldOrder.id === orderId){
                allOrders[allOrders.indexOf(oldOrder)] = newOrder;
                return utils.write_data(fileName, allOrders);
            }
        }
        throw new Error(`No order Found for ID: ${orderId}`)
    }catch(err){
        throw err;
    }
}

module.exports = {read_order_from_id, update_order, place_order}