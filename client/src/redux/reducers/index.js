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

const persistConfig = {
  key: "persist-store",
  storage,
  blacklist: ["login", "addToCart"],
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
  addProduct: addProductReducer,
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
});

export default persistedReducer;
