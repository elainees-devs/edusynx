// server/src/middlewares/validateObjectId.ts
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { AppError } from "../utils/AppError";

export const validateObjectId = (paramName: string) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const id = req.params[paramName];
    if (!mongoose.isValidObjectId(id)) {
      throw new AppError(`Invalid ${paramName}: ${id}`, 400);
    }
    next();
  };
};
