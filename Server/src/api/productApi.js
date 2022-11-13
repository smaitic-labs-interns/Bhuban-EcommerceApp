const express = require("express");
const router = express.Router();
router.use(express.json());
const Service = require("../service/allService");
// const upload = require("../utils/fileUpload");
const fs = require("fs/promises");
const multer = require("multer");
// const upload = multer({ dest: "public/" });

const get_product_by_id = async (req, resp) => {
  try {
    const productId = req.params.productId;
    const res = await Service.product.get_product_by_id(productId);
    resp.status(200).send(res);
  } catch (err) {
    resp.status(400).send(err.message);
  }
};

const get_all_product = async (req, resp) => {
  try {
    const res = await Service.product.get_all_product();
    resp.status(200).send(res);
  } catch (err) {
    resp.status(400).send(err.message);
  }
};

const add_product = async (req, resp) => {
  try {
    const data = req.body;
    console.log(data);
    const file = req.files;

    // for (let index in file) {
    //   let f1 = req.files[index];
    //   if (index === "image1") {
    //     // await fs.writeFile(f1.name, image.data);
    //     f1.mv(`./public/${f1.name}`, (err) => {
    //       if (err) {
    //         console.log(err);
    //       }
    //     });
    //   } else {
    //     for (let image of f1) {
    //       image.mv(
    //         `./public/images/products/${"productId"}/${image.name}`,
    //         (err) => {
    //           if (err) {
    //             console.log(err);
    //           }
    //         }
    //       );
    //     }
    //   }
    // }

    const res = await Service.product.add_product(
      data.category,
      data.model,
      data.brand,
      data.description,
      data.price,
      data.quantity,
      file
    );
    resp.status(200).send(data);
  } catch (err) {
    resp.status(400).send(err.message);
  }
};

const remove_product = async (req, resp) => {
  try {
    const productId = req.query.id;
    const res = await Service.product.remove_product(productId);
    resp.status(200).send(res);
  } catch (err) {
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
      data.description,
      data.price,
      data.quantity,
      data.rating
    );
    resp.status(200).send(res);
  } catch (err) {
    resp.status(400).send(err.message);
  }
};

const revenue_report = async (req, resp) => {
  try {
    resp.status(200).send("Working Good from revenue-report");
  } catch (err) {
    resp.status(400).send(err.message);
  }
};

const ar_aging_report = async (req, resp) => {
  try {
    resp.status(200).send("Working good from Ar-aging");
  } catch (err) {
    resp.status(400).send(err.message);
  }
};

const search_products = async (req, resp) => {
  try {
    const keyword = req.params.keyword;
    const res = await Service.product.search_products(keyword);
    resp.status(200).status(200).send(res);
  } catch (err) {
    resp.status(400).send(err.message);
  }
};

module.exports = {
  get_all_product,
  get_product_by_id,
  add_product,
  remove_product,
  update_product,
  revenue_report,
  ar_aging_report,
  search_products,
};
