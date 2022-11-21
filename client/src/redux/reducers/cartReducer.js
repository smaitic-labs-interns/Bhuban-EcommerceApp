import {
  USER_CART_REQUEST,
  USER_CART_SUCCESS,
  USER_CART_FAILED,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAILED,
  UPDATE_CART_REQUEST,
  UPDATE_CART_SUCCESS,
  UPDATE_CART_FAILED,
  CART_PRODUCTS_DETAILS_REQUEST,
  CART_PRODUCTS_DETAILS_SUCCESS,
  CART_PRODUCTS_DETAILS_FAILED,
} from "../constants/cartConstants";

const initialState = {
  products: [],
  totalBill: 0,
  noOfProducts: 0,
  status: null,
  message: "",
};

const cartProductsDetail = {
  products: [],
  status: null,
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_CART_REQUEST:
      return { ...state, status: null };
    case USER_CART_SUCCESS:
      return {
        ...state,
        products: action.payload.products,
        totalBill: action.payload.totalBill,
        noOfProducts: action.payload.products.length,
        status: "success",
      };
    case USER_CART_FAILED:
      return {
        ...state,
        message: action.payload,
        status: "failed",
      };
    default:
      return state;
  }
};

// export const getCartReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case SET_CART_REQUEST:
//       return {
//         ...state,
//         loading: true,
//       };
//     case SET_CART_FAIL:
//       return {
//         ...state,
//         loading: false,
//         isLogined: false,
//         message: action.payload.data,
//       };
//     case SET_CART_SUCCESS:
//       return {

//       };
//     default:
//       return state;
//   }
// };

const addToCartInitialState = {
  products: [],
  message: "",
  status: null,
};

export const add_to_cart_reducer = (
  state = addToCartInitialState,
  { type, payload }
) => {
  switch (type) {
    case ADD_TO_CART_REQUEST:
      return { ...state, status: null };
    case ADD_TO_CART_SUCCESS:
      return {
        ...state,
        message: payload,
        status: "success",
      };
    case ADD_TO_CART_FAILED:
      return {
        ...state,
        message: payload,
        status: "failed",
      };

    default:
      return state;
  }
};

const updateCartInitialState = {
  status: null,
  message: "",
};

export const update_cart_reducer = (
  state = updateCartInitialState,
  { type, payload }
) => {
  switch (type) {
    case UPDATE_CART_REQUEST:
      return { ...state, status: null };
    case UPDATE_CART_SUCCESS:
      return {
        ...state,
        status: "success",
        message: payload,
      };
    case UPDATE_CART_FAILED:
      return {
        ...state,
        status: "failed",
        message: payload,
      };
    default:
      return state;
  }
};

const cartProductsInitialState = {
  status: null,
  message: "",
  details: [],
};

export const cart_products_details_reducer = (
  state = updateCartInitialState,
  { type, payload }
) => {
  switch (type) {
    case CART_PRODUCTS_DETAILS_REQUEST:
      return { ...state, status: null };
    case CART_PRODUCTS_DETAILS_SUCCESS:
      return {
        ...state,
        status: "success",
        details: payload,
      };
    case CART_PRODUCTS_DETAILS_FAILED:
      return {
        ...state,
        status: "failed",
        details: payload,
      };
    default:
      return state;
  }
};
