// src/repositories/user.repository.ts
import { CreateUserDTO } from "../dto/entity.dto";
import { User } from "../models/user.model";
import { IBaseUser } from "../types/people/user.types";

export class UserRepository {
  async createUser(userData: CreateUserDTO): Promise<IBaseUser> {
    const user = new User(userData);
    return await user.save();
  }

  async updateUserById(
    id: string,
    updates: Partial<IBaseUser>
  ): Promise<IBaseUser | null> {
    return await User.findByIdAndUpdate(id, updates, { new: true }).exec();
  }

  async findUserById(id: string): Promise<IBaseUser | null> {
    return await User.findById(id).populate("school", "name").exec();
  }

  async findAllUsers(): Promise<IBaseUser[]> {
    return await User.find().populate("school", "name").exec();
  }

  async deleteUserById(id: string): Promise<IBaseUser | null> {
    return await User.findByIdAndDelete(id).exec();
  }

  async deleteAllUsers(): Promise<void> {
    await User.deleteMany({}).exec();
  }
}
