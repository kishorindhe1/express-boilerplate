import { Response } from 'express';

export const sendResponse = (
  res: Response,
  status: number,
  message: string,
  data: any = null,
  success: boolean = true,
  details: any = null,
) => {
  return res.status(status).json({
    success,
    status,
    message,
    data,
    details,
  });
};
