const con = require('../config/postGres');

const get_all_product = async() =>{
    try{
        let products = await con.query("SELECT * FROM products");
        if(products.rowCount !== 0 ) return products.rows;
        throw new Error(`No product Found`);
    }catch(err){
        throw err;
    }
}

const add_product = async(product) => {
    try{
        const result = await con.query("INSERT INTO products (id, category, model, brand, description, price, quantity, rating) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)", [product.id, product.category, product.model, product.brand, product.description, product.price, product.quantity, product.rating]);
        if(result.rowCount > 0) return true;
        throw new Error('Error occurs adding product. Try again Later');
    }catch(err){
       throw err;
    }
}

const delete_product = async(productId) =>{
    try{
        const result = await con.query("SELECT * FROM products WHERE id= $1", [productId]);
        if(result.rowCount > 0){
            const delRes = await con.query("DELETE FROM products WHERE id= $1", [productId]);
            if(delRes.rowCount > 0) return true;
        }
        throw new Error(`No Product Found for ID: ${productId}`);
    }catch(err){
        throw err;
    }
}

const update_product = async(productId, newProduct) => {
    try{
        const result = await con.query("SELECT * FROM products WHERE id= $1", [productId]);
        if(result.rowCount > 0){
            const updRes = await con.query("UPDATE products SET category =$1, model =$2, brand =$3, description =$4, price =$5, quantity =$6, rating =$7 WHERE id= $8", [newProduct.category, newProduct.model, newProduct.brand, newProduct.description, newProduct.price, newProduct.quantity, newProduct.rating, productId]);
            if(updRes.rowCount > 0) return true;
        }
        throw new Error(`No Product Found for Id: ${productId}`);
    }catch(err){
        throw err;
    }
}

const find_product = async(productId) => { // find product from id
    try{
        const product = await con.query("SELECT * FROM products WHERE id= $1", [productId]);
        if(product.rowCount > 0) return product.rows[0];
        throw new Error(`No Product found for ID: ${productId}`);
    }catch(err){
        throw err;
    }
}

const search_product = async(keyword) =>{
    try{
        const allProduct = await con.query("SELECT * FROM products");
        const value = [];
        for(product of allProduct.rows){
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
        const product = await con.query("SELECT * FROM products WHERE id= $1", [productId]);
        if(product.rowCount > 0){
            switch (action) {
                case "increase":
                    var result = await con.query("UPDATE products SET quantity =$1 WHERE id =$2 ", [product.rows[0].quantity+quantity, productId]);
                    if(result.rowCount > 0) return true;

                
                case "decrease":
                    var result = await con.query("UPDATE products SET quantity =$1 WHERE id =$2 ", [product.rows[0].quantity - quantity, productId]);
                    if(result.rowCount > 0) return true;
            }
        }
        throw new Error(`No Product found on ID: ${productId}`);
        
    }catch(err){
        throw err;
    }

}

module.exports = {add_product, get_all_product, delete_product, update_product, search_product, find_product, update_quantity}
