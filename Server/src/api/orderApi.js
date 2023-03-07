const express = require("express");
const router = express.Router();
router.use(express.json());
const Service = require("../service/allService");
const logger = require("../logger")("order");

const read_all_orders = async (req, resp) => {
  try {
    const res = await Service.order.read_all_orders();
    logger.log("info", "Sucessfully fetched all orders");
    resp.status(200).send(res);
  } catch (err) {
    logger.error("error", err);
    resp.status(400).send(err.message);
  }
};

const read_limited_orders = async (req, resp) => {
  try {
    const page = req.query.page;
    const limit = req.query.limit;
    const res = await Service.order.read_limited_orders({ page, limit });
    logger.log("info", `Sucessfully fetched ${limit} orders for page ${page}`);
    resp.status(200).send(res);
  } catch (err) {
    logger.error("error", err);
    resp.status(400).send(err.message);
  }
};

const read_user_orders = async (req, resp) => {
  try {
    const userId = req.query.id;
    const res = await Service.order.read_user_orders(userId);
    logger.log("info", `Sucessfully fetched orders of user: ${userId}`);
    resp.status(200).send(res);
  } catch (err) {
    logger.error("error", err);
    resp.status(400).send(err.message);
  }
};
const read_user_order_limited = async (req, resp) => {
  try {
    const userId = req.query.id;
    const page = req.query.page;
    const limit = req.query.limit;
    const res = await Service.order.read_user_order_limited({
      userId,
      page,
      limit,
    });
    logger.log(
      "info",
      `Sucessfully fetched ${limit} user orders for page ${page}`
    );
    resp.status(200).send(res);
  } catch (err) {
    logger.error("error", err);
    resp.status(400).send(err.message);
  }
};

const read_order_by_id = async (req, resp) => {
  try {
    const orderId = req.query.id;
    const res = await Service.order.read_order_by_id(orderId);
    logger.log("info", `Sucessfully fetched orders for ID:  ${orderId}`);
    resp.status(200).send(res);
  } catch (err) {
    logger.error("error", err);
    resp.status(400).send(err.message);
  }
};

const place_order = async (req, resp) => {
  try {
    const userId = req.query.id;
    const data = req.body;
    const res = await Service.order.place_order(
      userId,
      data.shippingAddress,
      data.paymentType,
      data.shipmentType
    );
    logger.log("info", `Sucessfully order placed for user : ${userId}`);
    resp.status(200).send(res);
  } catch (err) {
    logger.error("error", err);
    resp.status(400).send(err.message);
  }
};

const update_quantity_order = async (req, resp) => {
  try {
    const orderId = req.query.id;
    const data = req.body;
    const res = await Service.order.update_quantity_order(
      orderId,
      { productId: data.productId, quantity: data.quantity },
      data.action
    );
    logger.log("info", `Sucessfully updated quantity for order : ${orderId}`);
    resp.status(200).send(res);
  } catch (err) {
    logger.error("error", err);
    resp.status(400).send(err.message);
  }
};

const update_address = async (req, resp) => {
  try {
    const orderId = req.query.id;
    const newAddress = req.body;
    const res = await Service.order.update_address(orderId, newAddress);
    logger.log(
      "info",
      `Sucessfully updated shipping address for order : ${orderId}`
    );
    resp.status(200).send(res);
  } catch (err) {
    logger.error("error", err);
    resp.status(400).send(err.message);
  }
};

const update_payment = async (req, resp) => {
  try {
    const orderId = req.query.id;
    const payment = req.body;
    const res = await Service.order.update_payment(orderId, payment);
    logger.log("info", `Sucessfully updated payment for order : ${orderId}`);
    resp.status(200).send(res);
  } catch (err) {
    logger.error("error", err);
    resp.status(400).send(err.message);
  }
};

const update_status = async (req, resp) => {
  try {
    const orderId = req.query.id;
    const status = req.body.status;
    const res = await Service.order.update_order_status(orderId, status);
    logger.log(
      "info",
      `Sucessfully updated order status for order : ${orderId}`
    );
    resp.status(200).send(res);
  } catch (err) {
    logger.error("error", err);
    resp.status(400).send(err.message);
  }
};

const update_shipment = async (req, resp) => {
  try {
    const orderId = req.query.id;
    const shipment = req.body;
    const res = await Service.order.update_shipment(orderId, shipment);
    logger.log("info", `Sucessfully updated shipment for order : ${orderId}`);
    resp.status(200).send(res);
  } catch (err) {
    logger.error("error", err);
    resp.status(400).send(err.message);
  }
};

const track_order = async (req, resp) => {
  try {
    const orderId = req.query.id;
    const res = await Service.order.track_order(orderId);
    logger.log(
      "info",
      `Sucessfully fetched order for tracking, order ID  : ${orderId}`
    );
    resp.status(200).send(res);
  } catch (err) {
    logger.error("error", err);
    resp.status(400).send(err.message);
  }
};

const cancel_order = async (req, resp) => {
  try {
    const orderId = req.query.id;
    const res = await Service.order.cancel_order(orderId);
    logger.log("info", `Order cancelled sucessfully for ID : ${orderId}`);
    resp.status(200).send(res);
  } catch (err) {
    logger.error("error", err);
    resp.status(400).send(err.message);
  }
};

const return_replace_order = async (req, resp) => {
  try {
    const orderId = req.query.id;
    const data = req.body;
    const res = await Service.order.return_replace_order(orderId, data.action);
    logger.log(
      "info",
      `Order placed for ${data.action} sucessfully on ID  : ${orderId}`
    );
    resp.status(200).send(res);
  } catch (err) {
    logger.error("error", err);
    resp.status(400).send(err.message);
  }
};

const refund_updates = async (req, resp) => {
  try {
    const orderId = req.query.id;
    const res = await Service.order.refund_updates(orderId);
    logger.log("info", `fetched refund updates sucessfully  : ${orderId}`);
    resp.status(200).send(res);
  } catch (err) {
    logger.error("error", err);
    resp.status(400).send(err.message);
  }
};

const send_shipment_updates = async (req, resp) => {
  try {
    const orderId = req.query.id;
    const res = await Service.order.send_shipment_updates(orderId);
    logger.log("info", `Send shipment updates sucessfully  : ${orderId}`);
    resp.status(200).send(res);
  } catch (err) {
    logger.error("error", err);
    resp.status(400).send(err.message);
  }
};

const send_return_updates = async (req, resp) => {
  try {
    const orderId = req.query.id;
    const res = await Service.order.send_return_updates(orderId);
    logger.log("info", `Send return updates sucessfully  : ${orderId}`);
    resp.status(200).send(res);
  } catch (err) {
    logger.error("error", err);
    resp.status(400).send(err.message);
  }
};

const send_payment_updates = async (req, resp) => {
  try {
    const orderId = req.query.id;
    const res = await Service.order.send_payment_updates(orderId);
    logger.log("info", `Send payment updates sucessfully  : ${orderId}`);
    resp.status(200).send(res);
  } catch (err) {
    logger.error("error", err);
    resp.status(400).send(err.message);
  }
};

module.exports = {
  read_all_orders,
  read_limited_orders,
  read_user_orders,
  read_user_order_limited,
  read_order_by_id,
  place_order,
  update_quantity_order,
  update_address,
  update_payment,
  update_status,
  update_shipment,
  track_order,
  cancel_order,
  return_replace_order,
  refund_updates,
  send_shipment_updates,
  send_return_updates,
  send_payment_updates,
};
