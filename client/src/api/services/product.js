const myAxios = require("../config/config");
const { product } =require("../config/api-endpoints");

const add_product = async () => {
  try {
    const config = {
      ...product.add,
      data: {
        category: "mobile",
        model: "iphone-14",
        brand: "apple",
        description: "launched on september-2022",
        price: 200000,
        quantity: 5,
        rating: 4.5,
      },
    };
    const res = await myAxios(config);
    console.log(res.data);
  } catch (err) {
    console.log(`ERROR: ${err.response.data}`);
  }
};

// add_product();

const remove_product = async () => {
  try {
    const config = {
      ...product.remove,
      params: {
        id: "14fe6eb9-c607-46e3-96fa-fdcd6433af93",
      },
    };
    const res = await myAxios(config);
    console.log(res.data);
  } catch (err) {
    console.log(`ERROR: ${err.response.data}`);
    console.log(err.request);
  }
};

// remove_product();

const update_product = async () => {
  try {
    const config = {
      ...product.update,
      params: {
        id: "",
      },
      data: {
        category: "mobile",
        model: "iphone-14",
        brand: "apple",
        description: "launched on september-2022",
        price: 200000,
        quantity: 5,
        rating: 4.5,
      },
    };
    const res = await myAxios(config);
    console.log(res.data);
  } catch (err) {
    console.log(`ERROR: ${err.response.data}`);
  }
};

const revenue_report = async () => {
  try {
    const config = {
     ...product.revenue,
    };
    const res = await myAxios(config);
    console.log(res.data);
  } catch (err) {
    console.log(`ERROR: ${err.response.data}`);
  }
};

const ar_aging_report = async () => {
  try {
    const config = {
      ...product.arAging,
    };
    const res = await myAxios(config);
    console.log(res.data);
  } catch (err) {
    console.log(`ERROR: ${err.response.data}`);
  }
};

const search_products = async () => {
  try {
    const config = {
      ...product.search,
      params:{keyword:"a"},
    };
    const res = await myAxios(config);
    console.log(res.data);
  } catch (err) {
    console.log(`ERROR: ${err.response.data}`);
  }
};

search_products();

module.exports = {
  add_product,
  remove_product,
  update_product,
  revenue_report,
  ar_aging_report,
  search_products,
};
