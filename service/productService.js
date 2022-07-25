const store = require('../database/db.js');
const { v4: uuidv4 } = require('uuid');


const allProducts = store.product.read_all_products(); // Read all Products
const allOrders = store.order.read_all_orders();    // Read all orders

// Check if Product available
const check_product = (productId) => {
    return (Object.keys(allProducts).filter((id) => id == productId).map((item) => allProducts[item]));
}


/* Management: Add Product to file
@params
    1) productDetails: "Products with full details", productObject
@returns
    @if(added sucessfully)
        return success message
    @else
        return Error
*/
const add_product = (product) => {
    try{
        allProducts[uuidv4()] = product;
        if(store.product.save_product(allProducts)){
            console.log("Product added to Database sucessfully");
        }else{
            throw new Error('Error occurs while saving file to database');
        }
    }catch(err){
        console.log(`${err.name} => ${err.message}`);
    }
}


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
        let productNotFound = true;
        if((productId in allProducts) && delete allProducts[productId] && store.product.save_product(allProducts)){
            productNotFound = false;
            console.log("Product removed sucessfully");
        }
        if(productNotFound){
            throw new Error(`No Product found for ID: ${productId}`);
        }
    }catch(err){
        console.log(`${err.name} => ${err.message}`);
    }
}


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
const update_product = (productID, productDetails) => {
    try{
        var noProductFound = true;
        if(productID in allProducts){
            for (key in productDetails){
                allProducts[productID][key] = productDetails[key];
            }
            if(store.product.save_product(allProducts)){
                console.log("Product Updated sucessfully");
            }else{
                throw new Error("Error occurs while updating product");
            }
            noProductFound = false;
        }
        if(noProductFound){
            throw new Error(`No product found for ID : ${productID}`);
        }
    }catch(err){
        console.log(`${err.name} => ${err.message}`);
    }
}


/* Management: Send shipment updates
@params
    1) orderId: "Unique order Id"
@returns
    @if(order found)
        return order status 
    @else
        return error
*/
const send_shipment_updates = (orderId) => {
    try{
        var noOrderFound = true;
        if(orderId in allOrders){
            noOrderFound = false
            return allOrders[key]["shipment"];
        }
        if(noOrderFound){
           throw new Error(`No order found for ID: ${orderId}`);
        }
    }catch(err){
        return (`${err.naem} => ${err.message}`);
    }
}


/* Management: Send return updates
@params
    1) orderId: "Unique order id"
@returns
    @if(order found)
        return order status
    @else
        return Error
*/
const send_return_updates = (orderId) => {
    try{
        var noOrderFound = true;
        if((orderId in allOrders) && (allOrders[orderId]["shipment"]["type"] === "return")){
            noOrderFound = false
            return allOrders[key]["shipment"];
        }
        if(noOrderFound){
            throw new Error(`No order found for return on ID: ${orderId}`);
        }
    }catch(err){
        return(`${err.name} => ${err.message}`);
    }
}


/* Management: Send Payment updates
@params
    1) orderId: "Unique order Id"
@returns
    @if(order found)
        return payment status
    @else
        return Error
    */
const send_payment_updates = (orderId) => {
    try{
        var noOrderFound = true;
        if(orderId in allOrders){
            console.log(`Payment type: ${allOrders[key]["payment"]["type"]} , Status:  ${allOrders[key]["payment"]["status"]}`);
            noOrderFound = false;
            return (`Payment type: ${allOrders[key]["payment"]["type"]} , status : ${allOrders[key]["payment"]["status"]}`);
        }
        if(noOrderFound){
            throw new Error(`No order found for ID: ${orderId}`);
        }
    }catch(err){
        console.log(`${err.naem} => ${err.message}`);
    }
}


/* Management: Prepare revenue report
@params 
    
*/
const prepare_revenue_report = () => {
    try{
    }catch(err){
        console.log(`${err.naem} => ${err.message}`);
    }
}

// Management: Prepare AR Aging report
const prepare_ar_aging_report = () => {
    try{
    }catch(err){
        console.log(`${err.naem} => ${err.message}`);
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
const search_products = (product) => {
    try{
        var noProductFound = true;
        const foundProducts = [];
        for(key in allProducts){
            if(allProducts[key]["name"] === product){
                foundProducts.push(allProducts[key]);
                noProductFound = false
            }
        }
        if(noProductFound){
            throw new Error(`Currently no product available for ${product}`)
        }else{
            return foundProducts;
        }
    }catch(e){
        console.log(`${e.name} => ${e.message}`);
    }
}

module.exports = {add_product,}