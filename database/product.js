const utils = require("../utils/fileUtils.js");
const fileName = './files/products.json';


exports.add_product = (product) => {
    try{
        utils.write_data(fileName, product);
        return true;
    }catch(err){
        return err;
    }
}

exports.read_all_products = () =>{
    return utils.read_data(fileName);
}

exports.read_user_order = (user) =>{
    return utils.read_data(fileName, user);
}
