const express = require("express");
const router = express.Router();
router.use(express.json());
const logger = require("../logger")("cart");
const Service = require("../service/allService");

const get_all_cart = async (req, resp) => {
  try {
    const res = await Service.cart.get_all_cart();
    logger.log("info", `Sucessfully fetched all carts `);
    resp.status(200).send(res);
  } catch (err) {
    logger.error("error", err);
    resp.status(400).send(err.message);
  }
};

const get_limited_cart = async (req, resp) => {
  try {
    const page = req.query.page;
    const limit = req.query.limit;
    const res = await Service.cart.get_limited_cart({ page, limit });
    logger.log("info", `Sucessfully fetched ${limit} carts for page ${page}`);
    resp.status(200).send(res);
  } catch (err) {
    logger.error("error", err);
    resp.status(400).send(err.message);
  }
};

const get_user_cart = async (req, resp) => {
  try {
    const userId = req.query.id;
    const res = await Service.cart.get_user_cart(userId);
    logger.log("info", `Sucessfully fetched carts for user : ${userId}`);
    resp.status(200).send(res);
  } catch (err) {
    logger.error("error", err);
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
    logger.log("info", `Product added to cart sucessfully on ID: ${userId}`);
    resp.status(200).send(res);
  } catch (err) {
    logger.error("error", err);
    resp.status(400).send(err.message);
  }
};

const remove_product_from_cart = async (req, resp) => {
  try {
    const userId = req.query.id;
    const productId = req.query.pid;
    const res = await Service.cart.remove_product_from_cart(userId, productId);
    logger.log("info", `Product removed sucessfully from cart: ${userId}`);
    resp.status(200).send(res);
  } catch (err) {
    logger.error("error", err);
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
    logger.log(
      "info",
      `Product quantity updated sucessfully for user: ${userId}`
    );
    resp.status(200).send(res);
  } catch (err) {
    logger.error("error", err);
    resp.status(400).send(err.message);
  }
};

module.exports = {
  get_all_cart,
  get_limited_cart,
  get_user_cart,
  add_product_to_cart,
  remove_product_from_cart,
  update_quantity_in_cart,
};
