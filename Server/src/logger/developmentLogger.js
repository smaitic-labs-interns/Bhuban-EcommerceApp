const { createLogger, format, transports } = require("winston");
const { combine, timestamp, colorize, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]  ${message}`;
});

const timezoned = () => {
  return new Date().toLocaleString("en-US", {
    timeZone: "Asia/Kathmandu",
  });
};

const developmentLogger = (filename) => {
  return createLogger({
    level: "info",
    format: combine(colorize(), timestamp({ format: timezoned }), myFormat),
    transports: [
      new transports.Console(),
      new transports.File({
        filename: `./src/logs/development/ ${filename}.log`,
      }),
    ],
  });
};

module.exports = developmentLogger;
