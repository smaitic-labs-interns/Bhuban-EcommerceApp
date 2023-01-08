const con = require("../config/postGres");

const read_all_orders = async () => {
  try {
    let orders = await con.query(`SELECT * FROM orders`);
    const allOrders = [];
    if (orders.rowCount > 0) {
      for (let order of orders.rows) {
        order.totalbill /= 100;
        let ordProdRes = await con.query(
          `SELECT productId, quantity FROM order_products WHERE orderId = $1`,
          [order.id]
        );
        let shipAddRes = await con.query(
          `SELECT country, province, city, ward, tole, houseNo FROM shipment_address WHERE orderId = $1`,
          [order.id]
        );
        let shipRes = await con.query(
          `SELECT type , status FROM shipment WHERE orderId = $1`,
          [order.id]
        );
        let paymRes = await con.query(
          `SELECT type, status FROM payment WHERE orderId = $1`,
          [order.id]
        );
        ordProdRes = ordProdRes.rows;
        shipAddRes = shipAddRes.rows[0];
        shipRes = shipRes.rows[0];
        paymRes = paymRes.rows[0];

        for (key in shipAddRes) {
          if (key === "houseno") {
            shipAddRes.houseNo = shipAddRes[key];
            delete shipAddRes.houseno;
          }
        }
        const prdts = [];
        for (item of ordProdRes) {
          prdts.push({
            productId: item.productid,
            quantity: Number(item.quantity),
          });
        }
        let ord = {
          id: order.id,
          userId: order.userid,
          orderStatus: order.orderstatus,
          totalBill: Number(order.totalbill),
          products: prdts,
          shippingAddress: shipAddRes,
          payment: paymRes,
          shipment: shipRes,
          placedOn: order.createdat,
        };
        allOrders.push(ord);
      }

      return allOrders;
    }
    throw new Error(`No Orders Found `);
  } catch (err) {
    throw err;
  }
};

