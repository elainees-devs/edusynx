// src/controllers/users.controller.ts
import { Request, Response, NextFunction } from "express";
import { UserRepository } from "../repositories/user.repository";
import { AppError } from "../utils/AppError";
import redisClient from "../redisClient";
import { createUserSchema } from "../validation/user.schema";
import mongoose from "mongoose";
import type { z } from "zod";
import { handleAsync } from "../utils/handleAsync";

export class UserController {
  private userRepo: UserRepository;

  constructor() {
    this.userRepo = new UserRepository();
  }

  createUser = handleAsync<{}, any, z.infer<typeof createUserSchema>>(
    async (req, res) => {
      const { school, ...rest } = req.body;
      const newUser = await this.userRepo.createUser({
        ...rest,
        school:
          typeof school === "string"
            ? new mongoose.Types.ObjectId(school)
            : school,
      });
      res.status(201).json(newUser);
    }
  );

  getAllUsers =handleAsync(async (_req, res) => {
    const users = await this.userRepo.findAllUsers();
    res.json(users);
  });

  getUserById = handleAsync<{ id: string }>(async (req, res) => {
    const user = await this.userRepo.findUserById(req.params.id);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.status(200).json(user);
  });

  updateUser =handleAsync<{ id: string }, any, Partial<any>>(
    async (req, res) => {
      const updatedUser = await this.userRepo.updateUserById(
        req.params.id,
        req.body
      );
      if (!updatedUser) throw new AppError("User not found", 404);

      await redisClient.del(`user:${req.params.id}`);
      res.json(updatedUser);
    }
  );

  deleteUser =handleAsync<{ id: string }>(async (req, res) => {
    const deletedUser = await this.userRepo.deleteUserById(req.params.id);
    if (!deletedUser) throw new AppError("User not found", 404);

    await redisClient.del(`user:${req.params.id}`);
    res.status(204).send();
  });
}
