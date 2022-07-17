const utils = require("../utils/fileUtils.js");
const fileName = './files/orders.json';
const uniqueId = require('../utils/uuidGenerator');

const place_order = (order) => {
    const order_details = read_all_orders();
    order_details[uniqueId.generate()] = order;
    utils.write_data(fileName, order_details);
}

const read_all_orders = () =>{
    return utils.read_data(fileName);
}

const read_user_order = (user) =>{
    return utils.read_data(fileName, user);
}
module.exports = {place_order, read_all_orders, read_user_order};