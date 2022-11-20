const express = require("express");
const router = express.Router();
router.use(express.json());
const Service = require("../service/allService");

const read_all_orders = async (req, resp) => {
  try {
    const res = await Service.order.read_all_orders();
    resp.status(200).send(res);
  } catch (err) {
    resp.status(400).send(err.message);
  }
};

const read_user_orders = async (req, resp) => {
  try {
    const userId = req.query.id;
    const res = await Service.order.read_user_orders(userId);
    resp.status(200).send(res);
  } catch (err) {
    resp.status(400).send(err.message);
  }
};

const read_order_by_id = async (req, resp) => {
  try {
    const orderId = req.query.id;
    const res = await Service.order.read_order_by_id(orderId);
    resp.status(200).send(res);
  } catch (err) {
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
    resp.status(200).send(res);
  } catch (err) {
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
    resp.status(200).send(res);
  } catch (err) {
    resp.status(400).send(err.message);
  }
};

const update_address = async (req, resp) => {
  try {
    const orderId = req.query.id;
    const newAddress = req.body;
    const res = await Service.order.update_address(orderId, newAddress);
    resp.status(200).send(res);
  } catch (err) {
    resp.status(400).send(err.message);
  }
};

const update_payment = async (req, resp) => {
  try {
    const orderId = req.query.id;
    const payment = req.body;
    const res = await Service.order.update_payment(orderId, payment);
    resp.status(200).send(res);
  } catch (err) {
    resp.status(400).send(err.message);
  }
};

const track_order = async (req, resp) => {
  try {
    const orderId = req.query.id;
    const res = await Service.order.track_order(orderId);
    resp.status(200).send(res);
  } catch (err) {
    resp.status(400).send(err.message);
  }
};

const cancel_order = async (req, resp) => {
  try {
    const orderId = req.query.id;
    const res = await Service.order.cancel_order(orderId);
    resp.status(200).send(res);
  } catch (err) {
    resp.status(400).send(err.message);
  }
};

const return_replace_order = async (req, resp) => {
  try {
    const orderId = req.query.id;
    const data = req.body;
    const res = await Service.order.return_replace_order(orderId, data.action);
    resp.status(200).send(res);
  } catch (err) {
    resp.status(400).send(err.message);
  }
};

const refund_updates = async (req, resp) => {
  try {
    const orderId = req.query.id;
    const res = await Service.order.refund_updates(orderId);
    resp.status(200).send(res);
  } catch (err) {
    resp.status(400).send(err.message);
  }
};

const send_shipment_updates = async (req, resp) => {
  try {
    const orderId = req.query.id;
    const res = await Service.order.send_shipment_updates(orderId);
    resp.status(200).send(res);
  } catch (err) {
    resp.status(400).send(err.message);
  }
};

const send_return_updates = async (req, resp) => {
  try {
    const orderId = req.query.id;
    const res = await Service.order.send_return_updates(orderId);
    resp.status(200).send(res);
  } catch (err) {
    resp.status(400).send(err.message);
  }
};

const send_payment_updates = async (req, resp) => {
  try {
    const orderId = req.query.id;
    const res = await Service.order.send_payment_updates(orderId);
    resp.status(200).send(res);
  } catch (err) {
    resp.status(400).send(err.message);
  }
};

module.exports = {
  read_all_orders,
  read_user_orders,
  read_order_by_id,
  place_order,
  update_quantity_order,
  update_address,
  update_payment,
  track_order,
  cancel_order,
  return_replace_order,
  refund_updates,
  send_shipment_updates,
  send_return_updates,
  send_payment_updates,
};
