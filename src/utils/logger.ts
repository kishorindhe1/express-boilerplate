import path from 'path';
import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

// Define log format
const logFormat = format.printf(({ level, message, timestamp }) => {
  return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
});

// Log directory (logs will rotate daily)
const logDir = path.join(__dirname, '../../logs');

const dailyRotateFileTransport = new DailyRotateFile({
  dirname: logDir,
  filename: 'app-%DATE%.log', // logs/app-2025-08-22.log
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d', // keep logs for 14 days
});

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.splat(),
    logFormat,
  ),
  transports: [
    new transports.Console({
      format: format.combine(format.colorize(), logFormat),
    }),
    dailyRotateFileTransport,
  ],
});

export default logger;
