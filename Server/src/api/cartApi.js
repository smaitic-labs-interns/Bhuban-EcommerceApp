const express = require("express");
const router = express.Router();
router.use(express.json());

const Service = require("../service/allService");

const get_all_cart = async (req, resp) => {
  try {
    const res = await Service.cart.get_all_cart();
    resp.status(200).send(res);
  } catch (err) {
    resp.status(400).send(err.message);
  }
};

const get_limited_cart = async (req, resp) => {
  try {
    const page = req.query.page;
    const limit = req.query.limit;
    const res = await Service.cart.get_limited_cart({ page, limit });
    resp.status(200).send(res);
  } catch (err) {
    resp.status(400).send(err.message);
  }
};

const get_user_cart = async (req, resp) => {
  try {
    const userId = req.query.id;
    const res = await Service.cart.get_user_cart(userId);
    resp.status(200).send(res);
  } catch (err) {
    resp.status(400).send(err.message);
  }
};

const add_product_to_cart = async (req, resp) => {
  try {
    const userId = req.query.id;
    const product = req.body;
    const res = await Service.cart.add_product_to_cart(userId, {
      productId: product.productId,
      quantity: product.quantity,
    });
    resp.status(200).send(res);
  } catch (err) {
    resp.status(400).send(err.message);
  }
};

const update_quantity_in_cart = async (req, resp) => {
  try {
    const userId = req.query.id;
    const product = req.body;
    const res = await Service.cart.update_quantity_in_cart(
      userId,
      { productId: product.productId, quantity: product.quantity },
      product.action
    );
    resp.status(200).send(res);
  } catch (err) {
    resp.status(400).send(err.message);
  }
};

module.exports = {
  get_all_cart,
  get_limited_cart,
  get_user_cart,
  add_product_to_cart,
  update_quantity_in_cart,
};
