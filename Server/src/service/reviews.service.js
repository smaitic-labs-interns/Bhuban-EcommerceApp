const db = require("../repository/dbRepository");

const add_review = async (orderId, productId, createdBy, review, rating) => {
  try {
    rating = parseFloat(rating);
    const newReview = {
      orderId,
      productId,
      createdBy,
      review,
      rating,
    };
    const res = await db.reviews.read_reviews_by_order_product_id(
      orderId,
      productId
    );
    if (res !== false) {
      throw new Error(`Rating and  review already exists for this order`);
    }
    if (await db.reviews.add_review(newReview)) {
      return "Thank you for your review and rating";
    }
  } catch (err) {
    throw err;
  }
};

/**
 * @returns array of reviews
 */

const get_all_reviews = async () => {
  try {
    const reviews = await db.reviews.read_all_reviews();
    console.log(reviews);
    if (reviews) return reviews;
  } catch (err) {
    throw err;
  }
};

const get_limited_reviews = async ({ page, limit }) => {
  try {
    newPage = parseInt(page) === 0 ? 1 : parseInt(page);
    newLimit = parseInt(limit) === 0 ? 1 : parseInt(limit);
    const reviews = await db.reviews.read_limited_reviews({
      page: newPage,
      limit: newLimit,
    });
    if (reviews) return reviews;
  } catch (err) {
    throw err;
  }
};

const get_reviews_by_id = async (reviewId) => {
  try {
    const reviews = await db.reviews.read_review_by_id(reviewId);
    if (reviews.length > 0) {
      return reviews;
    }
    throw new Error(`No reviews and ratings found for this reviewId`);
  } catch (err) {
    throw err;
  }
};

const get_reviews_by_orderId = async (orderId) => {
  try {
    const reviews = await db.reviews.read_reviews_by_orderId(orderId);
    if (reviews.length > 0) {
      return reviews;
    }
    throw new Error(`No reviews and ratings found for this order`);
  } catch (err) {
    throw err;
  }
};

const get_limited_reviews_by_orderId = async ({ page, limit, orderId }) => {
  try {
    newPage = parseInt(page) === 0 ? 1 : parseInt(page);
    newLimit = parseInt(limit) === 0 ? 1 : parseInt(limit);
    const reviews = await db.reviews.read_limited_reviews_by_orderId({
      page: newPage,
      limit: newLimit,
      orderId,
    });
    if (reviews) return reviews;
  } catch (err) {
    throw err;
  }
};

/**
 * * Find reviews using productId
 * @param {*} productId
 * @returns reviews object ||error message
 */

const get_reviews_by_productId = async (productId) => {
  try {
    const reviews = await db.reviews.read_reviews_by_productId(productId);
    if (reviews.length > 0) {
      return reviews;
    }
    throw new Error(`No reviews and ratings found for this product`);
  } catch (err) {
    throw err;
  }
};

const get_limited_reviews_by_productId = async ({ page, limit, productId }) => {
  try {
    newPage = parseInt(page) === 0 ? 1 : parseInt(page);
    newLimit = parseInt(limit) === 0 ? 1 : parseInt(limit);
    const reviews = await db.reviews.read_limited_reviews_by_productId({
      page: newPage,
      limit: newLimit,
      productId,
    });
    if (reviews) return reviews;
  } catch (err) {
    throw err;
  }
};

const get_average_product_rating = async (productId) => {
  try {
    const reviews = await db.reviews.read_reviews_by_productId(productId);
    if (reviews.length > 0) {
      let rating = 0;
      for (let review of reviews) {
        rating += review.rating;
      }
      rating /= reviews.length;
      return {
        rating,
        productId,
      };
    }
    throw new Error(`No reviews and ratings found for this order`);
  } catch (err) {
    throw err;
  }
};

const read_reviews_by_order_product_id = async (orderId, productId) => {
  try {
    const reviews = await db.reviews.read_reviews_by_order_product_id(
      orderId,
      productId
    );
    if (reviews) return reviews;
  } catch (err) {
    throw err;
  }
};

const remove_reviews_by_id = async (reviewId) => {
  try {
    const reviews = await db.reviews.read_review_by_id(reviewId);
    if (
      Object.keys(reviews).length > 0 &&
      (await db.reviews.remove_reviews_by_id(reviewId))
    ) {
      return `review removed sucessfully`;
    }
    throw new Error(`review doesnot exists`);
  } catch (err) {
    throw err;
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
