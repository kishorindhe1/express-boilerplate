import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import ApiError from './api-error.middleware';

const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Resource not found'));
};

export default notFoundHandler;
