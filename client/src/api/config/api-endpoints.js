export const user = {
  login: {
    method: "POST",
    url: "/user/login/",
  },
  register: {
    method: "POST",
    url: "/user/register/",
  },
};

export const product = {
  all: {
    method: "GET",
    url: "/product/getAll/",
  },
  all: {
    method: "GET",
    url: " /product/limited/",
  },
  one: {
    method: "GET",
    url: "/product/getOne/:productId",
  },
  add: {
    method: "POST",
    url: "/product/add/",
  },
  remove: {
    method: "delete",
    url: "/product/remove/",
  },
  update: {
    method: "PUT",
    url: "/product/update/",
  },
  revenue: {
    method: "GET",
    url: "/product/revenueReport/",
  },
  arAging: {
    method: "GET",
    url: "/product/arAgingReport/",
  },
  search: {
    method: "GET",
    url: "/product/search/:keyword",
  },
};

export const cart = {
  getCart: {
    method: "GET",
    url: "/cart/getCart/",
  },
  addTo: {
    method: "POST",
    url: "/cart/addProductToCart/",
  },
  update: {
    method: "PUT",
    url: "/cart/updateQuantityInCart/",
  },
};

export const order = {
  all: {
    method: "GET",
    url: "/order/all/",
  },
  user: {
    method: "GET",
    url: "/order/user/",
  },
  one: {
    method: "GET",
    url: "/order/one/",
  },
  place: {
    method: "POST",
    url: "/order/placeOrder/",
  },
  updateQuantity: {
    method: "PUT",
    url: "order/updateQuantityInOrder/",
  },
  updateAddress: {
    method: "PUT",
    url: "/order/updateAddress/",
  },
  updatePayment: {
    method: "PUT",
    url: "order/updatePayment/",
  },
  updateStatus: {
    method: "PUT",
    url: "order/updateStatus/",
  },
  updateShipment: {
    method: "PUT",
    url: "order/updateShipment/",
  },
  track: {
    method: "GET",
    url: "/order/trackOrder/",
  },
  cancel: {
    method: "PUT",
    url: "order/cancelOrder/",
  },
  returnReplace: {
    method: "PUT",
    url: "/order/returnReplaceOrder/",
  },
  refund: {
    method: "GET",
    url: "order/refundUpdates/",
  },
  shipmentUpdates: {
    method: "GET",
    url: "order/shipmentUpdates/",
  },
  returnUpdates: {
    method: "GET",
    url: "/order/returnUpdates/",
  },
  paymentupdates: {
    method: "GET",
    url: "order/paymentupdates/",
  },
};

export const address = {
  countries: {
    method: "GET",
    url: "/countries/all/",
  },

  states: {
    method: "GET",
    url: "/states/all/",
  },

  districts: {
    method: "GET",
    url: "/districts/all/",
  },

  countryStates: {
    method: "GET",
    url: "/country/states/all/",
  },

  stateDistricts: {
    method: "GET",
    url: "/state/districts/all/",
  },
};

export const mail = {
  send: {
    method: "POST",
    url: "/mail/send/",
  },
};
