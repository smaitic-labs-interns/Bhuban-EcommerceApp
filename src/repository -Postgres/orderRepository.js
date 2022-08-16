const con = require('../config/postGres');

const read_all_orders = async() =>{
   try{
    let orders = await con.query("SELECT * FROM orders INNER JOIN shipment_address ON orders.id = shipment_address.orderId");
    if(orders.rowCount >0 ) return orders.rows;
    throw new Error(`No cart Found`);
   }catch(err){
    throw err
   }
}

const place_order = async(order) => {
    try{
        const address = order.shippingAddress;
        const shipment = order.shipment;
        const payment = order.payment;
        let placeOrder = await con.query(`INSERT INTO orders (id, userId, cartId, orderStatus) VALUES ($1, $2, $3, $4)`,[order.id, order.userId, order.cartId, order.orderStatus]);
        if(placeOrder.rowCount > 0) {
            let shipAddRes = await con.query(`INSERT INTO shipment_address (orderId, userId, country, province, city, ward, tole, houseNo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,[order.id, order.userId, address.country, address.province, address.city, address.ward, address.tole, address.houseNo]);
            let shipRes = await con.query(`INSERT INTO shipment (orderId, userId, type, status) VALUES ($1, $2, $3, $4)`, [order.id, order.userId, shipment.type, shipment.status]);
            let paymRes = await con.query(`INSERT INTO payment (orderId, userId, type, status) VALUES ($1, $2, $3, $4)`,[order.id, order.userId, payment.type, payment.status]);
            if(shipAddRes.rowCount >0 && shipRes.rowCount >0 && paymRes.rowCount > 0 ) return true;
        }
        return false;
    }catch(err){
        throw err;
    }
}


const read_order_from_id = async(orderId) =>{
    try{
        let order = await con.query(`SELECT * FROM orders WHERE id = $1`,[orderId]);
        if(order.rowCount > 0) {
            let cartId = order.rows[0].cartid;
            order= order.rows[0];
            let shipAddRes = await con.query(`SELECT country, province, city, ward, tole, houseNo FROM shipment_address WHERE orderId = $1`,[orderId]);
            let shipRes = await con.query(`SELECT type , status FROM shipment WHERE orderId = $1`, [orderId]);
            let paymRes = await con.query(`SELECT type, status FROM payment WHERE orderId = $1`,[orderId]);
            let cartRes = await con.query(`SELECT * FROM carts WHERE id = $1`,[cartId]);
            let cartProdRes = await con.query(`SELECT * FROM cart_products WHERE cartId = $1`,[cartId]);
            shipAddRes = shipAddRes.rows[0]
            shipRes = shipRes.rows;
            paymRes = paymRes.rows;
            cartRes = cartRes.rows[0];
            for(key in shipAddRes){
                if(key === 'houseno'){
                    shipAddRes.houseNo = shipAddRes[key];
                    delete shipAddRes.houseno
                }
            }
            const prdts = [];
            for(item of cartProdRes.rows){
                prdts.push({productId:item.productid, quantity: Number(item.quantity)});
            }
            const ord = {id:order.id, userId: order.userid, cartId:order.cartid , orderStatus:order.orderstatus, totalBill: Number(cartRes.totalbill), products:prdts, shippingAddress:shipAddRes, payment: paymRes[0], shipment: shipRes[0]}
            return ord;
        }
        throw new Error(`No Order Found for ID: ${orderId}`);
    }catch(err){
        throw err;
    }
}
 

const update_order = async(orderId, newOrder) =>{
    try{
        let order = await con.query(`SELECT * FROM orders WHERE id = $1`,[orderId]);
        if(order.rowCount > 0) {
            order = order.rows[0];
            order = {id:order.id, userId: order.userid, cartId: order.cartid, orderStatus: order.orderstatus}
            const newAdd = newOrder.shippingAddress;
            const newPaym = newOrder.payment;
            for(product of newOrder.products){
                let updCartProRes = await con.query(`UPDATE cart_products SET quantity = $1 WHERE productId = $2 AND  cartId = $3`,[product.quantity, product.productId, order.cartId]);
            }
            let updCartRes = await con.query(`UPDATE carts SET totalBill = $1 WHERE id = $2`,[newOrder.totalBill, order.cartId]);
            let updateOrdAdd = await con.query(`UPDATE shipment_address SET country =$1, province =$2, city =$3, ward =$4, tole =$5, houseNo =$6 WHERE orderId = $7`,[newAdd.country, newAdd.province, newAdd.city, newAdd.ward, newAdd.tole, newAdd.houseNo, orderId]);
            let updatePaymRes = await con.query(`UPDATE payment SET type =$1, status =$2 WHERE orderId =$3`,[newPaym.type, newPaym.status, orderId]);
            if(updCartRes.rowCount > 0 && updateOrdAdd.rowCount > 0 && updatePaymRes.rowCount > 0) return true;   
        }
        throw new Error(`No order Found for ID: ${orderId}`)
    }catch(err){
        throw err;
    }
}

const update_order_address = async(orderId, newAddress) =>{
    try{
        let order = await con.query(`SELECT * FROM orders WHERE id = $1`,[orderId]);
        if(order.rowCount > 0) {
            let updateOrdAdd = await con.query(`UPDATE shipment_address SET country =$1, province =$2, city =$3, ward =$4, tole =$5, houseNo =$6 WHERE orderId = $7`,[newAdd.country, newAdd.province, newAdd.city, newAdd.ward, newAdd.tole, newAdd.houseNo, orderId]);
            if(updateOrdAdd.rowCount > 0) return true;   
        }
        throw new Error(`No order Found for ID: ${orderId}`)
    }catch(err){
        throw err;
    }
}

const update_order_payment = async(orderId, newPayment) =>{
    try{
        let order = await con.query(`SELECT * FROM orders WHERE id = $1`,[orderId]);
        if(order.rowCount > 0) {
            let updatePaymRes = await con.query(`UPDATE payment SET type =$1, status =$2 WHERE orderId =$3`,[newPaym.type, newPaym.status, orderId]);
            if(updatePaymRes.rowCount > 0) return true;   
        }
        throw new Error(`No order Found for ID: ${orderId}`)
    }catch(err){
        throw err;
    }
}

module.exports = {read_order_from_id, update_order, place_order}