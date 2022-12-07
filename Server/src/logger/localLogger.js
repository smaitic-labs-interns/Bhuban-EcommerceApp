const { createLogger, format, transports } = require("winston");
const { combine, timestamp, colorize, printf, errors } = format;

const myFormat = printf(({ level, stack, message, timestamp }) => {
  return `[${level}] ${timestamp}  ${stack || message}`;
});

const localLogger = (filename) => {
  return createLogger({
    level: "debug",
    format: combine(
      colorize(),
      timestamp({ format: "YYYY/MM/DD HH:MM:SS" }),
      errors({ stack: true }),
      myFormat
    ),

    // defaultMeta: { service: "user-service" },
    transports: [
      new transports.Console(),
      new transports.File({ filename: `./src/logs/local/${filename}.log` }),
    ],
  });
};

module.exports = localLogger;
