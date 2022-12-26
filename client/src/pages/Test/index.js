import React from 'react';
import { Button } from '@mui/material';
// import { EmailService } from 'mail';
import { VERIFY_REGISTRATION_EMAIL } from 'mail/constants/emailTemplate';

import { useDispatch } from 'react-redux';

import { send_mail } from 'redux/actions/mail.actions';
import Mustache from 'mustache';
import { sendRegisterationVerificationEmail } from 'mail/emailService';

export default function Test() {
  //   console.log(EmailService);
  const dispatch = useDispatch();

  const handleSendMail = async () => {
    const res = await sendRegisterationVerificationEmail('bhuban.temp@gmail.com', 'Bhuban Yadav');
    console.log(res);
    // let from = 'Ecommerce App <Bill Generation>';
    // let to = 'bhuban.temp@gmail.com';
    // let subject = 'Regarding Order Invoice';
    // let text = `Helllllllllllooooooooooo`;
    // let html = Mustache.render(VERIFY_REGISTRATION_EMAIL.content, {
    //   fname: 'Bhhhhhhhhhhhhhhhhhh',
    //   verification_link: 'http://localhost:3000/test',
    // });

    // dispatch(
    //   send_mail({
    //     from: from,
    //     to: to,
    //     subject: subject,
    //     text: text,
    //     html: html,
    //     action: 'send',
    //   }),
    // );
  };

  return (
    <Button
      onClick={() => {
        handleSendMail();
      }}
    >
      Send Mail
    </Button>
  );
}
