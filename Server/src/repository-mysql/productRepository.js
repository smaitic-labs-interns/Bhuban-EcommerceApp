const con = require('../config/mysqlDb');

const read_all_products = async() =>{
    try{
        let products = await con.awaitQuery("SELECT * FROM products");
        if(products.length >0 ) return products;
        throw new Error(`No Product Found`);
    }catch(err){
        throw err;
    }
}



const add_product = async(product) => {
    try{
        const result = await con.awaitQuery("INSERT INTO products SET ? ", product);
        if(result.affectedRows > 0) return true;
        throw new Error('Error occurs adding product. Try again Later');
    }catch(err){
       throw err;
    }
}

const delete_product = async(productId) =>{
    try{
        const result = await con.awaitQuery("SELECT * FROM products WHERE id= ?", productId);
        if(result.length > 0){
            const delRes = await con.awaitQuery("DELETE FROM products WHERE id= ?", productId);
            if(delRes.affectedRows > 0) return true;
        }
        throw new Error(`No Product Found for ID: ${productId}`);
    }catch(err){
        throw err;
    }
}

const update_product = async(productId, newProduct) => {
    try{
        const result = await con.awaitQuery("SELECT * FROM products WHERE id= ?", productId);
        if(result.length > 0){
            const updRes = await con.awaitQuery("UPDATE products SET ? WHERE id= ?", [newProduct , productId]);
            if(updRes.affectedRows > 0) return true;
        }
        throw new Error(`No Product Found for Id: ${productId}`);
    }catch(err){
        throw err;
    }
}

const find_product = async(productId) => { // find product from id
    try{
        const product = await con.awaitQuery("SELECT * FROM products WHERE id= ?", productId);
        if(product.length > 0) return product[0];
        throw new Error(`No Product found for ID: ${productId}`);
    }catch(err){
        throw err;
    }
}

const search_product = async(keyword) =>{
    try{
        let allProduct = await con.awaitQuery("SELECT * FROM products");
        allProduct =JSON.parse(JSON.stringify(allProduct));
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
        const product = await con.awaitQuery("SELECT * FROM products WHERE id= ?", productId);

        if(product.length > 0){
            switch (action) {
                case "increase":
                    var result = await con.awaitQuery("UPDATE products SET quantity =? WHERE id =? ", [product[0].quantity+quantity, productId]);
                    if(result.affectedRows > 0) return true;

                
                case "decrease":
                    var result = await con.awaitQuery("UPDATE products SET quantity =? WHERE id =? ", [product[0].quantity - quantity, productId]);
                    if(result.affectedRows > 0) return true;
            }
        }
        throw new Error(`No Product found on ID: ${productId}`);
        
    }catch(err){
        throw err;
    }

}

module.exports = {add_product, read_all_products, delete_product, update_product, search_product, find_product, update_quantity}
