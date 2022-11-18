import {
  SET_CART,
  ADD_TO_CART,
  CART_PRODUCT_DETAILS,
  // GET_USER_CART,
  USER_CART_REQUEST,
  USER_CART_SUCCESS,
  USER_CART_FAILED,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAILED,
} from "../constants/cartConstants";

const initialState = {
  products: [],
  totalBill: 0,
  noOfProducts: 0,
  message: { type: "", msg: "" },
};

const cartProductsDetail = {
  products: [],
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_CART_REQUEST:
      return {};
    case USER_CART_SUCCESS:
      return {
        ...state,
        products: action.payload.products,
        totalBill: action.payload.totalBill,
        noOfProducts: action.payload.products.length,
        message: action.payload.message,
      };
    case USER_CART_FAILED:
      return {
        ...state,
        data: action.payload,
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

export const cartProductsDetailReducer = (
  state = cartProductsDetail,
  { type, payload }
) => {
  switch (type) {
    case CART_PRODUCT_DETAILS:
      return {
        ...state,
        products: payload,
      };
    default:
      return state;
  }
};
