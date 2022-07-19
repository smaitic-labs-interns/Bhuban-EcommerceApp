const utils = require("../utils/fileUtils.js");
const fileName = './files/orders.json';
const { v4: uuidv4 } = require('uuid');


exports.place_order = (order) => {
    const order_details = read_all_orders();
    order_details[uuidv4()] = order;
    utils.write_data(fileName, order_details);
}

exports.read_all_orders = () =>{
    return utils.read_data(fileName);
}

exports.read_user_order = (user) =>{
    return utils.read_data(fileName, user);
}