import {
  SEND_MAIL_REQUEST,
  SEND_MAIL_SUCCESS,
  SEND_MAIL_FAILED,
} from '../constants/mail.constants';

import axiosInstance from 'Modules/api';
import { mail } from 'api/endpoint';

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
      if (action === 'clean') {
        return dispatch({ type: SEND_MAIL_REQUEST });
      }
      dispatch({ type: SEND_MAIL_REQUEST });
      const response = await axiosInstance({
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
