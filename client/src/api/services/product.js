const axios_instance = require("../config/config");
const { product } = require("../config/api-endpoints");

const add_product = async () => {
  try {
    const data = {
      category: "mobile",
      model: "iphone-14",
      brand: "apple",
      description: "launched on september-2022",
      price: 200000,
      quantity: 5,
      rating: 4.5,
    };
    const res = await axios_instance({ endpoints: product.add, data: data });
    console.log(res.data);
  } catch (err) {
    console.log(`ERROR: ${err.response.data}`);
  }
};

const remove_product = async () => {
  try {
    const params = {
      id: "14fe6eb9-c607-46e3-96fa-fdcd6433af93",
    };
    const res = await axios_instance({
      endpoints: product.remove,
      query: params,
    });
    console.log(res.data);
  } catch (err) {
    console.log(`ERROR: ${err.response.data}`);
  }
};

const update_product = async () => {
  try {
    const params = {
      id: "1b3b79b7-95a7-4460-9a42-6950209ade1d",
    };
    const data = {
      category: "",
      model: "Samsung",
      brand: "samsung",
      description: "launched on october-2020",
      price: 5000,
      quantity: 0,
      rating: 5,
    };
    const res = await axios_instance({
      endpoints: product.update,
      query: params,
      data: data,
    });
    console.log(res.data);
  } catch (err) {
    console.log(`ERROR: ${err.response.data}`);
  }
};

const revenue_report = async () => {
  try {
    const res = await axios_instance({ endpoints: product.revenue });
    console.log(res.data);
  } catch (err) {
    console.log(`ERROR: ${err.response.data}`);
  }
};

const ar_aging_report = async () => {
  try {
    const res = await axios_instance({ endpoints: product.arAging });
    console.log(res.data);
  } catch (err) {
    console.log(`ERROR: ${err.response.data}`);
  }
};

const search_products = async () => {
  try {
    const res = await axios_instance({
      endpoints: product.search,
      path: { keyword: "a" },
    });
    console.log(res.data);
  } catch (err) {
    console.log(err);
  }
};

// add_product();
// remove_product();
// update_product();
// revenue_report();
// ar_aging_report();
// search_products();

module.exports = {
  add_product,
  remove_product,
  update_product,
  revenue_report,
  ar_aging_report,
  search_products,
};
