const utils = require("../utils/fileUtils.js");
const fileName = './files/products.json';



const read_all_products = () =>{
    return utils.read_data(fileName);
}

const allProduct = read_all_products();

const save_product = (product) => {
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
    try{
        var noProductFound = true;
        for(var i =0; i < allProduct.length; i++){
            if(allProduct[i].id === productId){
                var remainingProduct = allProduct.filter(item => item.id !== productId)
                if(utils.write_data(fileName, remainingProduct)){
                    noProductFound = false;
                    return true;
                }
            } 
        }
        if(noProductFound){
            return false;
        }
    }catch(err){
        console.log(`${err.name} => ${err.message}`);
        return false;
    }
}

const update_product = (productId, product) => {
    try{
        var noProductFound = true;
        for(var i =0; i < allProduct.length; i++){
            if(allProduct[i].id === productId){
                for (key in product){
                    if(product[key].length !== 0){
                        allProduct[i][key] = product[key];
                    }
                }
                if(utils.write_data(fileName, allProduct)){
                    noProductFound = false;
                    return true;
                }
            } 
        }
        if(noProductFound){
            throw new Error(`No Product Found for Id: ${productId}`)
        }
    }catch(err){
        console.log(`${err.name} => ${err.message}`);
        return false;
    }
}


const search_product =(category) =>{
    const value = [];
    try{
        for(var i =0; i < allProduct.length; i++){
            if(allProduct[i].category.toLowerCase() === category.toLowerCase()){
                value.push(allProduct[i]);
            } 
        }
    }catch(err){
        console.log(`${err.name} => ${err.message}`);
   
    }finally{
        return value;
    }
}


module.exports = {save_product, read_all_products, delete_product, update_product, search_product}
