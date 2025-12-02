/* eslint-disable @typescript-eslint/no-explicit-any */
// src/middlewares/handle-sequelize-error.ts
import {
  UniqueConstraintError,
  ValidationError,
  ForeignKeyConstraintError,
  DatabaseError,
} from 'sequelize';
import httpStatus from 'http-status';
import { ApiError } from './';
import { logger } from '@/utils';

const getFields = (error: any): string[] => {
  if (error.fields) return Object.keys(error.fields);
  if (error.original?.constraint) return [error.original.constraint.replace(/_key$|_uniq$/, '')];
  if (error.parent?.constraint) return [error.parent.constraint.replace(/_key$|_uniq$/, '')];
  return ['unknown'];
};

export const handleSequelizeError = (error: unknown): ApiError => {
  // 1. Duplicate (email, username, etc.)
  if (error instanceof UniqueConstraintError) {
    const fields = getFields(error);
    return new ApiError(httpStatus.CONFLICT, `Duplicate value: ${fields.join(', ')}`, {
      fields,
      type: 'UniqueConstraintError',
    });
  }

  // 2. Validation (null, type, length, etc.)
  if (error instanceof ValidationError) {
    const messages = error.errors.map((e: any) => `${e.path}: ${e.message}`);
    return new ApiError(httpStatus.BAD_REQUEST, `Validation error: ${messages.join('; ')}`, {
      errors: error.errors.map((e: any) => ({ field: e.path, message: e.message })),
      type: 'ValidationError',
    });
  }

  // 3. Foreign key (can't delete user with posts)
  if (error instanceof ForeignKeyConstraintError) {
    return new ApiError(
      httpStatus.CONFLICT,
      `Cannot delete: record is used in "${error.table}" table`,
      { type: 'ForeignKeyConstraint' },
    );
  }

  // 4. General DB error
  if (error instanceof DatabaseError) {
    // In production, hide raw SQL
    const message =
      process.env.NODE_ENV === 'production' ? 'Database operation failed' : error.message;
    return new ApiError(httpStatus.BAD_REQUEST, message, { type: 'DatabaseError' });
  }

  // 5. Custom "not found" errors (from your findOrFail helper)
  if (error instanceof ApiError) {
    return error; // already perfect
  }

  // 6. Fallback
  logger.error('Unhandled DB error:', error);
  return new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Something went wrong with the database');
};
