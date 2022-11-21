const mail = require("../utils/nodeMailer");

const send = async ({ from, to, subject, text, html }) => {
  try {
    const res = mail.send({ from, to, subject, text, html });
    if (res) return "Mail sent sucessfuly";
    throw new Error("Error occurs sending mail try again later");
  } catch (err) {
    throw err;
  }
};

module.exports = { send };
