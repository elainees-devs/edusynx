// src/controllers/users.controller.ts
import { Request, Response, NextFunction } from "express";
import { UserRepository } from "../repositories/user.repository";
import { AppError } from "../utils/AppError";

export class UserController {
  private userRepo: UserRepository;

  constructor() {
    this.userRepo = new UserRepository();
  }

  createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newUser = await this.userRepo.createUser(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  };

  getAllUsers = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this.userRepo.findAllUsers();
      res.json(users);
    } catch (error) {
      next(error);
    }
  };

  getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.userRepo.findUserById(req.params.id);
      if (!user) throw new AppError("User not found", 404);
      res.json(user);
    } catch (error) {
      next(error);
    }
  };

  updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updatedUser = await this.userRepo.updateUserById(req.params.id, req.body);
      if (!updatedUser) throw new AppError("User not found", 404);
      res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  };

  deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deletedUser = await this.userRepo.deleteUserById(req.params.id);
      if (!deletedUser) throw new AppError("User not found", 404);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
