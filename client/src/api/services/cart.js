const axios_instance = require("../config/config");
const { cart } = require("../config/api-endpoints");

const add_product_to_cart = async () => {
  try {
    const params = {
      id: "6b9b1d51-6da7-4be2-a288-61ebbc188260",
    };
    const data = {
      productId: "c78e00bd-9814-403d-812c-dae6cbd904a6",
      quantity: 5,
    };
    const res = await axios_instance({
      endpoints: cart.addTo,
      query: params,
      data: data,
    });
    console.log(res.data);
  } catch (err) {
    console.log(`ERROR: ${err.response.data}`);
  }
};

const update_quantity_in_cart = async () => {
  try {
    const params = {
      id: "6b9b1d51-6da7-4be2-a288-61ebbc188260",
    };
    const data = {
      productId: "c78e00bd-9814-403d-812c-dae6cbd904a6",
      quantity: 15,
      action: "remove",
    };
    const res = await axios_instance({
      endpoints: cart.update,
      query: params,
      data: data,
    });
    console.log(res.data);
  } catch (err) {
    console.log(`ERROR: ${err.response.data}`);
  }
};
// add_product_to_cart();
// update_quantity_in_cart();

module.exports = { add_product_to_cart, update_quantity_in_cart };
