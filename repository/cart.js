const utils = require("../utils/fileUtils.js");
const fileName = './files/cart.json';


exports.add_product = (products) => {
    try{
        utils.write_data(fileName, products);
        return true;
    }catch(err){
        console.log(`${err.name} => ${err.message}`);
        return false;
    }
}

exports.read_all = () =>{
    return utils.read_data(fileName);
}
