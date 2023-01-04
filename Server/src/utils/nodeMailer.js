const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const send = async ({ from, to, subject, text, html }) => {
  try {
    const res = await transporter.sendMail({
      from: from,
      to: to,
      subject: subject,
      text: text,
      html: html,
    });
    if (res?.response?.includes("OK")) {
      return true;
    }
    throw new Error("Error occur sending mail");
  } catch (err) {
    throw err;
  }
};

module.exports = { send };
