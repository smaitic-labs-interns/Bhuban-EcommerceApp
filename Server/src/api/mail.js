const express = require("express");
const router = express.Router();
router.use(express.json());
const logger = require("../logger")("mail");

const Service = require("../service/allService");

const send = async (req, resp) => {
  try {
    const { from, to, subject, text, html } = req.body;
    const res = await Service.mail.send({ from, to, subject, text, html });
    logger.log("info", `Mail sent sucessfully to ${to}`);
    resp.status(200).send(res);
  } catch (err) {
    logger.error("error", err);
    resp.status(400).send(err.message);
  }
};

module.exports = { send };
