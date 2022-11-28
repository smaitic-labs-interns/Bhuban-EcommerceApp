const express = require("express");
const router = express.Router();
router.use(express.json());
const Service = require("../service/allService");

const get_all_user = async (req, resp) => {
  try {
    const res = await Service.user.get_all_users();
    resp.status(200).send(res);
  } catch (err) {
    resp.status(400).send(err.message);
  }
};

const get_limited_user = async (req, resp) => {
  try {
    const page = req.query.page;
    const limit = req.query.limit;
    const res = await Service.user.get_limited_users({ page, limit });
    resp.status(200).send(res);
  } catch (err) {
    resp.status(400).send(err.message);
  }
};

const user_register = async (req, resp) => {
  try {
    const data = req.body;
    const res = await Service.user.user_register(
      data.firstName,
      data.middleName,
      data.lastName,
      data.address,
      data.email,
      data.password
    );
    resp.status(200).send(res);
  } catch (err) {
    resp.status(400).send(err.message);
  }
};

const user_login = async (req, resp) => {
  try {
    const data = req.body;
    console.log(req.headers);
    const res = await Service.user.user_signin(data.email, data.password);
    resp.status(200).send(res);
  } catch (err) {
    resp.status(400).send(err.message);
  }
};

module.exports = {
  get_all_user,
  get_limited_user,
  user_register,
  user_login,
};
