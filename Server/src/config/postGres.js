const { Client } = require("pg");
require("dotenv").config();

switch (process.env.NODE_ENV) {
  case "production":
    var config = {
      host: process.env.PGHOST,
      user: process.env.PGUSER,
      database: process.env.PGDATABASE,
      password: process.env.PGPASSWORD,
      port: process.env.PGPORT,
    };
    break;
  case "local":
    var config = {
      host: process.env.PGHOST_LOCAL,
      user: process.env.PGUSER,
      database: process.env.PGDATABASE,
      password: process.env.PGPASSWORD,
      port: process.env.PGPORT,
    };
    break;

  case "test":
    var config = {
      host: process.env.PGHOST_LOCAL,
      user: process.env.PGUSER,
      database: process.env.PG_TEST_DATABASE,
      password: process.env.PGPASSWORD,
      port: process.env.PGPORT,
    };
    break;

  default:
    var config = {
      host: process.env.PGHOST_LOCAL,
      user: process.env.PGUSER,
      database: process.env.PGDATABASE,
      password: process.env.PGPASSWORD,
      port: process.env.PGPORT,
    };
    break;
}

const client = new Client(config);
client.connect((err) => {
  if (err) throw err;
});

module.exports = client;
