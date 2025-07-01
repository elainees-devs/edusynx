// server/src/middlewares/validate.ts
import { ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

export const validate =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    logger.info("Incoming body payload:", req.body);

    const result = schema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        message: "Validation failed",
        issues: result.error.errors,
      });
      return;
    }

    req.body = result.data;
    next();
  };
