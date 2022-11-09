import {
  FETCH_PRODUCTS,
  SET_PRODUCTS,
  SELECTED_PRODCT,
  REMOVE_SELECTED_PRODUCT,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAILED,
} from "../constants/productConstants";

const initialState = {
  products: [],
};

const addProductInitialState = {
  brand: "",
  category: "",
  model: "",
  price: "",
  quantity: "",
  description: "",
  images: [],
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
    case SELECTED_PRODCT:
      return { ...state, ...payload };
    case FETCH_PRODUCTS:
      return { ...state, products: payload };
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
  // console.log(payload);
  switch (type) {
    case ADD_PRODUCT_REQUEST:
      return { ...state, ...payload };
    case ADD_PRODUCT_SUCCESS:
      return { ...state, products: payload };
    case ADD_PRODUCT_FAILED:
      return {};
    default:
      return state;
  }
};
