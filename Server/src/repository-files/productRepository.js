const utils = require("../utils/fileUtils.js");
require('dotenv').config();
const fileName = process.env.PRODUCT_FILE_PATH;



const read_all_products = async() =>{
    try{
        return await utils.read_data(fileName);
    }catch(err){
        throw err;
    }
}



const add_product = async(product) => {
    try{
        const allProduct = await read_all_products();
        allProduct.push(product);
        return utils.write_data(fileName, allProduct);
    }catch(err){
       throw err;
    }
}

const delete_product = async(productId) =>{
    try{
        const allProduct = await read_all_products();
        for(var product of allProduct){
            if(product.id === productId){
                var remainingProduct = allProduct.filter(item => item.id !== productId)
                return utils.write_data(fileName, remainingProduct)
            } 
        }
        throw new Error(`No Product Found for ID: ${productId}`);
    }catch(err){
        throw err;
    }
}

const update_product = async(productId, newProduct) => {
    try{
        const allProduct = await read_all_products();
        for(var product of allProduct){
            if(product.id === productId){
                for (key in newProduct){
                    if(newProduct[key].length !== 0){
                        product[key] = newProduct[key];
                    }
                }
                return utils.write_data(fileName, allProduct);
            } 
        }
        throw new Error(`No Product Found for Id: ${productId}`);
    }catch(err){
        throw err;
    }
}

const find_product = async(productId) => { // find product from id
    try{
        const allProduct = await read_all_products();
        for(var product of allProduct){
            if(product.id === productId) return product;
        }
        throw new Error(`No Product found for ID: ${productId}`);
    }catch(err){
        throw err;
    }
}

const search_product = async(keyword) =>{
    try{
        const allProduct = await read_all_products();
        const value = [];
        for(product of allProduct){
            for(key in product){
                if(key === "id"){
                    continue;
                }else if(typeof product[key] === "string" && typeof keyword === "string"){
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
        if(value.length > 0) return value;
        throw new Error(`No Product Found For Keyword ${keyword}`);
    }catch(err){
        throw err;
    }
}
const update_quantity = async(productId, quantity, action) => {
    try{
        const allProduct = await read_all_products();
        for(var product of allProduct){
            if(product.id === productId){
                switch (action) {
                    case "increase":
                        product.quantity += quantity;
                        break;
                    
                    case "decrease":
                        product.quantity -= quantity;
                        break;
                }
                return utils.write_data(fileName, allProduct);
            }
        }
        throw new Error(`No Product found on ID: ${productId}`);
        
    }catch(err){
        throw err;
    }

}

module.exports = {add_product, read_all_products, delete_product, update_product, search_product, find_product, update_quantity}
