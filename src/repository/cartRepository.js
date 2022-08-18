const con = require('../config/postGres');

const read_all_cart = async() =>{
    try{
        let carts = await con.query("SELECT * FROM carts");
        if(carts.rowCount !== 0 ) return carts.rows;
        throw new Error(`No cart Found`);
    }catch(err){
        throw err;
    }
}


const add_cart = async(cart) =>{
    try{
        let addCartRes = await con.query(`INSERT INTO carts (id, userId, totalBill, status) VALUES ($1, $2, $3, $4)`,[cart.id, cart.userId, cart.totalBill, cart.status]);
        if(addCartRes.rowCount > 0){
            for(product of cart.products){
                let addProductRes = await con.query(`INSERT INTO cart_products (cartId, productId, quantity) VALUES ($1, $2, $3)`,[cart.id, product.productId, product.quantity]);
                if(addProductRes.rowCount >0) return true;
            }
            throw new Error(`Error occurs adding product to cart`);
        }
        throw new Error(`Error occurs adding Cart`)
    }catch(err){
        console.log(`${err.name} => ${err.message}`);
        throw err;
    }
}

const find_cart = async(cartId) => { // find cart from id
    try{
        let cart = await con.query(`SELECT * FROM carts WHERE id =$1`,[cartId]);
        if(cart.rowCount > 0){
            let product = await con.query(`SELECT productId, quantity FROM cart_products WHERE cartId =$1`,[cartId]);
            const prdts = [];
            for(item of product.rows){
                prdts.push({productId:item.productid, quantity: Number(item.quantity)});
            }

            let cart2={id: cart.rows[0].id, userId: cart.rows[0].userid, totalBill: Number(cart.rows[0].totalbill), status: cart.rows[0].status, products:prdts}
            if(cart.rowCount > 0) return cart2;
        }
        return false;
    }catch(err){
        throw err;
    }
}

const update_cart = async(newCart) => {
    try{
        // const text = '`UPDATE carts SET totalBill =$1 , status =$2 WHERE id =$3` RETURNING *'
        // const values = [newCart.totalBill, newCart.status, cartId]
        // let updateCartRes = await con.query(text, values);
        let updateCartRes = await con.query(`UPDATE carts SET totalBill =$1 , status =$2 WHERE id =$3`,[newCart.totalBill, newCart.status, newCart.id]);
        let res = false;
        if(updateCartRes.rowCount > 0){
            for(product of newCart.products){
                let productRes = await con.query(`SELECT * FROM cart_products WHERE cartId = $1 AND productId = $2 `, [newCart.id, product.productId]);
                if(productRes.rowCount > 0){
                    let updateQuantityRes = await con.query(`UPDATE cart_products SET quantity =$1 WHERE cartId =$2 AND productId = $3 `,[product.quantity, newCart.id,  product.productId]);
                    if(updateQuantityRes.rowCount >0) res = true;
                }else{
                    let updateProduct = await con.query(`INSERT INTO cart_products (cartId, productId, quantity) VALUES ($1, $2, $3)`,[newCart.id, product.productId, product.quantity]);
                    if(updateProduct.rowCount >0) res = true;
                }
            }
            return res;
        }
        throw new Error(`Error occur Updating Cart`);
    }catch(err){
        throw err;
    }
}

const delete_cart = async(cartId) => {
    try{
        const cart = await con.query("SELECT * FROM carts WHERE id= $1", [cartId]);
        if(cart.rowCount > 0){
            const delRes = await con.query("DELETE FROM carts WHERE id= $2", [cartId]);
            if(delRes.rowCount > 0) return true;
        }
        throw new Error(`No cart found for ID: ${cartId}`);
    }catch(err){
        throw err;
    }
}

const update_cart_status = async(cartId, status) => {
    try{
        const cart = await con.query("SELECT * FROM carts WHERE id= $1", [cartId]);
        if(cart.rowCount > 0){
            const updCartRes = await con.query("UPDATE carts SET status =$1 WHERE id= $2", [status, cartId]);
            if(updCartRes.rowCount > 0) return true;
        }
        throw new Error(`No cart found for ID: ${cartId}`);
    }catch(err){
        throw err;
    }
}

const find_active_cart = async(userId) => {
    try{
        const cart = await con.query("SELECT * FROM carts WHERE userId= $1 and status = $2", [userId, "active"]);
        if(cart.rowCount > 0){
            let cartId = cart.rows[0].id;
            let product = await con.query(`SELECT * FROM cart_products WHERE cartId =$1`,[cartId]);
            const prdts = [];
            for(item of product.rows){
                prdts.push({productId:item.productid, quantity: Number(item.quantity)});
            }

            let cart2={id: cart.rows[0].id, userId: cart.rows[0].userid, totalBill: Number(cart.rows[0].totalbill), status: cart.rows[0].status, products:prdts}
            if(cart.rowCount > 0) return cart2;
        }
        return false;
    }catch(err){
        throw err;
    }
}

module.exports ={add_cart, read_all_cart, find_cart, update_cart, delete_cart, update_cart_status, find_active_cart}