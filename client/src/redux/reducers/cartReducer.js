import { ADD_TO_CART, REMOVE_FROM_CART, GET_USER_CART } from "../constants/cartConstants";

const initialState = {
  userId: "",
  products: [],
  totalBill: 0,
};
export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
        
      return {
        ...state,
        userId: action.payload.userId,
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        products: action.payload,
      };
    default:
      return state;
  }
};

export const getCartReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case GET_USER_CART:
      return { ...state, ...payload };
    default:
      return state;
  }
};
