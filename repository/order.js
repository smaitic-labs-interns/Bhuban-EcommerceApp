const utils = require("../utils/fileUtils.js");
const fileName = './files/orders.json';


exports.place_order = (order) => {
    try{
        utils.write_data(fileName, order);
        return true;
    }catch(err){
        console.log(`${err.name} => ${err.message}`);
        return false;
    }
}

exports.read_all_orders = () =>{
    return utils.read_data(fileName);
}

exports.read_user_order = (orderId) =>{
    try{
        const allOrders = utils.read_data(fileName);
        if(orderId in allOrders){
            return allOrders[orderId];
        }else{
            throw new Error(`No order Found for ID: ${orderId}`);
        }
    }catch(err){
        console.log(`${err.name} => ${err.message}`);
        return false;
    }
}
 
exports.update_user_order = (orderId, order) =>{
    try{
        const allOrders = utils.read_data(fileName);
        allOrders[orderId] = order;
        utils.write_data(fileName, allOrders);
        return true;
    }catch(err){
        console.log(`${err.name} => ${err.message}`);
        return false;
    }
}