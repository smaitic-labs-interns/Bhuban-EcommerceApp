import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILED,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILED,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  FETCH_LIMITED_USER_REQUEST,
  FETCH_LIMITED_USER_SUCCESS,
  FETCH_LIMITED_USER_FAILED,
  FETCH_ONE_USER_REQUEST,
  FETCH_ONE_USER_SUCCESS,
  FETCH_ONE_USER_FAILED,
  REMOVE_USER_REQUEST,
  REMOVE_USER_SUCCESS,
  REMOVE_USER_FAILED,
  UPDATE_USER_ROLE_REQUEST,
  UPDATE_USER_ROLE_SUCCESS,
  UPDATE_USER_ROLE_FAILED,
} from '../constants/userConstants';

const initialStateRegister = {
  status: null,
  message: '',
};

const initialStateFetchUser = {
  status: null,
  message: '',
  data: [],
};

const limitedUserinitialState = {
  status: null,
  message: '',
  all: [],
  next: {},
  previous: {},
};

const initialStateLogin = {
  userId: '',
  firstName: '',
  middleName: '',
  lastName: '',
  address: '',
  email: '',
  isLogined: false,
  role: null,
  imageUrl: '',
  imageAltText: '',
  status: null,
  message: '',
};

export const register_reducer = (state = initialStateRegister, { type, payload }) => {
  switch (type) {
    case USER_REGISTER_REQUEST:
      return initialStateRegister;

    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: payload.data,
      };
    case USER_REGISTER_FAILED:
      return {
        ...state,
        status: 'failed',
        message: payload.data,
      };

    default:
      return state;
  }
};

export const fetch_one_user_reducer = (state = initialStateFetchUser, { type, payload }) => {
  switch (type) {
    case FETCH_ONE_USER_REQUEST:
      return initialStateFetchUser;

    case FETCH_ONE_USER_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: 'User fetched successfully',
        data: [payload.data],
      };
    case FETCH_ONE_USER_FAILED:
      return {
        ...state,
        status: 'failed',
        message: payload.data,
      };

    default:
      return state;
  }
};

export const fetch_limited_user_reducer = (state = limitedUserinitialState, { type, payload }) => {
  switch (type) {
    case FETCH_LIMITED_USER_REQUEST:
      return limitedUserinitialState;

    case FETCH_LIMITED_USER_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: 'Users fetched successfully',
        all: payload.data,
        next: payload.next || {},
        previous: payload.previous || {},
      };
    case FETCH_LIMITED_USER_FAILED:
      return {
        ...state,
        status: 'failed',
        message: payload.data,
      };

    default:
      return state;
  }
};

export const remove_user_reducer = (state = initialStateRegister, { type, payload }) => {
  switch (type) {
    case REMOVE_USER_REQUEST:
      return initialStateRegister;

    case REMOVE_USER_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: payload.data,
      };
    case REMOVE_USER_FAILED:
      return {
        ...state,
        status: 'failed',
        message: payload.data,
      };

    default:
      return state;
  }
};

export const update_user_reducer = (state = initialStateRegister, { type, payload }) => {
  switch (type) {
    case UPDATE_USER_REQUEST:
      return initialStateRegister;

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: payload.data,
      };
    case UPDATE_USER_FAILED:
      return {
        ...state,
        status: 'failed',
        message: payload.data,
      };

    default:
      return state;
  }
};

export const update_user_role_reducer = (state = initialStateRegister, { type, payload }) => {
  switch (type) {
    case UPDATE_USER_ROLE_REQUEST:
      return initialStateRegister;

    case UPDATE_USER_ROLE_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: payload.data,
      };
    case UPDATE_USER_ROLE_FAILED:
      return {
        ...state,
        status: 'failed',
        message: payload.data,
      };

    default:
      return state;
  }
};

export const loginReducer = (state = initialStateLogin, { type, payload }) => {
  switch (type) {
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        status: null,
      };

    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        isLogined: true,
        userId: payload.id,
        firstName: payload.firstname,
        middleName: payload.middlename,
        lastName: payload.lastname,
        address: payload.address,
        email: payload.email,
        imageUrl: payload.imageurl,
        imageAltText: payload.imagealttext,
        role: payload.role,
        message: 'login success',
        status: 'success',
      };
    case USER_LOGIN_FAILED:
      return {
        ...state,
        isLogined: false,
        message: payload.data,
        status: 'failed',
      };
    case USER_LOGOUT: {
      localStorage.clear('persist:login');
      return initialStateLogin;
    }
    default:
      return state;
  }
};
