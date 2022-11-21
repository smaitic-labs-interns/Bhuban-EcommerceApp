import {
  FETCH_PRODUCTS,
  SET_PRODUCTS,
  SELECTED_PRODCT,
  REMOVE_SELECTED_PRODUCT,
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAILED,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAILED,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILED,
  SEARCH_PRODUCT_REQUEST,
  SEARCH_PRODUCT_SUCCESS,
  SEARCH_PRODUCT_FAILED,
} from "../constants/productConstants";

const initialState = {
  products: [],
};
const deleteProductInitialState = {
  id: "",
  message: "",
};

const addProductInitialState = {
  brand: "",
  category: "",
  model: "",
  name: "",
  price: "",
  quantity: "",
  description: "",
  images: [],
  status: null,
  message: "",
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
    case FETCH_PRODUCT_REQUEST:
      return {};
    case FETCH_PRODUCT_SUCCESS:
      return { ...payload };
    case FETCH_PRODUCT_FAILED:
      return {};
    case REMOVE_SELECTED_PRODUCT:
      return {};
    default:
      return state;
  }
};

export const addProductReducer = (
  state = addProductInitialState,
  { type, payload }
) => {
  switch (type) {
    case ADD_PRODUCT_REQUEST:
      return { ...state, status: null };
    case ADD_PRODUCT_SUCCESS:
      return { ...state, message: payload, status: "success" };
    case ADD_PRODUCT_FAILED:
      return { ...state, message: payload, status: "failed" };
    default:
      return state;
  }
};

export const delete_product_reducer = (
  state = deleteProductInitialState,
  { type, payload }
) => {
  switch (type) {
    case DELETE_PRODUCT_REQUEST:
      return { ...state, ...payload };
    case DELETE_PRODUCT_SUCCESS:
      return { ...state, products: payload };
    case DELETE_PRODUCT_FAILED:
      return {};
    default:
      return state;
  }
};

const searchProductInitialState = {
  status: null,
  products: [],
};

export const search_product_reducer = (
  state = searchProductInitialState,
  { type, payload }
) => {
  switch (type) {
    case SEARCH_PRODUCT_REQUEST:
      return {
        ...state,
        status: null,
      };
    case SEARCH_PRODUCT_SUCCESS:
      return {
        ...state,
        status: "success",
        products: payload,
      };
    case SEARCH_PRODUCT_FAILED:
      return {
        ...state,
        status: "failed",
      };
    default:
      return state;
  }
};
