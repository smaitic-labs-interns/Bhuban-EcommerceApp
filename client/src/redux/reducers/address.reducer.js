import {
  GET_COUNTRIES_REQUEST,
  GET_COUNTRIES_SUCCESS,
  GET_COUNTRIES_FAILED,
  GET_COUNTRY_STATES_REQUEST,
  GET_COUNTRY_STATES_SUCCESS,
  GET_COUNTRY_STATES_FAILED,
  GET_STATE_DISTRICTS_REQUEST,
  GET_STATE_DISTRICTS_SUCCESS,
  GET_STATE_DISTRICTS_FAILED,
} from '../constants/address.constants';

const countriesInitialState = {
  status: null,
  message: '',
  countries: [],
};

const countryStatesInitialState = {
  status: null,
  message: '',
  states: [],
};

const stateDistrictsInitialState = {
  status: null,
  message: '',
  districts: [],
};

export const all_countries = (state = countriesInitialState, { type, payload }) => {
  switch (type) {
    case GET_COUNTRIES_REQUEST:
      return { ...state, status: null };
    case GET_COUNTRIES_SUCCESS:
      return {
        ...state,
        countries: payload,
        status: 'success',
        message: 'Fetched Sucessfully',
      };
    case GET_COUNTRIES_FAILED:
      return {
        ...state,
        status: 'failed',
        message: payload,
      };
    default:
      return state;
  }
};

export const country_all_states = (state = countryStatesInitialState, { type, payload }) => {
  switch (type) {
    case GET_COUNTRY_STATES_REQUEST:
      return { ...state, status: null };
    case GET_COUNTRY_STATES_SUCCESS:
      return {
        ...state,
        states: payload,
        status: 'success',
        message: 'Fetched Sucessfully',
      };
    case GET_COUNTRY_STATES_FAILED:
      return {
        ...state,
        status: 'failed',
        message: payload,
      };
    default:
      return state;
  }
};

export const state_all_districts = (state = stateDistrictsInitialState, { type, payload }) => {
  switch (type) {
    case GET_STATE_DISTRICTS_REQUEST:
      return { ...state, status: null };
    case GET_STATE_DISTRICTS_SUCCESS:
      return {
        ...state,
        districts: payload,
        status: 'success',
        message: 'Fetched Sucessfully',
      };
    case GET_STATE_DISTRICTS_FAILED:
      return {
        ...state,
        status: 'failed',
        message: payload,
      };
    default:
      return state;
  }
};
