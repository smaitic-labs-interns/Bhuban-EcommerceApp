const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf, errors } = format;

const productionLogger = (filename) => {
  const myFormat = printf(({ level, stack, message, timestamp }) => {
    return `[${level}] ${filename}: ${timestamp} ${stack || message}`;
  });

  const timezoned = () => {
    return new Date().toISOString();
  };

  return createLogger({
    level: "error",
    format: combine(
      timestamp({ format: timezoned }),
      myFormat,
      errors({ stack: true })
    ),
    transports: [
      new transports.Console(),
      new transports.File({
        filename: `./src/logs/production/${filename}.log`,
      }),
    ],
  });
};

module.exports = productionLogger;
