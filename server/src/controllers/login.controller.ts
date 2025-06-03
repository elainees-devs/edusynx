// src/controllers/login.controller.ts
import { Request, Response, NextFunction } from "express";
import { LoginRepository } from "../repositories/login.repository";

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, hashedpassword } = req.body;
    const result = await LoginRepository.login(email, hashedpassword);

    if (!result.token) {
      return res.status(401).json({ message: result.message });
    }

    res.status(200).json({ token: result.token, message: result.message });
  } catch (error) {
    next(error);
  }
};
