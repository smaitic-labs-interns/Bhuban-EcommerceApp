const express = require("express");
const router = express.Router();
router.use(express.json());
const Service = require("../service/allService");
const logger = require("../logger")("user");

const get_all_user = async (req, resp) => {
  try {
    const res = await Service.user.get_all_users();
    logger.log("info", "Sucessfully fetched all users");
    resp.status(200).send(res);
  } catch (err) {
    logger.error("error", err);
    resp.status(400).send(err.message);
  }
};

const get_one_user = async (req, resp) => {
  try {
    const userId = req.query.id;
    const res = await Service.user.get_user_by_id(userId);
    logger.log("info", `Sucessfully fetched user on ID: ${userId}`);
    resp.status(200).send(res);
  } catch (err) {
    logger.error("error", err);
    resp.status(400).send(err.message);
  }
};

const get_limited_user = async (req, resp) => {
  try {
    const page = req.query.page;
    const limit = req.query.limit;
    const res = await Service.user.get_limited_users({ page, limit });
    logger.log("info", `Sucessfully fetched ${limit} users for page ${page}`);
    resp.status(200).send(res);
  } catch (err) {
    logger.error("error", err);
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
    logger.log("info", "User registered Sucessfully");
    resp.status(200).send(res);
  } catch (err) {
    logger.error("error", err);
    resp.status(400).send(err.message);
  }
};

const update_user = async (req, resp) => {
  try {
    const userId = req.query.userId;
    const updatedBy = req.query.updatedBy;
    const data = req.body;
    const res = await Service.user.update_user(
      userId,
      data.firstName,
      data.middleName,
      data.lastName,
      data.address,
      updatedBy
    );
    logger.log("info", `User details Updated Sucessfully for ID: ${userId}`);
    resp.status(200).send(res);
  } catch (err) {
    logger.error("error", err);
    resp.status(400).send(err.message);
  }
};

const user_login = async (req, resp) => {
  try {
    const data = req.body;
    const res = await Service.user.user_signin(data.email, data.password);
    logger.log("info", `User: ${data.email} login Sucessfully`);
    resp.status(200).send(res);
  } catch (err) {
    logger.error("error", err);
    resp.status(400).send(err.message);
  }
};

const remove_user_by_id = async (req, resp) => {
  try {
    const userId = req.query.id;
    const res = await Service.user.remove_user_by_id(userId);
    logger.log("info", `User Removed Sucessfully presented on ID: ${userId}`);
    resp.status(200).send(res);
  } catch (err) {
    logger.error("error", err);
    resp.status(400).send(err.message);
  }
};

const update_user_role = async (req, resp) => {
  try {
    const userId = req.query.id;
    const role = req.query.role;
    const updatedBy = req.query.role;
    const res = await Service.user.update_user_role(userId, role, updatedBy);
    logger.log(
      "info",
      `User Role Updated Sucessfully presented on ID: ${userId}`
    );
    resp.status(200).send(res);
  } catch (err) {
    logger.error("error", err);
    resp.status(400).send(err.message);
  }
};

module.exports = {
  get_all_user,
  get_one_user,
  get_limited_user,
  user_register,
  update_user,
  user_login,
  remove_user_by_id,
  update_user_role,
};
