//src/controllers/users.controller.ts
import { Request, Response, NextFunction } from "express";
import { UserRepository } from "../repositories/user.repository";
import { AppError } from "../utils/AppError";


const userRepo = new UserRepository();

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newUser = await userRepo.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userRepo.findAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userRepo.findUserById(req.params.id);
    if (!user) throw new AppError("User not found", 404);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedUser = await userRepo.updateUserById(req.params.id, req.body);
    if (!updatedUser) throw new AppError("User not found", 404);
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deletedUser = await userRepo.deleteUserById(req.params.id);
    if (!deletedUser) throw new AppError("User not found", 404);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
