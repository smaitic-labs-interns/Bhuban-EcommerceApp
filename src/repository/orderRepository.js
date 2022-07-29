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
        utils.write_data(fileName, allOrders);
        return true;
    }catch(err){
        console.log(`${err.name} => ${err.message}`);
        return false;
    }
}


const read_order_from_id = (orderId) =>{
    for(order of allOrders){
        if(order.id === orderId) return order;
    }
    return false;
}
 
const update_order = (orderId, newOrder) =>{
    for(var oldOrder of allOrders){
        if(oldOrder.id === orderId){
            allOrders[allOrders.indexOf(oldOrder)] = newOrder;
            utils.write_data(fileName, allOrders);
            return true;
        }
    }
    return false;
}

module.exports = {read_order_from_id, update_order, place_order}