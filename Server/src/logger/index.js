const localLogger = require("./localLogger");
const productionLogger = require("./productionLogger");
const developmentLogger = require("./developmentLogger");

const logger = (filename) => {
  switch (process.env.NODE_ENV) {
    case "production":
      return productionLogger(filename || "production");

    case "development":
      return developmentLogger(filename || "development");

    case "local":
      return localLogger(filename || "local");

    default:
      return localLogger(filename || "local");
  }
};

module.exports = logger;
