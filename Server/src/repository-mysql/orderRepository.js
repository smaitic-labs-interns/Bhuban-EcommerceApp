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
        let placeOrder = await con.awaitQuery(`INSERT INTO orders (id, userId, totalBill, orderStatus) VALUES (?, ?, ?, ?)`,[order.id, order.userId, order.totalBill, order.orderStatus]);
        if(placeOrder.affectedRows > 0) {
            for(let product of order.products){
                let ordProdRes = await con.awaitQuery(`INSERT INTO order_products (orderId, productId, quantity) VALUES (?, ?, ?)`,[order.id, product.productId, product.quantity]);
            }
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
            let ordProdRes = await con.awaitQuery(`SELECT productId, quantity FROM order_products WHERE orderId = ?`,[orderId]);
            let shipAddRes = await con.awaitQuery(`SELECT country, province, city, ward, tole, houseNo FROM shipment_address WHERE orderId = ?`,[orderId]);
            let shipRes = await con.awaitQuery(`SELECT type , status FROM shipment WHERE orderId = ?`, [orderId]);
            let paymRes = await con.awaitQuery(`SELECT type, status FROM payment WHERE orderId = ?`,[orderId]);

            ordProdRes = JSON.parse(JSON.stringify(ordProdRes));
            shipAddRes = JSON.parse(JSON.stringify(shipAddRes));
            shipRes = JSON.parse(JSON.stringify(shipRes));
            paymRes = JSON.parse(JSON.stringify(paymRes));

            const ord = {...order[0], products:ordProdRes, shippingAddress:shipAddRes[0], payment: paymRes[0], shipment: shipRes[0]}
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
                let updOrdProRes = await con.awaitQuery(`UPDATE order_products SET quantity = ? WHERE productId = ? AND  orderId = ?`,[product.quantity, product.productId, order[0].id]);    
            }
            let updShipAddRes = await con.awaitQuery(`UPDATE shipment_address SET country =? , province =?, city =?, ward =? , tole =? , houseNo =? WHERE orderId = ?`,[newOrder.shippingAddress.country, newOrder.shippingAddress.province, newOrder.shippingAddress.city, newOrder.shippingAddress.ward, newOrder.shippingAddress.tole, newOrder.shippingAddress.houseNo, orderId]);
            let updPaymRes = await con.awaitQuery(`UPDATE payment SET type =?, status =?  WHERE orderId = ?`,[newOrder.payment.type, newOrder.payment.status, orderId]);
            let updShipmRes = await con.awaitQuery(`UPDATE shipment SET type =?, status =?  WHERE orderId = ?`,[newOrder.shipment.type, newOrder.shipment.status, orderId]);
            let updOrdRes = await con.awaitQuery(`UPDATE orders SET totalBill = ?, orderStatus = ? WHERE id = ?`,[newOrder.totalBill, newOrder.orderStatus ,order[0].id]);
            
            if(updShipAddRes.affectedRows > 0 && updPaymRes.affectedRows > 0 && updOrdRes.affectedRows > 0 && updShipmRes.affectedRows > 0) return true;   
        }
        throw new Error(`No order Found for ID: ${orderId}`)
    }catch(err){
        throw err;
    }
}

module.exports = {read_order_from_id, update_order, place_order}