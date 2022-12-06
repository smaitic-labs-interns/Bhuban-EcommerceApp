const express = require("express");
const router = express.Router();
router.use(express.json());
const Service = require("../service/allService");
const { logger } = require("../utils");

const get_all_product = async (req, resp) => {
  try {
    const res = await Service.product.get_all_product();
    resp.status(200).send(res);
    logger.log("info", "Sucessfully fetched all products", {
      message: "From Product",
    });
    logger.log("info", "Sucessfully fetched all products", {
      message: ":: Product",
    });
  } catch (err) {
    resp.status(400).send(err.message);
    logger.log("error", err.message, { message: ":: Product" });
  }
};

const get_limited_product = async (req, resp) => {
  try {
    const page = req.query.page;
    const limit = req.query.limit;
    const res = await Service.product.get_limited_product({ page, limit });
    resp.status(200).send(res);
    logger.log(
      "info",
      `Sucessfully fetched ${limit} products from page ${page}`,
      {
        message: "::Product",
      }
    );
  } catch (err) {
    resp.status(400).send(err.message);
    logger.log("error", err.message, { message: ":: Product" });
  }
};

const get_product_by_id = async (req, resp) => {
  try {
    const productId = req.params.productId;
    const res = await Service.product.get_product_by_id(productId);
    resp.status(200).send(res);
    logger.log("info", "Sucessfully get product by id", {
      message: "From Product",
    });
  } catch (err) {
    resp.status(400).send(err.message);
    logger.log("error", err.message, { message: ":: Product" });
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
    resp.status(200).send(res);
    logger.log("info", "Sucessfully added product", {
      message: ":: Product",
    });
  } catch (err) {
    resp.status(400).send(err.message);
    logger.log("error", err.message, { message: ":: Product" });
  }
};

const remove_product = async (req, resp) => {
  try {
    const productId = req.query.id;
    const res = await Service.product.remove_product(productId);
    resp.status(200).send(res);
    logger.log("info", "Sucessfully removed product", {
      message: ":: Product",
    });
  } catch (err) {
    resp.status(400).send(err.message);
    logger.log("error", err.message, { message: ":: Product" });
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
    resp.status(200).send(res);
    logger.log("info", "Sucessfully updated", {
      message: ":: Product",
    });
  } catch (err) {
    resp.status(400).send(err.message);
    logger.log("error", err.message, { message: ":: Product" });
  }
};

const revenue_report = async (req, resp) => {
  try {
    resp.status(200).send("Working Good from revenue-report");
    logger.log("info", "Sucessfully generated revenue report", {
      message: ":: Product",
    });
  } catch (err) {
    resp.status(400).send(err.message);
    logger.log("error", err.message, { message: ":: Product" });
  }
};

const ar_aging_report = async (req, resp) => {
  try {
    resp.status(200).send("Working good from Ar-aging");
    logger.log("info", "Sucessfully generated ar-aging report", {
      message: ":: Product",
    });
  } catch (err) {
    resp.status(400).send(err.message);
    logger.log("error", err.message, { message: ":: Product" });
  }
};

const search_products = async (req, resp) => {
  try {
    const keyword = req.params.keyword;
    const res = await Service.product.search_products(keyword);
    resp.status(200).send(res);
    logger.log("info", "Searched Products Sucessfully", {
      message: ":: Product",
    });
  } catch (err) {
    resp.status(400).send(err.message);
    logger.log("error", err.message, { message: ":: Product" });
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
