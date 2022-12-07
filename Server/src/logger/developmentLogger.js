const { createLogger, format, transports } = require("winston");
const { combine, timestamp, colorize, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]  ${message}`;
});

const developmentLogger = (filename) => {
  return createLogger({
    level: "info",
    format: combine(
      colorize(),
      timestamp({ format: "YYYY/MM/DD HH:MM:SS" }),
      myFormat
    ),
    // defaultMeta: { service: "user-service" },
    transports: [
      new transports.File({
        filename: `./src/logs/development/ ${filename}.log`,
      }),
    ],
  });
};

module.exports = developmentLogger;
