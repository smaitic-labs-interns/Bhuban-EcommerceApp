import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILED,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILED,
} from '../constants/userConstants';

const initialStateRegister = {
  status: null,
  message: '',
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
