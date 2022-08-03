const utils = require("../utils/fileUtils.js");
require('dotenv').config();
const fileName = process.env.ORDER_FILE_PATH;

const read_all_orders = () =>{
    return utils.read_data(fileName);
}

const allOrders = read_all_orders();


const place_order = (order) => {
    try{
        allOrders.push(order);
        return utils.write_data(fileName, allOrders);
    }catch(err){
        throw err;
    }
}


const read_order_from_id = (orderId) =>{
    try{
        for(order of allOrders){
            if(order.id === orderId) return order;
        }
        throw new Error(`No Order Found for ID: ${orderId}`);
    }catch(err){
        throw err;
    }
}
 
const update_order = (orderId, newOrder) =>{
    try{
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