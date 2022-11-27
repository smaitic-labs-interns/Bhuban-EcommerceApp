const express = require("express");
const router = express.Router();
router.use(express.json());

const Service = require("../service/allService");

const read_all_countries = async (req, resp) => {
  try {
    const countries = await Service.extra.read_all_countries();
    resp.status(200).send(countries);
  } catch (err) {
    resp.status(400).send(err.message);
  }
};

const read_all_states = async (req, resp) => {
  try {
    const states = await Service.extra.read_all_states();
    resp.status(200).send(states);
  } catch (err) {
    resp.status(400).send(err.message);
  }
};

const read_all_districts = async (req, resp) => {
  try {
    const districts = await Service.extra.read_all_districts();
    resp.status(200).send(districts);
  } catch (err) {
    resp.status(400).send(err.message);
  }
};

const read_states_by_country_id = async (req, resp) => {
  try {
    const id = req.query.id;
    const states = await Service.extra.read_states_by_country_id(id);
    resp.status(200).send(states);
  } catch (err) {
    resp.status(400).send(err.message);
  }
};

const read_districts_by_state_id = async (req, resp) => {
  try {
    let id = req.query.id;
    const districts = await Service.extra.read_districts_by_state_id(id);
    resp.status(200).send(districts);
  } catch (err) {
    resp.status(400).send(err.message);
  }
};

module.exports = {
  read_all_countries,
  read_all_states,
  read_all_districts,
  read_states_by_country_id,
  read_districts_by_state_id,
};
