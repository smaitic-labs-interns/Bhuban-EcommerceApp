const express = require("express");
const router = express.Router();
router.use(express.json());
const Service = require("../service/allService");
const logger = require("../logger")("reviews");

const add_review = async (req, resp) => {
  try {
    const data = req.body;
    const res = await Service.reviews.add_review(
      data.orderId,
      data.productId,
      data.createdBy,
      data.review,
      data.rating
    );
    logger.log(
      "info",
      `Review added successfully by :${data.createdBy} for Product ${data.productId} from Order: ${data.orderId}`
    );
    resp.status(200).send(res);
  } catch (err) {
    logger.error("error", err);
    resp.status(400).send(err.message);
  }
};

const get_all_reviews = async (req, resp) => {
  try {
    const res = await Service.reviews.get_all_reviews();
    logger.log("info", `Sucessfully fetched all reviews`);
    resp.status(200).send(res);
  } catch (err) {
    logger.error("error", err);
    resp.status(400).send(err.message);
  }
};

const get_limited_reviews = async (req, resp) => {
  try {
    const page = req.query.page;
    const limit = req.query.limit;
    const res = await Service.reviews.get_limited_reviews({
      page,
      limit,
    });

    logger.log(
      "info",
      `Sucessfully fetched ${limit} reviews from page ${page}`
    );
    resp.status(200).send(res);
  } catch (err) {
    logger.error("error", err);
    resp.status(400).send(err.message);
  }
};

const get_reviews_by_id = async (req, resp) => {
  try {
    const reviewId = req.query.reviewId;
    const res = await Service.reviews.get_reviews_by_id(reviewId);
    logger.log(
      "info",
      `Sucessfully fetched review presented on ID: ${reviewId}`
    );
    resp.status(200).send(res);
  } catch (err) {
    logger.error("error", err);
    resp.status(400).send(err.message);
  }
};

const get_reviews_by_orderId = async (req, resp) => {
  try {
    const orderId = req.query.orderId;
    const res = await Service.reviews.get_reviews_by_orderId(orderId);
    logger.log("info", `Sucessfully fetched all reviews for order: ${orderId}`);
    resp.status(200).send(res);
  } catch (err) {
    logger.error("error", err);
    resp.status(400).send(err.message);
  }
};

const get_limited_reviews_by_orderId = async (req, resp) => {
  try {
    const page = req.query.page;
    const limit = req.query.limit;
    const orderId = req.query.orderId;
    const res = await Service.reviews.get_limited_reviews_by_orderId({
      page,
      limit,
      orderId,
    });
    logger.log(
      "info",
      `Sucessfully fetched ${limit} reviews for page ${page} for order : ${orderId}`
    );
    resp.status(200).send(res);
  } catch (err) {
    logger.error("error", err);
    resp.status(400).send(err.message);
  }
};

const get_reviews_by_productId = async (req, resp) => {
  try {
    const productId = req.query.productId;
    const res = await Service.reviews.get_reviews_by_productId(productId);
    logger.log(
      "info",
      `Sucessfully fetched all reviews for product: ${productId}`
    );
    resp.status(200).send(res);
  } catch (err) {
    logger.error("error", err);
    resp.status(400).send(err.message);
  }
};

const get_limited_reviews_by_productId = async (req, resp) => {
  try {
    const page = req.query.page;
    const limit = req.query.limit;
    const productId = req.query.productId;
    const res = await Service.reviews.get_limited_reviews_by_productId({
      page,
      limit,
      productId,
    });
    logger.log(
      "info",
      `Sucessfully fetched ${limit} reviews for page ${page} for product : ${productId}`
    );
    resp.status(200).send(res);
  } catch (err) {
    logger.error("error", err);
    resp.status(400).send(err.message);
  }
};

const get_average_product_rating = async (req, resp) => {
  try {
    const productId = req.query.productId;
    const res = await Service.reviews.get_average_product_rating(productId);
    logger.log("info", `Fetch average ratinng for product: ${productId}`);
    resp.status(200).send(res);
  } catch (err) {
    logger.error("error", err);
    resp.status(400).send(err.message);
  }
};

const read_reviews_by_order_product_id = async (req, resp) => {
  try {
    const orderId = req.query.orderId;
    const productId = req.query.productId;
    const res = await Service.reviews.read_reviews_by_order_product_id(
      orderId,
      productId
    );
    logger.log(
      "info",
      `review fetched Sucessfully for order ${orderId} of product ${productId}`
    );
    resp.status(200).send(res);
  } catch (err) {
    logger.error("error", err);
    resp.status(400).send(err.message);
  }
};

const remove_reviews_by_id = async (req, resp) => {
  try {
    const reviewId = req.query.reviewId;
    const res = await Service.reviews.remove_reviews_by_id(reviewId);
    logger.log(
      "info",
      `review Removed Sucessfully presented on ID: ${reviewId}`
    );
    resp.status(200).send(res);
  } catch (err) {
    logger.error("error", err);
    resp.status(400).send(err.message);
  }
};

module.exports = {
  add_review,
  get_all_reviews,
  get_limited_reviews,
  get_reviews_by_id,
  get_reviews_by_orderId,
  get_limited_reviews_by_orderId,
  get_reviews_by_productId,
  get_limited_reviews_by_productId,
  get_average_product_rating,
  read_reviews_by_order_product_id,
  remove_reviews_by_id,
};
