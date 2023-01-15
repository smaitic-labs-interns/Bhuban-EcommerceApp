const con = require("../config/postGres");

const add_review = async ({
  orderId,
  productId,
  createdBy,
  review,
  rating,
}) => {
  try {
    const result = await con.query(
      "INSERT INTO reviews (orderId, productId, createdBy, review, rating) VALUES ($1, $2, $3, $4, $5)",
      [orderId, productId, createdBy, review, rating * 10]
    );
    if (result.rowCount > 0) return true;
    throw new Error("Error occurs adding review. Try again Later");
  } catch (err) {
    throw err;
  }
};

/**
 * * Read all reviews
 * @returns Array of review objects || error message
 */
const read_all_reviews = async () => {
  try {
    let reviews = await con.query("SELECT * FROM reviews");

    for (let review of reviews.rows) {
      review.rating /= 10;
    }

    if (reviews.rowCount !== 0) return reviews.rows;
    throw new Error(`No Review Found`);
  } catch (err) {
    throw err;
  }
};

const read_limited_reviews = async ({ page, limit }) => {
  try {
    let res = await con.query("SELECT COUNT(*) FROM reviews ");
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

    let reviews = await con.query(
      "SELECT * FROM reviews ORDER BY createdAt DESC offset $1 LIMIT $2",
      [startIndex, endIndex]
    );

    for (let review of reviews.rows) {
      review.rating /= 10;
    }

    result.data = reviews.rows;
    if (reviews.rowCount !== 0) return result;
    return false;
  } catch (err) {
    throw err;
  }
};

const read_review_by_id = async (reviewId) => {
  try {
    let reviews = await con.query("SELECT * FROM reviews WHERE id = $1", [
      reviewId,
    ]);

    for (let review of reviews.rows) {
      review.rating /= 10;
    }
    if (reviews.rowCount !== 0) return reviews.rows;
    return false;
  } catch (err) {
    throw err;
  }
};

const read_reviews_by_orderId = async (orderId) => {
  try {
    let reviews = await con.query(
      "SELECT * FROM reviews WHERE orderId = $1 ORDER BY createdAt DESC",
      [orderId]
    );

    for (let review of reviews.rows) {
      review.rating /= 10;
    }

    if (reviews.rowCount !== 0) return reviews.rows;
    return false;
  } catch (err) {
    throw err;
  }
};

const read_limited_reviews_by_orderId = async ({ page, limit, orderId }) => {
  try {
    let res = await con.query(
      "SELECT COUNT(*) FROM reviews WHERE orderId = $1",
      [orderId]
    );
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

    let reviews = await con.query(
      "SELECT * FROM reviews WHERE orderId = $1 ORDER BY createdAt DESC offset $2 LIMIT $3",
      [orderId, startIndex, endIndex]
    );

    for (let review of reviews.rows) {
      review.rating /= 10;
    }
    result.data = reviews.rows;
    if (reviews.rowCount !== 0) return result;
    throw new Error(`No Reviews Found`);
  } catch (err) {
    throw err;
  }
};

const read_reviews_by_productId = async (productId) => {
  try {
    let reviews = await con.query(
      "SELECT * FROM reviews WHERE productId = $1 ORDER BY createdAt DESC",
      [productId]
    );

    for (let review of reviews.rows) {
      review.rating /= 10;
    }
    if (reviews.rowCount !== 0) return reviews.rows;
    throw new Error(`No Reviews Found`);
  } catch (err) {
    throw err;
  }
};

const read_limited_reviews_by_productId = async ({
  page,
  limit,
  productId,
}) => {
  try {
    let res = await con.query(
      "SELECT COUNT(*) FROM reviews WHERE productId = $1",
      [productId]
    );
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

    let reviews = await con.query(
      "SELECT * FROM reviews WHERE productId = $1 ORDER BY createdAt DESC offset $2 LIMIT $3",
      [productId, startIndex, endIndex]
    );

    for (let review of reviews) {
      review.rating /= 10;
    }

    result.data = reviews.rows;
    if (reviews.rowCount !== 0) return result;
    throw new Error(`No Reviews Found`);
  } catch (err) {
    throw err;
  }
};

const read_reviews_by_order_product_id = async (orderId, productId) => {
  try {
    let reviews = await con.query(
      "SELECT * FROM reviews WHERE orderId = $1 AND productId = $2 ORDER BY createdAt DESC",
      [orderId, productId]
    );

    for (let review of reviews.rows) {
      review.rating /= 10;
    }

    if (reviews.rowCount !== 0) return reviews.rows;
    return false;
  } catch (err) {
    throw err;
  }
};

/**
 * *Remove reviews by Id
 * @param {*} reviewId
 * @returns true || error message
 */
const remove_reviews_by_id = async (reviewId) => {
  try {
    let review = await con.query("DELETE FROM reviews WHERE id= $1", [
      reviewId,
    ]);
    if (review.rowCount > 0) return true;
    return false;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  add_review,
  read_all_reviews,
  read_limited_reviews,
  read_review_by_id,
  read_reviews_by_orderId,
  read_limited_reviews_by_orderId,
  read_reviews_by_productId,
  read_limited_reviews_by_productId,
  read_reviews_by_order_product_id,
  remove_reviews_by_id,
};
