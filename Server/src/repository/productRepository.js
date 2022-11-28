const con = require("../config/postGres");
const { upload_product_images } = require("../utils/fileUpload");

const get_all_product = async () => {
  try {
    let products = await con.query("SELECT * FROM products");
    if (products.rowCount !== 0) {
      for (let product of products.rows) {
        let image = await con.query(
          "SELECT * FROM product_images WHERE productId = $1",
          [product.id]
        );
        if (image.rowCount !== 0) {
          product.images = image.rows;
        } else {
          product.images = [
            { imageurl: "/images/noImageFound.png", altText: "No Image Found" },
          ];
        }
      }
      return products.rows;
    }
    throw new Error(`No product Found`);
  } catch (err) {
    throw err;
  }
};

const get_limited_product = async ({ page, limit }) => {
  try {
    let res = await con.query("SELECT COUNT(*) FROM products");
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

    if (startIndex < 0) {
      result.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    let products = await con.query(
      "SELECT * FROM products ORDER BY addedAt DESC offset $1 LIMIT $2",
      [startIndex, endIndex]
    );
    if (products.rowCount !== 0) {
      for (let product of products.rows) {
        let image = await con.query(
          "SELECT * FROM product_images WHERE productId = $1",
          [product.id]
        );
        if (image.rowCount !== 0) {
          product.images = image.rows;
        } else {
          product.images = [
            { imageurl: "/images/noImageFound.png", altText: "No Image Found" },
          ];
        }
      }

      result.data = products.rows;
      return result;
    }
    throw new Error(`No product Found`);
  } catch (err) {
    throw err;
  }
};

const add_product = async (product) => {
  try {
    const result = await con.query(
      "INSERT INTO products (id, category, model, brand, name, description, price, quantity, addedBy) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
      [
        product.id,
        product.category,
        product.model,
        product.brand,
        product.name,
        product.description,
        product.price,
        product.quantity,
        product.addedBy,
      ]
    );
    const path = await upload_product_images({
      productId: product.id,
      images: product.images,
    });
    if (result.rowCount > 0) {
      let imgRes = null;
      for (url of path) {
        imgRes = await con.query(
          "INSERT INTO product_images (productId, imageUrl, altText) VALUES ($1, $2, $3)",
          [product.id, url, "Alternative text"]
        );
      }
      if (imgRes.rowCount > 0) return true;
    }
    throw new Error("Error occurs adding product. Try again Later");
  } catch (err) {
    throw err;
  }
};

const delete_product = async (productId) => {
  try {
    const result = await con.query("SELECT * FROM products WHERE id= $1", [
      productId,
    ]);
    if (result.rowCount > 0) {
      const delImgRes = await con.query(
        "DELETE FROM product_images WHERE productId= $1",
        [productId]
      );
      if (delImgRes.rowCount > 0) {
        const delRes = await con.query("DELETE FROM products WHERE id= $1", [
          productId,
        ]);
        if (delRes.rowCount > 0) return true;
      }
      throw new Error(`Error occurs deleteing Images`);
    }
    throw new Error(`No Product Found for ID: ${productId}`);
  } catch (err) {
    throw err;
  }
};

const update_product = async (productId, newProduct) => {
  try {
    const result = await con.query("SELECT * FROM products WHERE id= $1", [
      productId,
    ]);
    console.log(newProduct);
    if (result.rowCount > 0) {
      const updRes = await con.query(
        "UPDATE products SET category =$1, model =$2, brand =$3, name= $4, description =$5, price =$6, quantity =$7, updatedBy = $8, updatedAt=$9 WHERE id= $10",
        [
          newProduct.category,
          newProduct.model,
          newProduct.brand,
          newProduct.name,
          newProduct.description,
          newProduct.price,
          newProduct.quantity,
          newProduct.updatedBy,
          new Date(),
          productId,
        ]
      );
      if (updRes.rowCount > 0) return true;
    }
    throw new Error(`No Product Found for Id: ${productId}`);
  } catch (err) {
    throw err;
  }
};

const find_product = async (productId) => {
  // find product from id
  try {
    const product = await con.query("SELECT * FROM products WHERE id= $1", [
      productId,
    ]);
    if (product.rowCount > 0) {
      let image = await con.query(
        "SELECT * FROM product_images WHERE productId = $1",
        [productId]
      );
      if (image.rowCount !== 0) {
        product.rows[0]["images"] = image.rows;
      } else {
        product.rows[0]["images"] = [
          {
            id: productId,
            imageurl: "/images/noImageFound.png",
            altText: "No Image Found",
          },
        ];
      }
      return product.rows[0];
    }
    throw new Error(`No Product found for ID: ${productId}`);
  } catch (err) {
    throw err;
  }
};

const search_product = async (keyword) => {
  try {
    const allProduct = await con.query("SELECT * FROM products");
    const value = [];
    for (product of allProduct.rows) {
      for (key in product) {
        if (key === "id") {
          continue;
        } else if (
          typeof product[key] === "string" &&
          typeof keyword === "string"
        ) {
          if (
            product[key].toLowerCase().indexOf(keyword.toLowerCase()) !== -1
          ) {
            value.push(product);
            break;
          }
        } else if (
          typeof product[key] === "number" &&
          typeof keyword === "number"
        ) {
          if (product[key] <= keyword) {
            value.push(product);
            break;
          }
        }
      }
    }
    if (value.length > 0) {
      for (let product of value) {
        let image = await con.query(
          "SELECT * FROM product_images WHERE productId = $1",
          [product.id]
        );
        if (image.rowCount !== 0) {
          product.images = image.rows;
        } else {
          product.images = [
            { imageurl: "/images/noImageFound.png", altText: "No Image Found" },
          ];
        }
      }
      return value;
    }
    throw new Error(`No Product Found For Keyword ${keyword}`);
  } catch (err) {
    throw err;
  }
};

const update_quantity = async (productId, quantity, action) => {
  try {
    const product = await con.query("SELECT * FROM products WHERE id= $1", [
      productId,
    ]);
    if (product.rowCount > 0) {
      switch (action) {
        case "increase":
          var result = await con.query(
            "UPDATE products SET quantity =$1 WHERE id =$2 ",
            [product.rows[0].quantity + quantity, productId]
          );
          if (result.rowCount > 0) return true;

        case "decrease":
          var result = await con.query(
            "UPDATE products SET quantity =$1 WHERE id =$2 ",
            [product.rows[0].quantity - quantity, productId]
          );
          if (result.rowCount > 0) return true;
      }
    }
    throw new Error(`No Product found on ID: ${productId}`);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  add_product,
  get_all_product,
  get_limited_product,
  delete_product,
  update_product,
  search_product,
  find_product,
  update_quantity,
};
