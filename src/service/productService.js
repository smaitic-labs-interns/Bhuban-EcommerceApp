const store = require('../repository/dbRepository');
const Schema = require('../models/productModel');
const Validate = require('../utils/validations');

 

/* Management: Add Product to file
@params
    1) productDetails: "Products with full details", productObject
@returns
    @if(added sucessfully)
        return success message
    @else
        return Error
*/
const add_product = (category, model, brand, description, price, quantity, rating) => {
    try{
        const product = Schema.Product({category, model, brand, description, price, quantity, rating});
        if(store.product.add_product(product)){
            console.log("Product added to Database sucessfully");
        }
    }catch(err){ 
        console.log(`${err.name} => ${err.message}`);
    }
}

// add_product("laptop", "Dell inspirion 5567", "dell", "Dell laptop ", 50000, 30, 4);
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
        }
    }catch(err){
        console.log(`${err.name} => ${err.message}`);
    }
}

// remove_product("effc0d18-dcea-4498-9abb-30747ca23491");

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
const update_product = (productID, category, model, brand, description, price, quantity, rating) => {
    try{
        const {error, value} = Validate.updating_product_validation({category, model, brand, description, price, quantity, rating});
        if(error) throw error;
        if(store.product.update_product(productID, value)){
            console.log("Product updated sucessfully");
        }        
    }catch(err){
        console.log(`${err.name} => ${err.message}`);
    }
}
// update_product("effc0d18-dcea-4498-9abb-30747ca23491",category="", model= "dell inspirion 5567", brand = "dell", description="", price="100000", quantity="", rating="");

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
const search_products = (keyword) => {
    try{
        const result = store.product.search_product(keyword);
        console.log(result);
    }catch(e){
        console.log(`${e.name} => ${e.message}`);
    }
}

// search_products("a");

module.exports = {add_product, remove_product, update_product, prepare_revenue_report, prepare_ar_aging_report, search_products}