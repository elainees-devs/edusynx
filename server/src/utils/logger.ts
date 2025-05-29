//src/utils/logger.ts
import winston, { Logger } from 'winston';
import moment from 'moment-timezone';

const logger: Logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({
      format: (): string => moment().tz('Africa/Nairobi').format('YYYY-MM-DD HH:mm:ss'),
    }),
    winston.format.printf(({ timestamp, level, message }): string => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
  ],
});

export default logger;
