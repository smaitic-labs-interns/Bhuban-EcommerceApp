const store = require('../database/db.js');
const Schema = require('../models/productModule');



/* Management: Add Product to file
@params
    1) productDetails: "Products with full details", productObject
@returns
    @if(added sucessfully)
        return success message
    @else
        return Error
*/
const add_product = async(category, model, brand, description, price, quantity, rating) => {
    try{
        const product = await Schema.Product({category, model, brand, description, price, quantity, rating});
        if(!product.error){
            if(store.product.save_product(product.value)){
                console.log("Product added to Database sucessfully");
            }else{
                throw new Error('Error occurs while saving file to database');
            }
        }else{
            throw new Error(product.errMessage);
        }
    }catch(err){
        console.log(`${err.name} => ${err.message}`);
    }
}

// add_product("Radio", "Radio fm 32x4s", "Samsung", "sony radio for music including recording features", 5000, 300, 4);
/*Management:  Remove Product from file
@params 
    1) productId: "Unique Id of that particular Project", uuid
@returns
    @if(removed sucessfully)
        return success message
    @else
        return Error
*/
const remove_product = (productId) => {
    try{
        if(store.product.delete_product(productId)){
            console.log("Product removed sucessfully");
        }else{
            throw new Error(`No Product found for ID: ${productId}`);
        }
    }catch(err){
        console.log(`${err.name} => ${err.message}`);
    }
}

// remove_product("c2416b03-e14a-4b6d-b8cc-e994622dffa2");

/*Management:  Update Product from file
@params
    1) productId: "Unique Id of that particular Project", uuid
    2) productDetails: "Product with full details", productObject
@returns
    @if(Updated sucessfully)
        return success message
    @else
        return Error
*/
const update_product = async(productID, category, model, brand, description, price, quantity, rating) => {
    try{
        const product = await Schema.Update_Product({category, model, brand, description, price, quantity, rating});
        if(!product.error){
            if(store.product.update_product(productID, product.value)){
                console.log("Product updated sucessfully");
            }
        }else{
            throw new Error(product.errMessage);
        }
    }catch(err){
        console.log(`${err.name} => ${err.message}`);
    }
}

/* Management: Prepare revenue report
@params 
    
*/
const prepare_revenue_report = () => {
    try{
    }catch(err){
        console.log(`${err.name} => ${err.message}`);
    }
}

// Management: Prepare AR Aging report
const prepare_ar_aging_report = () => {
    try{
    }catch(err){
        console.log(`${err.name} => ${err.message}`);
    }
}

/************* CUSTOMER FEATURES*****************/

/* Search Product
@params
    1. product: "Product Name", string
@returns
    @if(product found)
        return all_found_products
    @else
        return Error
*/
const search_products = (category) => {
    try{
        const result = store.product.search_product(category);
        if(result.length >0){
            console.log(result);
        }else{
            throw new Error(`No Product Found for Category: ${category}`);
        }
    }catch(e){
        console.log(`${e.name} => ${e.message}`);
    }
}

// search_products("laptop");

module.exports = {add_product, remove_product, update_product, prepare_revenue_report, prepare_ar_aging_report, search_products}