const fs = require("fs");

const upload_product_images = async ({ productId, images }) => {
  try {
    const path = [];
    if (!fs.existsSync(`./public/images/products/${productId}`)) {
      fs.mkdirSync(`./public/images/products/${productId}`);
    }

    for (let index in images) {
      let f1 = images[index];
      if (index === "image1") {
        path.push(`/images/products/${productId}/${f1.name}`);
        f1.mv(`./public/images/products/${productId}/${f1.name}`, (err) => {
          if (err) {
            console.log(err);
          }
        });
      } else {
        for (let image of f1) {
          path.push(`/images/products/${productId}/${image.name}`);
          image.mv(
            `./public/images/products/${productId}/${image.name}`,
            (err) => {
              if (err) {
                console.log(err);
              }
            }
          );
        }
      }
    }
    return path;
  } catch (err) {
    throw err;
  }
};

const upload_user_image = async ({ images }) => {
  if (fs.existsSync("hello")) {
    console.log("Good to go");
  } else {
    fs.mkdirSync("hello");
  }
};

module.exports = { upload_product_images };
