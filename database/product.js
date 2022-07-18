const utils = require("../utils/fileUtils.js");
const fileName = './files/products.json';
const uniqueId = require('../utils/uuidGenerator');


const add_product = (product) => {
    try{
        utils.write_data(fileName, product);
        return true;
    }catch(err){
        return err;
    }
}

const read_all_products = () =>{
    return utils.read_data(fileName);
}

const read_user_order = (user) =>{
    return utils.read_data(fileName, user);
}
module.exports = {add_product, read_all_products};