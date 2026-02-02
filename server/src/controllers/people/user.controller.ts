// server/src/controllers/people/user.controller.ts
import { AppError } from "../../utils/AppError";
import redisClient from "../../redisClient";
import { handleAsync } from "../../utils/handleAsync";
import { UserRole } from "../../types/enum/enum";
import { generateTeacherId, normalizeId } from "../../utils";
import mongoose, { Mongoose } from "mongoose";
import { UserRepository } from "../../repositories";

export class UserController {
  private userRepo: UserRepository;

  constructor() {
    this.userRepo = new UserRepository();
  }
  // 1. Method to create a user
  createUser = handleAsync<{}, any, any>(async (req, res) => {
    const role = req.body.role as UserRole;
    const { school, ...rest } = req.body;

    if (!Object.values(UserRole).includes(role)) {
      throw new AppError("Invalid role provided", 400);
    }

    const newUser = await this.userRepo.createUser({
      ...rest,
      role,
      school: normalizeId(school),
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

  // 2. Method to get all users
  getAllUsers = handleAsync(async (_req, res) => {
    const users = await this.userRepo.findAllUsers();
    res.json(users);
  });

  // 3. Method to get a user by ID
  getUserById = handleAsync<{ id: string }>(async (req, res) => {
    const user = await this.userRepo.findUserById(req.params.id);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.status(200).json(user);
  });

  // 4. Method to get a user by email
  updateUser = handleAsync<{ id: string }, any, Partial<any>>(
    async (req, res) => {
      const updatedUser = await this.userRepo.updateUserById(
        req.params.id,
        req.body,
      );
      if (!updatedUser) throw new AppError("User not found", 404);

      await redisClient.del(`user:${req.params.id}`);
      res.json(updatedUser);
    },
  );

  // 5. Method to get all users with role "teacher"
  getAllTeachers = handleAsync(async (_req, res) => {
    const teachers = await this.userRepo.findAllTeachers();
    res.status(200).json(teachers);
  });

// 6. Method to get all users with role "teacher" (with pagination, search, sorting)
getTeachers = handleAsync(async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const search = (req.query.search as string) || "";
  const sort = (req.query.sort as string) === "desc" ? -1 : 1;

  const result = await this.userRepo.findTeachersPaginated({
    page,
    limit,
    search,
    sort,
  });

  res.status(200).json(result);
});



  // 7. Method to delete a user by ID
  deleteUser = handleAsync<{ id: string }>(async (req, res) => {
    const deletedUser = await this.userRepo.deleteUserById(req.params.id);
    if (!deletedUser) throw new AppError("User not found", 404);

    await redisClient.del(`user:${req.params.id}`);
    res.status(204).send();
  });

  // 8. Method to delete all users
  deleteAllUsers = handleAsync(async (_req, res) => {
    await this.userRepo.deleteAllUsers();
    res.status(204).send();
  });

  // 9. Method to count all teachers
countTeachers = handleAsync(async (_req, res) => {
  const count = await this.userRepo.countTeachers();
  res.status(200).json({ count });
});

}
