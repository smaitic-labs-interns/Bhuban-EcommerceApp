const con = require('../config/mysqlDb');

const read_all_orders = async() =>{
   try{
    let orders = await con.awaitQuery("SELECT * FROM orders INNER JOIN shipment_address ON orders.id = shipment_address.orderId");
    if(orders.length >0 ) return orders;
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
        let placeOrder = await con.awaitQuery(`INSERT INTO orders (id, userId, cartId, order_status) VALUES (?, ?, ?, ?)`,[order.id, order.userId, order.cartId, order.orderStatus]);
        if(placeOrder.affectedRows > 0) {
            let shipAddRes = await con.awaitQuery(`INSERT INTO shipment_address (orderId, userId, country, province, city, ward, tole, houseNo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,[order.id, order.userId, address.country, address.province, address.city, address.ward, address.tole, address.houseNo]);
            let shipRes = await con.awaitQuery(`INSERT INTO shipment (orderId, userId, type, status) VALUES (?, ?, ?, ?)`, [order.id, order.userId, shipment.type, shipment.status]);
            let paymRes = await con.awaitQuery(`INSERT INTO payment (orderId, userId, type, status) VALUES (?, ?, ?, ?)`,[order.id, order.userId, payment.type, payment.status]);
            if(shipAddRes.affectedRows >0 && shipRes.affectedRows >0 && paymRes.affectedRows > 0 ) return true;
        }
        return false;
    }catch(err){
        console.log(err.message);
        throw err;
    }
}


const read_order_from_id = async(orderId) =>{
    try{
        let order = await con.awaitQuery(`SELECT * FROM orders WHERE id = ?`,[orderId]);
        order = JSON.parse(JSON.stringify(order));
        if(order.length > 0) {
            let shipAddRes = await con.awaitQuery(`SELECT country, province, city, ward, tole, houseNo FROM shipment_address WHERE orderId = ?`,[orderId]);
            let shipRes = await con.awaitQuery(`SELECT type , status FROM shipment WHERE orderId = ?`, [orderId]);
            let paymRes = await con.awaitQuery(`SELECT type, status FROM payment WHERE orderId = ?`,[orderId]);
            let cartRes = await con.awaitQuery(`SELECT userId, totalBill, status FROM carts WHERE id = ?`,[order[0].cartId]);
            let cartProdRes = await con.awaitQuery(`SELECT productId, quantity FROM cart_products WHERE cartId = ?`,[order[0].cartId]);
            shipAddRes = JSON.parse(JSON.stringify(shipAddRes));
            shipRes = JSON.parse(JSON.stringify(shipRes));
            paymRes = JSON.parse(JSON.stringify(paymRes));
            cartRes = JSON.parse(JSON.stringify(cartRes));
            cartProdRes = JSON.parse(JSON.stringify(cartProdRes));

            const ord = {...order[0], ...cartRes[0], products:cartProdRes, shippingAddress:shipAddRes[0], payment: paymRes[0], shipment: shipRes[0]}
           console.log(ord);
            return ord;
        }
        throw new Error(`No Order Found for ID: ${orderId}`);
    }catch(err){
        throw err;
    }
}
 
const update_order = async(orderId, newOrder) =>{
    try{
        let order = await con.awaitQuery(`SELECT * FROM orders WHERE id = ?`,[orderId]);
        order = JSON.parse(JSON.stringify(order));
        if(order.length > 0) {
            for(product of newOrder.products){
                let updCartProRes = await con.awaitQuery(`UPDATE cart_products SET quantity = ? WHERE productId = ? AND  cartId = ?`,[product.quantity, product.productId, order[0].cartId]);
            }
            let updCartRes = await con.awaitQuery(`UPDATE carts SET totalBill = ? WHERE id = ?`,[newOrder.totalBill, order[0].cartId]);
            if(updCartRes.affectedRows > 0) return true;   
        }
        throw new Error(`No order Found for ID: ${orderId}`)
    }catch(err){
        throw err;
    }
}

module.exports = {read_order_from_id, update_order, place_order}