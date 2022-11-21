import { registerReducer, loginReducer } from "./userReducer";
import {
  productReducer,
  selectedProductReducer,
  addProductReducer,
  search_product_reducer,
} from "./productReducer";
import {
  cartReducer,
  add_to_cart_reducer,
  update_cart_reducer,
  cart_products_details_reducer,
} from "./cartReducer";
import { send_mail_reducer } from "./mail.reducer";
import storage from "redux-persist/lib/storage";
import { persistCombineReducers } from "redux-persist";
import persistReducer from "redux-persist/es/persistReducer";
import {
  all_order_reducer,
  user_orders_reducer,
  one_order_reducer,
  place_order_reducer,
  track_order_reducer,
  update_order_quantity_reducer,
  update_order_address_reducer,
  update_order_payment_reducer,
  cancel_order_reducer,
  return_replace_order_reducer,
} from "./orderReducer";
import {
  all_countries,
  country_all_states,
  state_all_districts,
} from "./extra";

const persistConfig = {
  key: "persist-store",
  storage,
  blacklist: [
    "login",
    "searchProduct",
    "cartProductsDetails",
    "addToCart",
    "updateCart",
    "allOrder",
    "userOrders",
    "oneOrder",
    "placeOrder",
    "updateOrderQuantity",
    "updateOrderAddress",
    "updateOrderPayment",
    "cancelOrder",
    "returnReplace",
    "addProduct",
    "allCountries",
    "allStates",
    "allDistricts",
    "trackOrder",
    "sendMail",
  ],
};
const persistedReducer = persistCombineReducers(persistConfig, {
  register: registerReducer,
  login: persistReducer(
    {
      key: "login",
      storage: storage,
      blacklist: ["loading", "message"],
    },
    loginReducer
  ),
  // login: loginReducer,z
  allProducts: productReducer,
  product: selectedProductReducer,
  addProduct: persistReducer(
    {
      key: "addProduct",
      storage: storage,
      blacklist: ["message", "status"],
    },
    addProductReducer
  ),
  searchProduct: persistReducer(
    {
      key: "searchProduct",
      storage: storage,
      blacklist: ["products", "status"],
    },
    search_product_reducer
  ),
  updateCart: persistReducer(
    {
      key: "updateCart",
      storage: storage,
      blacklist: ["message", "status"],
    },
    update_cart_reducer
  ),
  userCart: cartReducer,
  cartProductsDetails: persistReducer(
    {
      key: "cartProductsDetails",
      storage: storage,
      blacklist: ["message", "status"],
    },
    cart_products_details_reducer
  ),
  addToCart: persistReducer(
    {
      key: "addToCart",
      storage: storage,
      blacklist: ["message", "status"],
    },
    add_to_cart_reducer
  ),
  allOrder: persistReducer(
    {
      key: "allOrder",
      storage: storage,
      blacklist: ["message", "status"],
    },
    all_order_reducer
  ),
  userOrders: persistReducer(
    {
      key: "userOrders",
      storage: storage,
      blacklist: ["message", "status"],
    },
    user_orders_reducer
  ),
  oneOrder: persistReducer(
    {
      key: "oneOrder",
      storage: storage,
      blacklist: ["message", "status"],
    },
    one_order_reducer
  ),
  placeOrder: persistReducer(
    {
      key: "placeOrder",
      storage: storage,
      blacklist: ["message", "status"],
    },
    place_order_reducer
  ),
  trackOrder: persistReducer(
    {
      key: "trackOrder",
      storage: storage,
      blacklist: ["data", "status"],
    },
    track_order_reducer
  ),
  updateOrderQuantity: persistReducer(
    {
      key: "updateOrderQuantity",
      storage: storage,
      blacklist: ["data", "status"],
    },
    update_order_quantity_reducer
  ),
  updateOrderAddress: persistReducer(
    {
      key: "updateOrderAddress",
      storage: storage,
      blacklist: ["data", "status"],
    },
    update_order_address_reducer
  ),
  updateOrderPayment: persistReducer(
    {
      key: "updateOrderPayment",
      storage: storage,
      blacklist: ["data", "status"],
    },
    update_order_payment_reducer
  ),
  cancelOrder: persistReducer(
    {
      key: "cancelOrder",
      storage: storage,
      blacklist: ["data", "status"],
    },
    cancel_order_reducer
  ),
  returnReplace: persistReducer(
    {
      key: "returnReplace",
      storage: storage,
      blacklist: ["data", "status"],
    },
    return_replace_order_reducer
  ),
  countries: persistReducer(
    {
      key: "allCountries",
      storage: storage,
      blacklist: ["message", "status"],
    },
    all_countries
  ),
  states: persistReducer(
    {
      key: "allStates",
      storage: storage,
      blacklist: ["message", "status", "states"],
    },
    country_all_states
  ),
  districts: persistReducer(
    {
      key: "allDistricts",
      storage: storage,
      blacklist: ["message", "status"],
    },
    state_all_districts
  ),
  sendMail: persistReducer(
    {
      key: "sendMail",
      storage: storage,
      blacklist: ["message", "status"],
    },
    send_mail_reducer
  ),
});

export default persistedReducer;
