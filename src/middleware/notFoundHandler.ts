import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import ApiError from "./ApiError";

const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Resource not found"));
};

export default notFoundHandler;
