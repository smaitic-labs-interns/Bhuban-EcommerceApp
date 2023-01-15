import * as EmailTemplate from './constants/emailTemplate';
import { prepareTemplateMsg } from './templateService';
import axiosInstance from 'modules/api';
import { mail } from 'api/endpoint';

const sendEmail = async (template, to_email, to_name, data, table = {}) => {
  try {
    template = { ...template };
    if (!template.to_email) {
      template.to_email = to_email;
    }
    if (!template.to_name && to_name) {
      template.to_name = to_name;
    }

    let msg = prepareTemplateMsg(template, data, table);
    const payload = {
      from: msg?.from_email,
      to: to_email,
      subject: msg?.subject,
      text: msg?.text,
      html: msg?.content,
    };

    return await axiosInstance({ endpoints: mail.send, data: payload });
  } catch (err) {
    return err;
  }
};

export const sendRegisterationVerificationEmail = async (to, name) => {
  return await sendEmail(EmailTemplate.VERIFY_REGISTRATION_EMAIL, to, name, {
    fname: name.split(' ')[0],
  });
};

export const sendOrderDetailsEmail = async (to, name, table) => {
  return await sendEmail(EmailTemplate.ORDER_DETAILS_EMAIL, to, name, {
    fname: name.split(' ')[0],
    table,
  });
};

export const sendOrderUpdatesEmail = async (to, name, order_status) => {
  return await sendEmail(
    EmailTemplate.ORDER_UPDATES_EMAIL,
    to,
    name,
    {
      fname: name.split(' ')[0],
    },
    order_status,
  );
};

export const sendShipmentUpdatesEmail = async (to, name, shipment_type, shipment_status) => {
  return await sendEmail(EmailTemplate.SHIPMENT_UPDATES_EMAIL, to, name, {
    fname: name.split(' ')[0],
    shipment_type,
    shipment_status,
  });
};
