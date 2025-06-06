//src/controllers/login.controller.ts
import { Request, Response, NextFunction } from "express";
import { LoginRepository } from "../repositories/login.repository";
import { AppError } from "../utils/AppError";

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password} = req.body;

    if (!email || !password) {
      throw new AppError("Email and password are required", 400);
    }

    const result = await LoginRepository.login(email, password);

    if (!result.token) {
      throw new AppError(result.message || "Invalid credentials", 401);
    }

    res.status(200).json({ token: result.token, message: result.message });
  } catch (error) {
    next(error);
  }
};

