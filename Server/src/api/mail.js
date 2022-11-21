const express = require("express");
const router = express.Router();
router.use(express.json());

const Service = require("../service/allService");

const send = async (req, resp) => {
  try {
    const { from, to, subject, text, html } = req.body;
    const res = await Service.mail.send({ from, to, subject, text, html });
    resp.status(200).send(res);
  } catch (err) {
    resp.status(400).send(err.message);
  }
};

module.exports = { send };
