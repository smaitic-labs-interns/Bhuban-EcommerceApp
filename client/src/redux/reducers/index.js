import { combineReducers } from "redux";
import { registerReducer, loginReducer } from "./userReducer";
import { productReducer, selectedProductReducer } from "./productReducer";
import {
  cartReducer,
  addToCartReducer,
  cartProductsDetailReducer,
} from "./cartReducer";
import storage from "redux-persist/lib/storage";
import { persistCombineReducers } from "redux-persist";
import persistReducer from "redux-persist/es/persistReducer";

const persistConfig = {
  key: "persist-store",
  storage,
  blacklist: ['login'],
};
const persistedReducer = persistCombineReducers(persistConfig, {
  register: registerReducer,
  login: persistReducer(
    {
      key: "login",
      storage: storage,
      blacklist: ['address'],
    },
    loginReducer
  ),
  // login: loginReducer,
  allProducts: productReducer,
  product: selectedProductReducer,
  userCart: cartReducer,
  cartProductsDetail: cartProductsDetailReducer,
  addToCart: addToCartReducer,
});

export default persistedReducer;
