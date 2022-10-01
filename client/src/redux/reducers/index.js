import { combineReducers } from "redux";
import { registerReducer, loginReducer } from "./userReducer";
import { productReducer, selectedProductReducer } from "./productReducer";

const reducers = combineReducers({
  register: registerReducer,
  login: loginReducer,
  allProducts: productReducer,
  product: selectedProductReducer,
});

export default reducers;
