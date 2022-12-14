const { createLogger, format, transports } = require("winston");
const { combine, timestamp, colorize, printf, errors } = format;

const localLogger = (filename) => {
  const myFormat = printf(({ level, stack, message, timestamp }) => {
    return `[${level}] ${filename}: ${timestamp}  ${stack || message}`;
  });

  const timezoned = () => {
    return new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kathmandu",
    });
  };

  return createLogger({
    level: "debug",
    format: combine(
      colorize(),
      timestamp({ format: timezoned }),
      errors({ stack: true }),
      myFormat
    ),
    transports: [
      new transports.Console(),
      new transports.File({ filename: `./src/logs/local/${filename}.log` }),
    ],
  });
};

module.exports = localLogger;
