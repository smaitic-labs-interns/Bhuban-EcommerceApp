import {
  SEND_MAIL_REQUEST,
  SEND_MAIL_SUCCESS,
  SEND_MAIL_FAILED,
} from "../constants/mail.constants";

const sendMailInitialState = {
  status: null,
  message: "",
};

export const send_mail_reducer = (
  state = sendMailInitialState,
  { type, payload }
) => {
  switch (type) {
    case SEND_MAIL_REQUEST:
      return { ...state, status: null };
    case SEND_MAIL_SUCCESS:
      return {
        ...state,
        message: payload,
        status: "success",
      };
    case SEND_MAIL_FAILED:
      return {
        ...state,
        status: "failed",
        message: payload,
      };
    default:
      return state;
  }
};
