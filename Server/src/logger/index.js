const stagingLogger = require("./stagingLogger");
const productionLogger = require("./productionLogger");
const developmentLogger = require("./developmentLogger");
const localLogger = require("./localLogger");

const logger = (filename) => {
  switch (process.env.NODE_ENV) {
    case "production":
      return productionLogger(filename || "production");

    case "development":
      return developmentLogger(filename || "development");

    case "staging":
      return stagingLogger(filename || "staging");

    default:
      return localLogger(filename || "local");
  }
};

module.exports = logger;

/* Logging Levels:  also log contents lower in number than selectted one
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6
};

*/
