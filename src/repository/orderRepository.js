const con = require('../config/mysqlDb');
const Db = require('../config/mongoDb');
const orderCollection = "orders";

const read_all_orders = async() =>{
   try{
    let orders = await con.awaitQuery("SELECT * FROM orders FULL OUTER JOIN Shipment_address, payment, shipment ON orders.id = shipment_address.orderId");
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
        let placeOrder = await con.awaitQuery(`INSERT INTO orders (id, cartId, order_status) VALUES (?, ?, ?)`,[order.id, order.cartId, order.orderStatus]);
        if(placeOrder.affectedRows > 0) {
            let shipAddRes = await con.awaitQuery(`INSERT INTO shipment_address (orderId, country, province, city, ward, tole, houseNo) VALUES (?, ?, ?, ?, ?, ?, ?)`,[order.id, address.country, address.province, address.city, address.ward, address.tole, address.houseNo]);
            let shipRes = await con.awaitQuery(`INSERT INTO shipment (orderId, type, status) VALUES (?, ?, ?)`, [order.id, shipment.type, shipment.status]);
            let paymRes = await con.awaitQuery(`INSERT INTO payment (orderId, type, status) VALUES (?, ?, ?)`,[order.id, payment.type, payment.status]);
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
        let db = await Db.db_connect(orderCollection);
        const order = await db.findOne({id:orderId});
        if(order) return order;
        throw new Error(`No Order Found for ID: ${orderId}`);
    }catch(err){
        throw err;
    }
}
 
const update_order = async(orderId, newOrder) =>{
    try{
        let db = await Db.db_connect(orderCollection);
        const order = await db.findOne({id:orderId});
        if(order){
            const result = await db.updateOne({id:orderId},{$set:newOrder});
            return result.acknowledged;
        }
        throw new Error(`No order Found for ID: ${orderId}`)
    }catch(err){
        throw err;
    }
}

module.exports = {read_order_from_id, update_order, place_order}