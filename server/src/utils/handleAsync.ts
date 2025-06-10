//src/utils/handleAsync.ts
import { Request, Response, NextFunction } from "express";
import type { ParamsDictionary } from "express-serve-static-core";

// Generic async wrapper that preserves types
export const handleAsync = <
  P extends ParamsDictionary = ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = any
>(
  fn: (
    req: Request<P, ResBody, ReqBody, ReqQuery>,
    res: Response<ResBody>,
    next: NextFunction
  ) => Promise<any>
) => {
  return (
    req: Request<P, ResBody, ReqBody, ReqQuery>,
    res: Response<ResBody>,
    next: NextFunction
  ) => {
    fn(req, res, next).catch(next);
  };
};