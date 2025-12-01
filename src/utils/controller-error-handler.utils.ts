// src/utils/handleControllerError.ts
import { NextFunction } from 'express';
import { handleSequelizeError } from '@/middleware';
import { ApiError } from '@/middleware';

export const handleControllerError = (err: unknown, next: NextFunction) => {
  // Convert Sequelize-related errors
  console.log('Handling controller error:', err);
  const processedError = handleSequelizeError(err);

  if (processedError instanceof ApiError) {
    return next(processedError); // Sequelize / known DB errors
  }

  // Runtime / unknown errors
  return next(err as Error);
};
