// src/controllers/users.controller.ts
import { Request, Response, NextFunction } from "express";
import { UserRepository } from "../repositories/user.repository";
import { AppError } from "../utils/AppError";
import redisClient from "../redisClient";
import { createUserSchema } from "../validation/user.schema";
import type { z } from "zod";

export class UserController {
  private userRepo: UserRepository;

  constructor() {
    this.userRepo = new UserRepository();
  }

  createUser = async (
    req: Request<{}, {}, z.infer<typeof createUserSchema>>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { school, ...rest } = req.body;
      const newUser = await this.userRepo.createUser({
        ...rest,
        school:
          typeof school === "string"
            ? new (require("mongoose").Types.ObjectId)(school)
            : school,
      });
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

  getUserById = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const user = await this.userRepo.findUserById(id);

      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };

  updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updatedUser = await this.userRepo.updateUserById(
        req.params.id,
        req.body
      );
      if (!updatedUser) throw new AppError("User not found", 404);

      await redisClient.del(`user:${req.params.id}`);
      res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  };

  deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deletedUser = await this.userRepo.deleteUserById(req.params.id);
      if (!deletedUser) throw new AppError("User not found", 404);

      await redisClient.del(`user:${req.params.id}`);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
