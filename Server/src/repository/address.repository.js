const con = require("../config/postGres");

const read_all_countries = async () => {
  try {
    let countries = await con.query("SELECT * FROM countries");
    if (countries.rowCount > 0) return countries.rows;
    throw new Error(`Error occur fetching countries`);
  } catch (err) {
    throw err;
  }
};

const read_all_states = async () => {
  try {
    let states = await con.query("SELECT * FROM states");
    if (states.rowCount > 0) return states.rows;
    throw new Error(`Error occur fetching states`);
  } catch (err) {
    throw err;
  }
};

const read_all_districts = async () => {
  try {
    let districts = await con.query("SELECT * FROM districts");
    if (districts.rowCount > 0) return districts.rows;
    throw new Error(`Error occur fetching districts`);
  } catch (err) {
    throw err;
  }
};

const read_states_by_country_id = async (countryId) => {
  try {
    let states = await con.query("SELECT * FROM states WHERE countryId = $1", [
      countryId,
    ]);
    if (states.rowCount > 0) return states.rows;
    throw new Error(`Error occur fetching states by country Id`);
  } catch (err) {
    throw err;
  }
};

const read_districts_by_state_id = async (stateId) => {
  try {
    let districts = await con.query(
      "SELECT * FROM districts WHERE stateId = $1",
      [stateId]
    );
    if (districts.rowCount > 0) return districts.rows;
    throw new Error(`Error occur fetching districts by state id.`);
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
