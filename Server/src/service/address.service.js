const Store = require("../repository/dbRepository");

const read_all_countries = async () => {
  try {
    const countries = await Store.extra.read_all_countries();
    if (countries) return countries;
    throw new Error(`Error occurs Fetching Country List.`);
  } catch (err) {
    throw err;
  }
};

const read_all_states = async () => {
  try {
    const states = await Store.extra.read_all_states();
    if (states) return states;
    throw new Error(`Error occurs Fetching states List.`);
  } catch (err) {
    throw err;
  }
};

const read_all_districts = async () => {
  try {
    const districts = await Store.extra.read_all_districts();
    if (districts) return districts;
    throw new Error(`Error occurs Fetching districts List.`);
  } catch (err) {
    throw err;
  }
};

const read_states_by_country_id = async (countryId) => {
  try {
    const states = await Store.extra.read_states_by_country_id(countryId);
    if (states) return states;
    throw new Error(`Error occurs Fetching states List on Id: ${countryId}`);
  } catch (err) {
    throw err;
  }
};

const read_districts_by_state_id = async (stateId) => {
  try {
    const districts = await Store.extra.read_districts_by_state_id(stateId);
    if (districts) return districts;
    throw new Error(`Error occurs Fetching districts List on Id: ${stateId}.`);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  read_all_countries,
  read_all_states,
  read_all_districts,
  read_states_by_country_id,
  read_districts_by_state_id,
};
