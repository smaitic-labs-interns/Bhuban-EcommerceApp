import { USER_REGISTER, USER_LOGIN } from "../constants";

const initialState = {
  firstName: '',
  lastName:'',
  address:'',
  email:'',
  password:'',
  isLoggedIn:false,
}

export default function user(state=initialState, action) {
    switch (action.type) {
      case USER_REGISTER:
        return {
          ...state, //state
          data: action.data,
        }
  
        case USER_LOGIN:
          return {
            ...state, //state
          data: action.data,
          }
      default:
          return state
    }
  }