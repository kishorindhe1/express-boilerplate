import ApiError from './api-error.middleware';
import errorHandler from './error-handler.middlware';
import jwtMiddleware from './jwt.middlware';
import notFoundHandler from './not-found-handler.middleware';
import { handlePrismaError as prismaErrorHandler } from './prisma-error-handler.middleware';
import { authLimiter, generalLimiter, uploadLimiter } from './rate-limiter';
import requestLogger from './request-logger.middleware';
import { securityMiddleware } from './security.middlware';
import validateResource from './validate-resourse.middleware';
export {
  ApiError,
  authLimiter,
  errorHandler,
  generalLimiter,
  jwtMiddleware,
  notFoundHandler,
  prismaErrorHandler,
  requestLogger,
  securityMiddleware,
  uploadLimiter,
  validateResource,
};
