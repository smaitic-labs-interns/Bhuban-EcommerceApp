const { createLogger, format, transports, level } = require("winston");
const { combine, timestamp, label, json, printf } = format;

// const myFormat = printf(({ level, message, label, timestamp }) => {
//   return `${timestamp} [${label}] ${level}: ${message}`;
// });

const logger = createLogger({
  transports: [
    new transports.File({
      filename: "./src/logs/product/info.log",
      level: "info",
      format: combine(label({ label: "Product label" }), timestamp(), json()),
    }),
    new transports.File({
      filename: "./src/logs/product/error.log",
      level: "error",
      format: combine(timestamp(), json()),
    }),
  ],
});

module.exports = { logger };
