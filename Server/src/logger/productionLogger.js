const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf, errors } = format;

const myFormat = printf(({ level, stack, message, timestamp }) => {
  return `[${level}] ${timestamp} ${stack || message}`;
});

const timezoned = () => {
  return new Date().toISOString();
};

const productionLogger = (filename) => {
  return createLogger({
    level: "error",
    format: combine(
      timestamp({ format: timezoned }),
      myFormat,
      errors({ stack: true })
    ),
    transports: [
      new transports.File({
        filename: `./src/logs/production/${filename}.log`,
      }),
    ],
  });
};

module.exports = productionLogger;
