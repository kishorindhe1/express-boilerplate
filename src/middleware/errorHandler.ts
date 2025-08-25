import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { ZodError } from 'zod';
import { logger, sendResponse } from '../utils';
import ApiError from './ApiError';

const errorHandler = (
  err: Error | ApiError | ZodError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let status: number = httpStatus.INTERNAL_SERVER_ERROR;
  let message: string = err.message || (httpStatus[status as keyof typeof httpStatus] as string);

  let details: any;

  if (err instanceof ApiError) {
    status = err.status;
    message = err.message;
    details = err.details;
  } else if (err instanceof ZodError) {
    status = httpStatus.BAD_REQUEST;
    message = 'Validation Error';
    details = err.errors.map((e) => ({
      field: e.path.join('.'),
      message: e.message,
    }));
  }

  if (process.env.NODE_ENV !== 'production') {
    console.error('Error stack:', err.stack);
  }

  // Log error details with stack
  logger.error(`Error: ${err.message} | Status: ${status} | Stack: ${err.stack || 'No stack'}`);
  return sendResponse(res, status, message, null, false, details);
};

export default errorHandler;
