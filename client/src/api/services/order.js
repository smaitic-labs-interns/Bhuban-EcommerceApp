const axios_instance = require("../config/config");
const { order } = require("../config/api-endpoints");

const place_order = async () => {
  try {
    const params = {
      id: "6b9b1d51-6da7-4be2-a288-61ebbc188260",
    };
    const data = {
      shippingAddress: {
        country: "Nepal",
        province: "3",
        city: "abc",
        ward: 23,
        tole: "xyz",
        houseNo: 12,
      },
      paymentType: "CASH",
      shipmentType: "International",
    };
    const res = await axios_instance({
      endpoints: order.place,
      query: params,
      data: data,
    });
    console.log(res.data);
  } catch (err) {
    console.log(`ERROR: ${err.response.data}`);
  }
};

const update_quantity_order = async () => {
  try {
    const params = {
      id: "b45a4235-a0d7-4b8a-8b3f-200f563d6558",
    };
    const data = {
      productId: "c78e00bd-9814-403d-812c-dae6cbd904a6",
      quantity: 1,
      action: "remove",
    };
    const res = await axios_instance({
      endpoints: order.updateQuantity,
      query: params,
      data: data,
    });
    console.log(res.data);
  } catch (err) {
    console.log(`ERROR: ${err.response.data}`);
  }
};

const update_address = async () => {
  try {
    const params = {
      id: "b45a4235-a0d7-4b8a-8b3f-200f563d6558",
    };
    const data = {
      country: "Nepal",
      province: "Bagmati",
      city: "Lalitpur",
      ward: 23,
      tole: "Banglamukhi",
      houseNo: 38,
    };
    const res = await axios_instance({
      endpoints: order.updateAddress,
      query: params,
      data: data,
    });
    console.log(res.data);
  } catch (err) {
    console.log(`ERROR: ${err.response.data}`);
  }
};

const update_payment = async () => {
  try {
    const params = {
      id: "b45a4235-a0d7-4b8a-8b3f-200f563d6558",
    };
    const data = {
      type: "Khalti",
      status: "paid",
    };
    const res = await axios_instance({
      endpoints: order.updatePayment,
      query: params,
      data: data,
    });
    console.log(res.data);
  } catch (err) {
    console.log(`ERROR: ${err.response.data}`);
  }
};

const track_order = async () => {
  try {
    const params = {
      id: "b45a4235-a0d7-4b8a-8b3f-200f563d6558",
    };
    const res = await axios_instance({ endpoints: order.track, query: params });
    console.log(res.data);
  } catch (err) {
    console.log(`ERROR: ${err.response.data}`);
  }
};

const cancel_order = async () => {
  try {
    const params = {
      id: "b45a4235-a0d7-4b8a-8b3f-200f563d6558",
    };
    const res = await axios_instance({
      endpoints: order.cancel,
      query: params,
    });
    console.log(res.data);
  } catch (err) {
    console.log(`ERROR: ${err.response.data}`);
  }
};

const return_replace_order = async () => {
  try {
    const params = {
      id: "b45a4235-a0d7-4b8a-8b3f-200f563d6558",
    };
    const data = {
      action: "replace",
    };
    const res = await axios_instance({
      endpoints: order.returnReplace,
      query: params,
      data: data,
    });
    console.log(res.data);
  } catch (err) {
    console.log(`ERROR: ${err.response.data}`);
  }
};

const refund_updates = async () => {
  try {
    const params = {
      id: "b45a4235-a0d7-4b8a-8b3f-200f563d6558",
    };
    const res = await axios_instance({
      endpoints: order.refund,
      query: params,
    });
    console.log(res.data);
  } catch (err) {
    console.log(`ERROR: ${err.response.data}`);
  }
};

const send_shipment_updates = async () => {
  try {
    const params = {
      id: "b45a4235-a0d7-4b8a-8b3f-200f563d6558",
    };
    const res = await axios_instance({
      endpoints: order.shipmentUpdates,
      query: params,
    });
    console.log(res.data);
  } catch (err) {
    console.log(`ERROR: ${err.response.data}`);
  }
};

const send_return_updates = async () => {
  try {
    const params = {
      id: "b45a4235-a0d7-4b8a-8b3f-200f563d6558",
    };
    const res = await axios_instance({
      endpoints: order.returnUpdates,
      query: params,
    });
    console.log(res.data);
  } catch (err) {
    console.log(`ERROR: ${err.response.data}`);
  }
};

const send_payment_updates = async () => {
  try {
    const params = {
      id: "b45a4235-a0d7-4b8a-8b3f-200f563d6558",
    };
    const res = await axios_instance({
      endpoints: order.paymentupdates,
      query: params,
    });
    console.log(res.data);
  } catch (err) {
    console.log(`ERROR: ${err.response.data}`);
  }
};

// place_order();
// update_quantity_order();
// update_address();
// update_payment();
// track_order();
// cancel_order();
// return_replace_order();
// refund_updates();
// send_shipment_updates();
// send_return_updates();
// send_payment_updates();

module.exports = {
  place_order,
  update_quantity_order,
  update_address,
  update_payment,
  track_order,
  cancel_order,
  return_replace_order,
  refund_updates,
  send_shipment_updates,
  send_return_updates,
  send_payment_updates,
};