const read_limited_orders = async ({ page, limit }) => {
  try {
    let res = await con.query("SELECT COUNT(*) FROM orders");
    const length = res.rows[0].count;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const result = {};

    if (endIndex < length) {
      result.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      result.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    let orders = await con.query(
      `SELECT * FROM orders ORDER BY createdAt DESC offset $1 LIMIT $2`,
      [startIndex, endIndex]
    );
    const allOrders = [];
    if (orders.rowCount > 0) {
      for (let order of orders.rows) {
        order.totalbill /= 100;
        let ordProdRes = await con.query(
          `SELECT productId, quantity FROM order_products WHERE orderId = $1`,
          [order.id]
        );
        let shipAddRes = await con.query(
          `SELECT country, province, city, ward, tole, houseNo FROM shipment_address WHERE orderId = $1`,
          [order.id]
        );
        let shipRes = await con.query(
          `SELECT type , status FROM shipment WHERE orderId = $1`,
          [order.id]
        );
        let paymRes = await con.query(
          `SELECT type, status FROM payment WHERE orderId = $1`,
          [order.id]
        );
        ordProdRes = ordProdRes.rows;
        shipAddRes = shipAddRes.rows[0];
        shipRes = shipRes.rows[0];
        paymRes = paymRes.rows[0];

        for (key in shipAddRes) {
          if (key === "houseno") {
            shipAddRes.houseNo = shipAddRes[key];
            delete shipAddRes.houseno;
          }
        }
        const prdts = [];
        for (item of ordProdRes) {
          prdts.push({
            productId: item.productid,
            quantity: Number(item.quantity),
          });
        }
        let ord = {
          id: order.id,
          userId: order.userid,
          orderStatus: order.orderstatus,
          totalBill: Number(order.totalbill),
          products: prdts,
          shippingAddress: shipAddRes,
          payment: paymRes,
          shipment: shipRes,
          placedOn: order.createdat,
        };
        allOrders.push(ord);
      }

      result.data = allOrders;
      return result;
    }
    throw new Error(`No Orders Found `);
  } catch (err) {
    throw err;
  }
};

const read_user_orders = async (userId) => {
  try {
    let orders = await con.query(`SELECT * FROM orders WHERE userId = $1`, [
      userId,
    ]);
    const allOrders = [];
    if (orders.rowCount > 0) {
      for (let order of orders.rows) {
        order.totalbill /= 100;
        let ordProdRes = await con.query(
          `SELECT productId, quantity FROM order_products WHERE orderId = $1`,
          [order.id]
        );
        let shipAddRes = await con.query(
          `SELECT country, province, city, ward, tole, houseNo FROM shipment_address WHERE orderId = $1`,
          [order.id]
        );
        let shipRes = await con.query(
          `SELECT type , status FROM shipment WHERE orderId = $1`,
          [order.id]
        );
        let paymRes = await con.query(
          `SELECT type, status FROM payment WHERE orderId = $1`,
          [order.id]
        );
        ordProdRes = ordProdRes.rows;
        shipAddRes = shipAddRes.rows[0];
        shipRes = shipRes.rows[0];
        paymRes = paymRes.rows[0];

        for (key in shipAddRes) {
          if (key === "houseno") {
            shipAddRes.houseNo = shipAddRes[key];
            delete shipAddRes.houseno;
          }
        }
        const prdts = [];
        for (item of ordProdRes) {
          prdts.push({
            productId: item.productid,
            quantity: Number(item.quantity),
          });
        }
        let ord = {
          id: order.id,
          userId: order.userid,
          orderStatus: order.orderstatus,
          totalBill: Number(order.totalbill),
          products: prdts,
          shippingAddress: shipAddRes,
          payment: paymRes,
          shipment: shipRes,
          placedOn: order.createdat,
        };
        allOrders.push(ord);
      }

      return allOrders;
    }
    throw new Error(`No Orders Found for user ID: ${userId}`);
  } catch (err) {
    throw err;
  }
};

const read_user_order_limited = async ({ page, limit, userId }) => {
  try {
    let res = await con.query("SELECT COUNT(*) FROM orders WHERE userId = $1", [
      userId,
    ]);
    const length = res.rows[0].count;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const result = {};

    if (endIndex < length) {
      result.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      result.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    let orders = await con.query(
      `SELECT * FROM orders WHERE userId = $1 ORDER BY createdAt DESC offset $2 LIMIT $3`,
      [userId, startIndex, endIndex]
    );
    const allOrders = [];
    if (orders.rowCount > 0) {
      for (let order of orders.rows) {
        order.totalbill /= 100;
        let ordProdRes = await con.query(
          `SELECT productId, quantity FROM order_products WHERE orderId = $1`,
          [order.id]
        );
        let shipAddRes = await con.query(
          `SELECT country, province, city, ward, tole, houseNo FROM shipment_address WHERE orderId = $1 `,
          [order.id]
        );
        let shipRes = await con.query(
          `SELECT type , status FROM shipment WHERE orderId = $1`,
          [order.id]
        );
        let paymRes = await con.query(
          `SELECT type, status FROM payment WHERE orderId = $1`,
          [order.id]
        );
        ordProdRes = ordProdRes.rows;
        shipAddRes = shipAddRes.rows[0];
        shipRes = shipRes.rows[0];
        paymRes = paymRes.rows[0];

        for (key in shipAddRes) {
          if (key === "houseno") {
            shipAddRes.houseNo = shipAddRes[key];
            delete shipAddRes.houseno;
          }
        }
        const prdts = [];
        for (item of ordProdRes) {
          prdts.push({
            productId: item.productid,
            quantity: Number(item.quantity),
          });
        }
        let ord = {
          id: order.id,
          userId: order.userid,
          orderStatus: order.orderstatus,
          totalBill: Number(order.totalbill),
          products: prdts,
          shippingAddress: shipAddRes,
          payment: paymRes,
          shipment: shipRes,
          placedOn: order.createdat,
        };
        allOrders.push(ord);
      }
      result.data = allOrders;
      return result;
    }
    throw new Error(`No Orders Found for user ID: ${userId}`);
  } catch (err) {
    throw err;
  }
};

const place_order = async (order) => {
  try {
    const address = order.shippingAddress;
    const shipment = order.shipment;
    const payment = order.payment;
    let placeOrder = await con.query(
      `INSERT INTO orders (id, userId,totalBill, orderStatus) VALUES ($1, $2, $3, $4)`,
      [order.id, order.userId, order.totalBill * 100, order.orderStatus]
    );
    if (placeOrder.rowCount > 0) {
      for (let product of order.products) {
        let ordProdRes = await con.query(
          `INSERT INTO order_products (orderId, productId, quantity) VALUES ($1, $2, $3)`,
          [order.id, product.productId, product.quantity]
        );
      }
      let shipAddRes = await con.query(
        `INSERT INTO shipment_address (orderId, userId, country, province, city, ward, tole, houseNo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
          order.id,
          order.userId,
          address.country,
          address.province,
          address.city,
          address.ward,
          address.tole,
          address.houseNo,
        ]
      );
      let shipRes = await con.query(
        `INSERT INTO shipment (orderId, userId, type, status) VALUES ($1, $2, $3, $4)`,
        [order.id, order.userId, shipment.type, shipment.status]
      );
      let paymRes = await con.query(
        `INSERT INTO payment (orderId, userId, type, status) VALUES ($1, $2, $3, $4)`,
        [order.id, order.userId, payment.type, payment.status]
      );
      if (
        shipAddRes.rowCount > 0 &&
        shipRes.rowCount > 0 &&
        paymRes.rowCount > 0
      )
        return true;
    }
    return false;
  } catch (err) {
    throw err;
  }
};

const read_order_from_id = async (orderId) => {
  try {
    let order = await con.query(`SELECT * FROM orders WHERE id = $1`, [
      orderId,
    ]);
    if (order.rowCount > 0) {
      order = order.rows[0];
      let ordProdRes = await con.query(
        `SELECT productId, quantity FROM order_products WHERE orderId = $1`,
        [orderId]
      );
      let shipAddRes = await con.query(
        `SELECT country, province, city, ward, tole, houseNo FROM shipment_address WHERE orderId = $1`,
        [orderId]
      );
      let shipRes = await con.query(
        `SELECT type , status FROM shipment WHERE orderId = $1`,
        [orderId]
      );
      let paymRes = await con.query(
        `SELECT type, status FROM payment WHERE orderId = $1`,
        [orderId]
      );

      ordProdRes = ordProdRes.rows;
      shipAddRes = shipAddRes.rows[0];
      shipRes = shipRes.rows[0];
      paymRes = paymRes.rows[0];

      for (key in shipAddRes) {
        if (key === "houseno") {
          shipAddRes.houseNo = shipAddRes[key];
          delete shipAddRes.houseno;
        }
      }
      const prdts = [];
      for (item of ordProdRes) {
        prdts.push({
          productId: item.productid,
          quantity: Number(item.quantity),
        });
      }
      const ord = {
        id: order.id,
        userId: order.userid,
        orderStatus: order.orderstatus,
        totalBill: Number(order.totalbill) / 100,
        products: prdts,
        shippingAddress: shipAddRes,
        payment: paymRes,
        shipment: shipRes,
        placedOn: order.createdat,
      };
      return ord;
    }
    throw new Error(`No Order Found for ID: ${orderId}`);
  } catch (err) {
    throw err;
  }
};

const update_order = async (orderId, newOrder) => {
  try {
    let order = await con.query(`SELECT * FROM orders WHERE id = $1`, [
      orderId,
    ]);
    if (order.rowCount > 0) {
      order = order.rows[0];
      // order = {id:order.id, userId: order.userid, products: order.products, orderStatus: order.orderstatus, totalBill:}

      const newAdd = newOrder.shippingAddress;
      const newPaym = newOrder.payment;
      const newShipm = newOrder.shipment;
      for (product of newOrder.products) {
        let updOrdProRes = await con.query(
          `UPDATE order_products SET quantity = $1 WHERE productId = $2 AND  orderId = $3`,
          [product.quantity, product.productId, orderId]
        );
      }

      let updShipAddRes = await con.query(
        `UPDATE shipment_address SET country =$1, province =$2, city =$3, ward =$4, tole =$5, houseNo =$6 WHERE orderId = $7`,
        [
          newAdd.country,
          newAdd.province,
          newAdd.city,
          newAdd.ward,
          newAdd.tole,
          newAdd.houseNo,
          orderId,
        ]
      );
      let updPaymRes = await con.query(
        `UPDATE payment SET type =$1, status =$2 WHERE orderId =$3`,
        [newPaym.type, newPaym.status, orderId]
      );
      let updShipmRes = await con.query(
        `UPDATE shipment SET type =$1, status =$2 WHERE orderId =$3`,
        [newShipm.type, newShipm.status, orderId]
      );
      let updOrdRes = await con.query(
        `UPDATE orders SET totalBill = $1, orderStatus = $2 WHERE id = $3`,
        [newOrder.totalBill * 100, newOrder.orderStatus, orderId]
      );
      if (
        updShipAddRes.rowCount > 0 &&
        updPaymRes.rowCount > 0 &&
        updOrdRes.rowCount > 0 &&
        updShipmRes.rowCount > 0
      )
        return true;
    }
    throw new Error(`No order Found for ID: ${orderId}`);
  } catch (err) {
    throw err;
  }
};

const update_order_address = async (orderId, newAddress) => {
  try {
    let order = await con.query(`SELECT * FROM orders WHERE id = $1`, [
      orderId,
    ]);
    if (order.rowCount > 0) {
      let updateOrdAdd = await con.query(
        `UPDATE shipment_address SET country =$1, province =$2, city =$3, ward =$4, tole =$5, houseNo =$6 WHERE orderId = $7`,
        [
          newAdd.country,
          newAdd.province,
          newAdd.city,
          newAdd.ward,
          newAdd.tole,
          newAdd.houseNo,
          orderId,
        ]
      );
      if (updateOrdAdd.rowCount > 0) return true;
    }
    throw new Error(`No order Found for ID: ${orderId}`);
  } catch (err) {
    throw err;
  }
};

const update_order_payment = async (orderId, newPayment) => {
  try {
    let order = await con.query(`SELECT * FROM orders WHERE id = $1`, [
      orderId,
    ]);
    if (order.rowCount > 0) {
      let updatePaymRes = await con.query(
        `UPDATE payment SET type =$1, status =$2 WHERE orderId =$3`,
        [newPaym.type, newPaym.status, orderId]
      );
      if (updatePaymRes.rowCount > 0) return true;
    }
    throw new Error(`No order Found for ID: ${orderId}`);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  read_all_orders,
  read_limited_orders,
  read_user_orders,
  read_user_order_limited,
  read_order_from_id,
  update_order,
  place_order,
};
