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

exports.read_user_order = (user) =>{
    return utils.read_data(fileName, user);
}