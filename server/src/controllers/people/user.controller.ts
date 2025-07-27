// server/src/controllers/people/user.controller.ts
import { AppError } from "../../utils/AppError";
import redisClient from "../../redisClient";
import { handleAsync } from "../../utils/handleAsync";
import { UserRole} from "../../types/enum/enum";
import { generateTeacherId, normalizeSchoolId } from "../../utils";
import mongoose, { Mongoose } from "mongoose";
import { UserRepository } from "../../repositories";

export class UserController {
  private userRepo: UserRepository;

  constructor() {
    this.userRepo = new UserRepository();
  }

  createUser = handleAsync<{}, any, any>(async (req, res) => {
    const role = req.body.role as UserRole;
    const { school, ...rest } = req.body;

    if (!Object.values(UserRole).includes(role)) {
      throw new AppError("Invalid role provided", 400);
    }

    const newUser = await this.userRepo.createUser({
      ...rest,
      role,
      school:normalizeSchoolId(school)
    });

      // Handle teacher-specific fields
    if (role === UserRole.TEACHER) {
      rest.teacherId = generateTeacherId(); 
    }
    // Assign class only if isClassTeacher is true
    if (
  rest.isClassTeacher &&
  rest.assignedClass &&
  mongoose.Types.ObjectId.isValid(rest.assignedClass)
) {
  rest.assignedClass = new mongoose.Types.ObjectId(rest.assignedClass);
} else if (rest.isClassTeacher && rest.assignedClass) {
  throw new AppError("Invalid assignedClass ObjectId", 400);
}
    res.status(201).json(newUser);
  });

  getAllUsers = handleAsync(async (_req, res) => {
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

  updateUser = handleAsync<{ id: string }, any, Partial<any>>(
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

  deleteUser = handleAsync<{ id: string }>(async (req, res) => {
    const deletedUser = await this.userRepo.deleteUserById(req.params.id);
    if (!deletedUser) throw new AppError("User not found", 404);

    await redisClient.del(`user:${req.params.id}`);
    res.status(204).send();
  });

  deleteAllUsers = handleAsync(async (_req, res) => {
    await this.userRepo.deleteAllUsers();
    res.status(204).send();
  });
}
