import { handleControllerError, sendResponse } from '@/utils';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { authService } from './auth.service';

const addUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await authService.addUser(req.body);
    sendResponse(res, httpStatus.CREATED, 'User added successfully', result);
  } catch (err: unknown) {
    return handleControllerError(err, next);
  }
};
const signIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await authService.signIn(req.body);
    sendResponse(res, httpStatus.OK, 'Login successfully', result);
  } catch (err: unknown) {
    return handleControllerError(err, next);
  }
};
export const authController = {
  addUser,
  signIn,
};
