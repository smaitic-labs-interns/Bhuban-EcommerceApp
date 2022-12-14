const express = require("express");
const router = express.Router();
router.use(express.json());
const Service = require("../service/allService");
const logger = require("../logger")("product");

const get_all_product = async (req, resp) => {
  try {
    const res = await Service.product.get_all_product();
    logger.log("info", "Sucessfully fetched all products");
    resp.status(200).send(res);
  } catch (err) {
    logger.error("error", err);
    resp.status(400).send(err.message);
  }
};

const get_limited_product = async (req, resp) => {
  try {
    const page = req.query.page;
    const limit = req.query.limit;
    const res = await Service.product.get_limited_product({ page, limit });
    logger.log(
      "info",
      `Sucessfully fetched ${limit} products for page ${page}`
    );
    resp.status(200).send(res);
  } catch (err) {
    logger.log("error", err);
    resp.status(400).send(err.message);
  }
};

const get_product_by_id = async (req, resp) => {
  try {
    const productId = req.params.productId;
    const res = await Service.product.get_product_by_id(productId);
    logger.log("info", `Sucessfully fetched product on ID: ${productId}`);
    resp.status(200).send(res);
  } catch (err) {
    logger.log("error", err);
    resp.status(400).send(err.message);
  }
};

const add_product = async (req, resp) => {
  try {
    const data = req.body;
    const file = req.files;
    const res = await Service.product.add_product(
      data.category,
      data.model,
      data.brand,
      data.name,
      data.description,
      data.price,
      data.quantity,
      data.addedBy,
      file
    );
    logger.log("info", "Sucessfully added product");
    resp.status(200).send(res);
  } catch (err) {
    logger.log("error", err);
    resp.status(400).send(err.message);
  }
};

const remove_product = async (req, resp) => {
  try {
    const productId = req.query.id;
    const res = await Service.product.remove_product(productId);
    logger.log("info", `Sucessfully removed product on ID: ${productId}`);
    resp.status(200).send(res);
  } catch (err) {
    logger.log("error", err);
    resp.status(400).send(err.message);
  }
};

const update_product = async (req, resp) => {
  try {
    const productId = req.query.id;
    const data = req.body;
    const res = await Service.product.update_product(
      productId,
      data.category,
      data.model,
      data.brand,
      data.name,
      data.description,
      data.price,
      data.quantity,
      data.updatedBy
    );
    logger.log("info", `Sucessfully updated product on Id: ${productId}`);
    resp.status(200).send(res);
  } catch (err) {
    logger.log("error", err);
    resp.status(400).send(err.message);
  }
};

const revenue_report = async (req, resp) => {
  try {
    logger.log("info", `Sucessfully generated revenue report`);
    resp.status(200).send("Working Good from revenue-report");
  } catch (err) {
    logger.log("error", err);
    resp.status(400).send(err.message);
  }
};

const ar_aging_report = async (req, resp) => {
  try {
    logger.log("info", `Sucessfully generated ar-aging report`);
    resp.status(200).send("Working good from Ar-aging");
  } catch (err) {
    logger.log("error", err);
    resp.status(400).send(err.message);
  }
};

const search_products = async (req, resp) => {
  try {
    const keyword = req.params.keyword;
    const res = await Service.product.search_products(keyword);
    logger.log("info", `Fetched Products for Keyword : ${keyword}`);
    resp.status(200).send(res);
  } catch (err) {
    logger.log("error", err);
    resp.status(400).send(err.message);
  }
};

module.exports = {
  get_all_product,
  get_limited_product,
  get_product_by_id,
  add_product,
  remove_product,
  update_product,
  revenue_report,
  ar_aging_report,
  search_products,
};
