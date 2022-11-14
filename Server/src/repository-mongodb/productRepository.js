const Db = require('../config/mongoDb');
require('dotenv').config();
const mongodb = require('mongodb');
const productCollection = process.env.MONGO_COL_PRODUCTS;



const read_all_products = async() =>{
    try{
        let db = await Db.db_connect(productCollection);
        const products = await db.find().toArray();
        return products;
    }catch(err){
        throw err;
    }
}



const add_product = async(product) => {
    try{
        let db = await Db.db_connect(productCollection);
        const result = await db.insertOne(product);
        return result.acknowledged;
    }catch(err){
       throw err;
    }
}

const delete_product = async(productId) =>{
    try{
        let db = await Db.db_connect(productCollection);
        const product = await db.findOne({_id:new mongodb.ObjectId(productId)});
        if(product){
            const result = await db.deleteOne({_id:new mongodb.ObjectId(productId)});
            return result.acknowledged;
        }
        throw new Error(`No Product Found for ID: ${productId}`);
    }catch(err){
        throw err;
    }
}

const update_product = async(productId, newProduct) => {
    try{
        let db = await Db.db_connect(productCollection);
        const product = await db.findOne({_id:new mongodb.ObjectId(productId)});
        if(product){
            const result = await db.updateOne({_id:new mongodb.ObjectId(productId)},{$set:newProduct});
            return result.acknowledged;
        }
        throw new Error(`No Product Found for Id: ${productId}`);
    }catch(err){
        throw err;
    }
}

const find_product = async(productId) => { // find product from id
    try{
        let db = await Db.db_connect(productCollection);
        const product = await db.findOne({_id:new mongodb.ObjectId(productId)});
        if(product) return product;
        throw new Error(`No Product found for ID: ${productId}`);
    }catch(err){
        throw err;
    }
}

const search_product = async(keyword) =>{
    try{
        let db = await Db.db_connect(productCollection);
        const allProduct = await db.find().toArray();
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

const search_product1 = async(keyword) =>{
    try{
        let db = await Db.db_connect(productCollection);
        const allProduct = await db.find({
            "$or":[
                {"category":{$regex:keyword}},
                {"model":{$regex:keyword}},
                {"brand":{$regex:keyword}},
                {"description":{$regex:keyword}},
            ]
        }).toArray();

        if(allProduct.length > 0) return allProduct;
        throw new Error(`No Product Found For Keyword ${keyword}`);
    }catch(err){
        throw err;
    }
}



const update_quantity = async(productId, quantity, action) => {
    try{
        let db = await Db.db_connect(productCollection);
        const product = await db.findOne({_id:new mongodb.ObjectId(productId)});
        if(product){
            switch (action) {
                case "increase":
                    var result = await db.updateOne({_id:new mongodb.ObjectId(productId)}, {$set:{quantity:(product.quantity+quantity)}});
                    return result.acknowledged;
                
                case "decrease":
                    var result = await db.updateOne({_id:new mongodb.ObjectId(productId)}, {$set:{quantity:(product.quantity-quantity)}});
                    return result.acknowledged;
            }
        }
        throw new Error(`No Product found on ID: ${productId}`);
        
    }catch(err){
        throw err;
    }

}

module.exports = {add_product, read_all_products, delete_product, update_product, search_product, find_product, update_quantity}
