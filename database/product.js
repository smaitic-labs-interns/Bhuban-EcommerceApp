const utils = require("../utils/fileUtils.js");
const fileName = './files/products.json';
const { v4: uuidv4 } = require('uuid');




const read_all_products = () =>{
    return utils.read_data(fileName);
}

// const products = read_all_products();

const save_product = (product) => {
    try{
        utils.write_data(fileName, product);
        return true;
    }catch(err){
        console.log(`${err.name} => ${err.message}`);
        return false;
    }
}



// const read_user_order = (user) =>{
//     return utils.read_data(fileName, user);
// }

module.exports = {save_product, read_all_products}