//server/src/middlewares/error.middleware.ts
import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.error(`${req.method} ${req.url} - ${err.message}\n${err.stack}`);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
}
