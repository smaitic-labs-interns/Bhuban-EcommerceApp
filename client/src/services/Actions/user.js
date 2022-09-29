import { USER_REGISTER, USER_LOGIN } from "../constants";
import { axios_instance } from "../../api/config/config";
import { user } from "../../api/config/api-endpoints";

export const user_register = async (data) => {
  
  return async(dispatch)=>{
    const payload = {firstName:data.firstName, middleName:data.middleName, lastName:data.lastName, address:data.address, email: data.email, password: data.password };
    const res = await axios_instance({ endpoints: user.login, data: payload });
    await dispatch({
    type: USER_REGISTER,
    data: res,
  })}
  // try {
  //   console.log(data);
  //   const payload = {firstName:data.firstName, middleName:data.middleName, lastName:data.lastName, address:data.address, email: data.email, password: data.password };
  //   const res = await axios_instance({ endpoints: user.login, data: payload });
  //   // return{
  //   //   type: USER_REGISTER,
  //   //   data: res,
  //   // };
  //   return async(dispatch)=>{dispatch({
  //     type: USER_REGISTER,
  //     data: res,
  //   })}
  // } catch (err) {
  //   return {
  //       type: "ERROR",
  //       data: err,
  //     };
  // }
};

export const user_login = (data) => {
  return {
    type: USER_LOGIN,
    data: data,
  };
};
