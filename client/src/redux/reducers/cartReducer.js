import {
  SET_CART,
  ADD_TO_CART,
  CART_PRODUCT_DETAILS,
  // GET_USER_CART,
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
    case SET_CART:
      return {
        ...state,
        products: action.payload.products,
        totalBill: action.payload.totalBill,
        noOfProducts: action.payload.products.length,
        message: action.payload.message,
      };
    case ADD_TO_CART:
      return {
        ...state,
        data: action.payload,
      };
    // case REMOVE_FROM_CART:
    //   return {
    //     ...state,
    //     products: action.payload,
    //   };
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
};

export const addToCartReducer = (
  state = addToCartInitialState,
  { type, payload }
) => {
  switch (type) {
    case ADD_TO_CART:
      return {
        ...state,
        data: payload,
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
