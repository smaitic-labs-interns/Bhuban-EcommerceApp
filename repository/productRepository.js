const utils = require("../utils/fileUtils.js");
require('dotenv').config();
const fileName = process.env.PRODUCT_FILE_PATH;



const read_all_products = () =>{
    return utils.read_data(fileName);
}

const allProduct = read_all_products();

const add_product = (product) => {
    try{
        allProduct.push(product);
        utils.write_data(fileName, allProduct);
        return true;
    }catch(err){
        console.log(`${err.name} => ${err.message}`);
        return false;
    }
}

const delete_product = (productId) =>{
    for(var product of allProduct){
        if(product.id === productId){
            var remainingProduct = allProduct.filter(item => item.id !== productId)
            if(utils.write_data(fileName, remainingProduct)){
                return true;
            }
        } 
    }
    return false;
}

const update_product = (productId, newProduct) => {
    for(var product of allProduct){
        if(product.id === productId){
            for (key in newProduct){
                if(newProduct[key].length !== 0){
                    product[key] = newProduct[key];
                }
            }
            if(utils.write_data(fileName, allProduct)){
                return true;
            }
        } 
    }
    console.log(`No Product Found for Id: ${productId}`);
    return false;
}

const find_product = (productId) => { // find product from id
    for(var product of allProduct){
        if(product.id === productId) return product;
    }
    return false;
}

const search_product =(keyword) =>{
    const value = [];
    for(product of allProduct){
        for(key in product){
            if(typeof product[key] === "string" && typeof keyword === "string"){
                if((product[key].toLowerCase()).indexOf(keyword.toLowerCase()) !== -1){
                    value.push(product);
                    break;
                }
             }else if(typeof product[key] === "number" && typeof keyword === "number"){
                if(product[key] <= keyword){
                    value.push(product);
                    break;
                }
            }
        }
    }
    return value;
}

const decrease_quantity = (productId, quantity) => {
    for(product of allProduct){
        if(product.id === productId){
            product.quantity -= quantity;
            utils.write_data(fileName, allProduct);
            return true;
        }
    }
    return false;
}

const increase_quantity = (productId, quantity) => {
    for(product of allProduct){
        if(product.id === productId){
            product.quantity += quantity;
            utils.write_data(fileName, allProduct);
            return true;
        }
    }
    return false;
}

module.exports = {add_product, read_all_products, delete_product, update_product, search_product, find_product, decrease_quantity, increase_quantity}
