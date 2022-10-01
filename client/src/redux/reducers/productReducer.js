import { FETCH_PRODUCTS, SET_PRODUCTS, SELECTED_PRODCT, REMOVE_SELECTED_PRODUCT } from "../constants/productConstants";


const initialState = {
    products: [],
  };
  export const productReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_PRODUCTS:
        return { ...state, products: action.payload };
      default:
        return state;
    }
  };
  
  export const selectedProductReducer = (state = {}, { type, payload }) => {
    switch (type) {
      case SELECTED_PRODCT:
        return { ...state, ...payload };
      case FETCH_PRODUCTS:
        return { ...state, products:payload };
      case REMOVE_SELECTED_PRODUCT:
        return {};
  
      default:
        return state;
    }
  };