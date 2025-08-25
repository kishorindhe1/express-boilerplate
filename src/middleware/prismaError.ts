import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import httpStatus from 'http-status';
import ApiError from './ApiError';

export const handlePrismaError = (error: any) => {
  if (error instanceof PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002': // Unique constraint
        return new ApiError(
          httpStatus.CONFLICT,
          `Duplicate value for field(s): ${error.meta?.target}`,
          error.meta,
        );

      case 'P2025': // Record not found
        return new ApiError(httpStatus.NOT_FOUND, `Record not found`, error.meta);

      default:
        return new ApiError(httpStatus.BAD_REQUEST, `Database error: ${error.message}`, error.meta);
    }
  }

  return new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Unexpected database error', error);
};
