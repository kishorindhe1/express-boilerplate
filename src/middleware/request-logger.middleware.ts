import { NextFunction, Request, Response } from 'express';
import { logger } from '../utils';
export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info(`${req.method} ${req.originalUrl} | Status: ${res.statusCode} | ${duration}ms`);
  });

  next();
};
