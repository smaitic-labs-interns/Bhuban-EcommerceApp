// Read CSV FILEs
const fs = require("fs");
const { parse } = require("csv-parse");
const { read_data, write_data } = require("./fileUtils");

const { Client } = require("pg");
const e = require("express");
require("dotenv").config();

const PGHOST = "localhost";
const PGUSER = "postgres";
const PGDATABASE = "eCommerceApp";
const PGPASSWORD = "toor";
const PGPORT = 5432;

const client = new Client({
  host: PGHOST,
  user: PGUSER,
  database: PGDATABASE,
  password: PGPASSWORD,
  port: PGPORT,
});
client.connect((err) => {
  if (err) console.log(err);
  console.log("Connected Sucessfull");
});

const con = client;

const add_country = async () => {
  try {
    const actualData = await read_data("./final_world_data.json");
    let idx = 0;
    for (let dta of actualData) {
      const result = await con.query(
        "INSERT INTO countries (name, capital, cc_iso2, cc_iso3) VALUES ($1, $2, $3, $4)",
        [dta.country, dta.capital, dta.cc_iso2, dta.cc_iso3]
      );
      idx++;
      if (result.rowCount > 0) console.log(`Inserted: ${idx}`);
    }
    console.log("All Done !");
  } catch (err) {
    console.log(err);
  }
};

// add_country();

const add_states = async () => {
  try {
    const actualData = await read_data("./final_province.json");
    let idx = 0;
    for (let dta of actualData) {
      const result = await con.query(
        "INSERT INTO states (name, countryId) VALUES ($1, $2)",
        [dta.province_en, 145]
      );
      idx++;
      if (result.rowCount > 0) console.log(`Inserted: ${idx}`);
    }
    console.log("All Done !");
  } catch (err) {
    console.log(err);
  }
};

// add_states();

const add_districts = async () => {
  try {
    const actualData = await read_data("./final_province.json");
    let idx = 0;
    for (let dta of actualData) {
      for (let dis of dta.districts) {
        const result = await con.query(
          "INSERT INTO districts (name, stateId) VALUES ($1, $2)",
          [dis.district_en, dta.id]
        );
        idx++;
        if (result.rowCount > 0) console.log(`Inserted: ${idx}`);
      }
    }
    console.log("All Done !");
  } catch (err) {
    console.log(err);
  }
};

// add_districts();

const log_country = async () => {
  try {
    const actualData = await read_data("./final_world_data.json");
    let idx = 1;
    let str = "";
    for (let dta of actualData) {
      str += `(${idx}, '${dta.country}', '${dta.capital}', '${dta.cc_iso2}', '${dta.cc_iso3}'),\n`;
      idx++;
    }
    console.log(str);
    await write_data("./all_countries.txt", str);

    // console.log("All Done !");
  } catch (err) {
    console.log(err);
  }
};

// log_country();

const log_states = async () => {
  try {
    const actualData = await read_data("./final_province.json");
    let idx = 1;
    let str = "";
    for (let dta of actualData) {
      str += `(${idx}, '${dta.province_en}' , ${145}),\n`;
      idx++;
    }
    console.log(str);
    console.log("All Done !");
  } catch (err) {
    console.log(err);
  }
};

// log_states();

const log_districts = async () => {
  try {
    const actualData = await read_data("./final_province.json");
    let idx = 1;
    let str = "";
    for (let dta of actualData) {
      for (let dis of dta.districts) {
        str += `(${idx}, '${dis.district_en}' , ${dta.id}),\n`;
        idx++;
      }
    }
    console.log(str);
    console.log("All Done !");
  } catch (err) {
    console.log(err);
  }
};

log_districts();
