import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { sendResponse } from '../../../utils';
import { authService } from './auth.service';

const addUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await authService.addUser(req.body);
    sendResponse(res, httpStatus.CREATED, 'User added successfully', result);
  } catch (err: unknown) {
    if (err instanceof Error) {
      next(err);
    } else {
      next(new Error('An unknown error occurred'));
    }
  }
};
const signIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await authService.signIn(req.body);
    sendResponse(res, httpStatus.OK, 'Login successfully', result);
  } catch (err: unknown) {
    if (err instanceof Error) {
      next(err);
    } else {
      next(new Error('An unknown error occurred'));
    }
  }
};
export const authController = {
  addUser,
  signIn,
};
