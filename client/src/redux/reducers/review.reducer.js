import {
  ADD_REVIEW_REQUEST,
  ADD_REVIEW_SUCCESS,
  ADD_REVIEW_FAILED,
  GET_ALL_REVIEW_REQUEST,
  GET_ALL_REVIEW_SUCCESS,
  GET_ALL_REVIEW_FAILED,
  GET_LIMITED_REVIEW_REQUEST,
  GET_LIMITED_REVIEW_SUCCESS,
  GET_LIMITED_REVIEW_FAILED,
  GET_ONE_REVIEW_REQUEST,
  GET_ONE_REVIEW_SUCCESS,
  GET_ONE_REVIEW_FAILED,
  GET_ALL_REVIEW_BY_ORDER_REQUEST,
  GET_ALL_REVIEW_BY_ORDER_SUCCESS,
  GET_ALL_REVIEW_BY_ORDER_FAILED,
  GET_LIMITED_REVIEW_BY_ORDER_REQUEST,
  GET_LIMITED_REVIEW_BY_ORDER_SUCCESS,
  GET_LIMITED_REVIEW_BY_ORDER_FAILED,
  GET_ALL_REVIEW_BY_PRODUCT_REQUEST,
  GET_ALL_REVIEW_BY_PRODUCT_SUCCESS,
  GET_ALL_REVIEW_BY_PRODUCT_FAILED,
  GET_LIMITED_REVIEW_BY_PRODUCT_REQUEST,
  GET_LIMITED_REVIEW_BY_PRODUCT_SUCCESS,
  GET_LIMITED_REVIEW_BY_PRODUCT_FAILED,
  GET_REVIEW_BY_ORDER_PRODUCT_REQUEST,
  GET_REVIEW_BY_ORDER_PRODUCT_SUCCESS,
  GET_REVIEW_BY_ORDER_PRODUCT_FAILED,
  GET_AVG_RATING_REQUEST,
  GET_AVG_RATING_SUCCESS,
  GET_AVG_RATING_FAILED,
  REMOVE_REVIEW_REQUEST,
  REMOVE_REVIEW_SUCCESS,
  REMOVE_REVIEW_FAILED,
} from 'redux/constants/reviewConstants';

const initialStateReview = {
  status: null,
  message: '',
  all: [],
  next: {},
  previous: {},
};

export const add_review_reducer = (state = initialStateReview, { type, payload }) => {
  switch (type) {
    case ADD_REVIEW_REQUEST:
      return initialStateReview;

    case ADD_REVIEW_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: payload.data,
      };
    case ADD_REVIEW_FAILED:
      return {
        ...state,
        status: 'failed',
        message: payload.data,
      };

    default:
      return state;
  }
};

export const get_all_reviews_reducer = (state = initialStateReview, { type, payload }) => {
  switch (type) {
    case GET_ALL_REVIEW_REQUEST:
      return initialStateReview;

    case GET_ALL_REVIEW_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: 'Review fetched successfully',
        all: payload.data,
      };
    case GET_ALL_REVIEW_FAILED:
      return {
        ...state,
        status: 'failed',
        message: payload.data,
      };

    default:
      return state;
  }
};

export const get_limited_reviews_reducer = (state = initialStateReview, { type, payload }) => {
  switch (type) {
    case GET_LIMITED_REVIEW_REQUEST:
      return initialStateReview;

    case GET_LIMITED_REVIEW_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: 'Review fetched successfully',
        all: payload.data,
        next: payload.next || {},
        previous: payload.previous || {},
      };
    case GET_LIMITED_REVIEW_FAILED:
      return {
        ...state,
        status: 'failed',
        message: payload.data,
      };

    default:
      return state;
  }
};

export const get_reviews_by_id_reducer = (state = initialStateReview, { type, payload }) => {
  switch (type) {
    case GET_ONE_REVIEW_REQUEST:
      return initialStateReview;

    case GET_ONE_REVIEW_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: 'Review fetched successfully',
        all: payload.data,
      };
    case GET_ONE_REVIEW_FAILED:
      return {
        ...state,
        status: 'failed',
        message: payload.data,
      };

    default:
      return state;
  }
};

