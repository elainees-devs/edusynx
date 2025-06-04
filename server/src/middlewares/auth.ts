//src/middlewares/auth.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IGuardianUser } from "../types/people/user.types";
import { GuardianModel } from "../models";

export const authenticateGuardian = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    const guardian = await GuardianModel.findById(decoded.id).populate("school") as IGuardianUser;

    if (!guardian) return res.status(401).json({ message: "Guardian not found" });

    req.user = guardian;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
