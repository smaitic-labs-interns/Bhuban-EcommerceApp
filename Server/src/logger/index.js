const localLogger = require("./localLogger");
const productionLogger = require("./productionLogger");
const developmentLogger = require("./developmentLogger");

const logger = (filename) => {
  if (process.env.NODE_ENV === "production") {
    return productionLogger(filename || "production");
  } else if (process.env.NODE_ENV === "development") {
    return developmentLogger(filename || "development");
  } else if (process.env.NODE_ENV === "local") {
    return localLogger(filename || "local");
  } else {
    return localLogger(filename || "local");
  }
};

module.exports = logger;
