// src/middlewares/sanitizeHeaders.ts
import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";

export function sanitizeHeaders(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const ipHeader = req.headers["x-forwarded-for"];
  const userAgent = req.headers["user-agent"];

  if (!ipHeader) {
    return next(new AppError("Missing x-forwarded-for header", 400));
  }

  if (userAgent && typeof userAgent === "string") {
    // trim user-agent to max 256 chars
    req.headers["user-agent"] = userAgent.trim().slice(0, 256);
  }

  next();
}
