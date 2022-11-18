import { registerReducer, loginReducer } from "./userReducer";
import {
  productReducer,
  selectedProductReducer,
  addProductReducer,
} from "./productReducer";
import {
  cartReducer,
  add_to_cart_reducer,
  cartProductsDetailReducer,
} from "./cartReducer";
import storage from "redux-persist/lib/storage";
import { persistCombineReducers } from "redux-persist";
import persistReducer from "redux-persist/es/persistReducer";
import { place_order_reducer } from "./orderReducer";

const persistConfig = {
  key: "persist-store",
  storage,
  blacklist: ["login", "addToCart", "placeOrder", "addProduct"],
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
  userCart: cartReducer,
  cartProductsDetail: cartProductsDetailReducer,
  addToCart: persistReducer(
    {
      key: "addToCart",
      storage: storage,
      blacklist: ["message", "status"],
    },
    add_to_cart_reducer
  ),
  placeOrder: persistReducer(
    {
      key: "placeOrder",
      storage: storage,
      blacklist: ["message", "status"],
    },
    place_order_reducer
  ),
});

export default persistedReducer;
