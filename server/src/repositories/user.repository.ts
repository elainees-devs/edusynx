// src/repositories/user.repository.ts
import { CreateUserDTO } from "../dto/entity.dto";
import { UserModel } from "../models";
import { IBaseUser } from "../types/people/user.types";

export class UserRepository {
  async createUser(userData: CreateUserDTO): Promise<IBaseUser> {
    const user = new UserModel(userData);
    return await user.save();
  }

  async updateUserById(
    id: string,
    updates: Partial<IBaseUser>
  ): Promise<IBaseUser | null> {
    return await UserModel.findByIdAndUpdate(id, updates, { new: true }).exec();
  }

  async findUserById(id: string): Promise<IBaseUser | null> {
    return await UserModel.findById(id).populate("school", "name").exec();
  }

  async findAllUsers(): Promise<IBaseUser[]> {
    return await UserModel.find().populate("school", "name").exec();
  }

  async deleteUserById(id: string): Promise<IBaseUser | null> {
    return await UserModel.findByIdAndDelete(id).exec();
  }

  async deleteAllUsers(): Promise<void> {
    await UserModel.deleteMany({}).exec();
  }
}