export const get_reviews_by_orderId_reducer = (state = initialStateReview, { type, payload }) => {
  switch (type) {
    case GET_ALL_REVIEW_BY_ORDER_REQUEST:
      return initialStateReview;

    case GET_ALL_REVIEW_BY_ORDER_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: 'Review fetched successfully',
        all: payload.data,
      };
    case GET_ALL_REVIEW_BY_ORDER_FAILED:
      return {
        ...state,
        status: 'failed',
        message: payload.data,
      };

    default:
      return state;
  }
};

export const get_limited_reviews_by_orderId_reducer = (
  state = initialStateReview,
  { type, payload },
) => {
  switch (type) {
    case GET_LIMITED_REVIEW_BY_ORDER_REQUEST:
      return initialStateReview;

    case GET_LIMITED_REVIEW_BY_ORDER_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: 'Review fetched successfully',
        all: payload.data,
        next: payload.next || {},
        previous: payload.previous || {},
      };
    case GET_LIMITED_REVIEW_BY_ORDER_FAILED:
      return {
        ...state,
        status: 'failed',
        message: payload.data,
      };

    default:
      return state;
  }
};

export const get_reviews_by_productId_reducer = (state = initialStateReview, { type, payload }) => {
  switch (type) {
    case GET_ALL_REVIEW_BY_PRODUCT_REQUEST:
      return initialStateReview;

    case GET_ALL_REVIEW_BY_PRODUCT_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: 'Review fetched successfully',
        all: payload.data,
        next: payload.next || {},
        previous: payload.previous || {},
      };
    case GET_ALL_REVIEW_BY_PRODUCT_FAILED:
      return {
        ...state,
        status: 'failed',
        message: payload.data,
      };

    default:
      return state;
  }
};

export const get_limited_reviews_by_productId_reducer = (
  state = initialStateReview,
  { type, payload },
) => {
  switch (type) {
    case GET_LIMITED_REVIEW_BY_PRODUCT_REQUEST:
      return initialStateReview;

    case GET_LIMITED_REVIEW_BY_PRODUCT_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: 'Review fetched successfully',
        all: payload.data,
        next: payload.next || {},
        previous: payload.previous || {},
      };
    case GET_LIMITED_REVIEW_BY_PRODUCT_FAILED:
      return {
        ...state,
        status: 'failed',
        message: payload.data,
      };

    default:
      return state;
  }
};

export const read_reviews_by_order_product_id_reducer = (
  state = initialStateReview,
  { type, payload },
) => {
  switch (type) {
    case GET_REVIEW_BY_ORDER_PRODUCT_REQUEST:
      return initialStateReview;

    case GET_REVIEW_BY_ORDER_PRODUCT_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: 'Review fetched successfully',
        all: payload.data,
      };
    case GET_REVIEW_BY_ORDER_PRODUCT_FAILED:
      return {
        ...state,
        status: 'failed',
        message: payload.data,
      };

    default:
      return state;
  }
};

export const get_average_product_rating_reducer = (
  state = initialStateReview,
  { type, payload },
) => {
  switch (type) {
    case GET_AVG_RATING_REQUEST:
      return initialStateReview;

    case GET_AVG_RATING_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: 'Review fetched successfully',
        all: payload.data,
      };
    case GET_AVG_RATING_FAILED:
      return {
        ...state,
        status: 'failed',
        message: payload.data,
      };

    default:
      return state;
  }
};

export const remove_reviews_by_id_reducer = (state = initialStateReview, { type, payload }) => {
  switch (type) {
    case REMOVE_REVIEW_REQUEST:
      return initialStateReview;

    case REMOVE_REVIEW_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: payload.data,
      };
    case REMOVE_REVIEW_FAILED:
      return {
        ...state,
        status: 'failed',
        message: payload.data,
      };

    default:
      return state;
  }
};
