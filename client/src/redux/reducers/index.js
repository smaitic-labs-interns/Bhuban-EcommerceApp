import { combineReducers } from "redux";
import { registerReducer, loginReducer } from "./userReducer";
import { productReducer, selectedProductReducer } from "./productReducer";
import { cartReducer, addToCartReducer, cartProductsDetailReducer } from "./cartReducer";

const reducers = combineReducers({
  register: registerReducer,
  login: loginReducer,
  allProducts: productReducer,
  product: selectedProductReducer,
  userCart: cartReducer,
  cartProductsDetail: cartProductsDetailReducer,
  addToCart: addToCartReducer,
});

export default reducers;
