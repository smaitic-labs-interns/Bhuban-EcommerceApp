import {
  SEND_MAIL_REQUEST,
  SEND_MAIL_SUCCESS,
  SEND_MAIL_FAILED,
} from "../constants/mail.constants";

import { axios_instance } from "../../api/config/baseApi";
import { mail } from "../../api/config/api-endpoints";

export const send_mail =
  ({ from, to, subject, text, html, action }) =>
  async (dispatch) => {
    const payload = {
      from,
      to,
      subject,
      text,
      html,
    };
    try {
      if (action === "clean") {
        return dispatch({ type: SEND_MAIL_REQUEST });
      }
      dispatch({ type: SEND_MAIL_REQUEST });
      const response = await axios_instance({
        endpoints: mail.send,
        data: payload,
      });

      dispatch({
        type: SEND_MAIL_SUCCESS,
        payload: response.data,
      });
    } catch (err) {
      dispatch({
        type: SEND_MAIL_FAILED,
        payload: err.response,
      });
    }
  };
