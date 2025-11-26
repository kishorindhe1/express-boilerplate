import { Response } from 'express';

interface ApiResponse<T = unknown> {
  success: boolean;
  status: number;
  message: string;
  data?: T;
  details?: unknown;
}

export const sendResponse = <T = unknown>(
  res: Response,
  status: number,
  message: string,
  data?: T,
  success: boolean = true,
  details?: unknown,
): Response<ApiResponse<T>> => {
  return res.status(status).json({
    success,
    status,
    message,
    data,
    details,
  });
};
