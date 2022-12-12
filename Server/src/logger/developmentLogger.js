const { createLogger, format, transports } = require("winston");
const { combine, timestamp, colorize, printf } = format;

const developmentLogger = (filename) => {
  const myFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}]: ${filename}   ${message}`;
  });

  const timezoned = () => {
    return new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kathmandu",
    });
  };

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
