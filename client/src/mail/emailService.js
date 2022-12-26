import * as EmailTemplate from './constants/emailTemplate';
import { prepareTemplateMsg } from './templateService';
import axiosInstance from 'modules/api';
import { mail } from 'api/endpoint';

const prepareEmailPayload = (msg, attachments) => {
  let fromObj = {
    email: msg.from_email,
  };
  if (msg.from_name) {
    fromObj.name = msg.from_name;
  }

  let toObj = { email: msg.to_email };
  if (msg.to_name) {
    toObj.name = msg.to_name;
  }
  let personalizations = [
    {
      to: [{ ...toObj }],
    },
  ];
  if (msg.bcc_email) {
    personalizations[0].bcc = [
      {
        email: msg.bcc_email,
      },
    ];
  }
  if (msg.cc_email && msg.cc_email.toLowerCase() !== msg.to_email.toLowerCase()) {
    personalizations[0].cc = [
      {
        email: msg.cc_email,
      },
    ];
  }

  let emailPayload = {
    from: fromObj,
    subject: msg.subject,
    content: [{ type: 'text/html', value: msg.content }],
    personalizations,
  };

  if (Array.isArray(attachments) && attachments.length > 0) {
    emailPayload.attachments = attachments;
  }
  if (msg.reply_to_email) {
    emailPayload.reply_to = {
      email: msg.reply_to_email,
      name: msg.reply_to_name || '',
    };
  }

  return emailPayload;
};

const sendEmail = async (template, to_email, to_name, data) => {
  try {
    template = { ...template };
    if (!template.to_email) {
      template.to_email = to_email;
    }
    if (!template.to_name && to_name) {
      template.to_name = to_name;
    }

    let msg = prepareTemplateMsg(template, data);
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
