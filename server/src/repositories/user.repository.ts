// server/src/repositories/user.repository
import { Types } from "mongoose";
import { CreateUserDTO } from "../dto/entity.dto";
import { UserModel } from "../models";
import { IBaseUser } from "../types/people/user.types";
import bcrypt from "bcrypt";
import { ISchool } from "../types";
import { AppError } from "../utils/AppError";

export class UserRepository {
  async createUser(userData: CreateUserDTO): Promise<IBaseUser> {
    try {
      const processedData = {
        ...userData,
        school: this.normalizeSchoolId(userData.school),
      };

      if (processedData.password) {
        const saltRounds = 10;
        processedData.password = await bcrypt.hash(
          processedData.password,
          saltRounds
        );
      }

      const user = new UserModel(processedData);
      return await user.save();
    } catch (error) {
      throw new AppError(
        `Failed to create user: ${(error as Error).message}`,
        500
      );
    }
  }

  async updateUserById(
    id: string,
    updates: Partial<IBaseUser>
  ): Promise<IBaseUser | null> {
    try {
      if (updates.school) {
        updates.school = this.normalizeSchoolId(updates.school);
      }

      return await UserModel.findByIdAndUpdate(
        new Types.ObjectId(id),
        updates,
        {
          new: true,
        }
      )
        .populate("school", "firstName")
        .exec();
    } catch (error) {
      throw new AppError(
        `Failed to update user with id ${id}: ${(error as Error).message}`,
        500
      );
    }
  }

  async findUserById(id: string): Promise<IBaseUser | null> {
    try {
      return await UserModel.findById(new Types.ObjectId(id))
        .populate("school", "firstName")
        .exec();
    } catch (error) {
      throw new AppError(
        `Failed to find user with id ${id}: ${(error as Error).message}`,
        500
      );
    }
  }

  async findAllUsers(): Promise<IBaseUser[]> {
    try {
      return await UserModel.find().populate("school", "firstName").exec();
    } catch (error) {
      throw new AppError(
        `Failed to find all users: ${(error as Error).message}`,
        500
      );
    }
  }

  async deleteUserById(id: string): Promise<IBaseUser | null> {
    try {
      return await UserModel.findByIdAndDelete(new Types.ObjectId(id)).exec();
    } catch (error) {
      throw new AppError(
        `Failed to delete user with id ${id}: ${(error as Error).message}`,
        500
      );
    }
  }

  async deleteAllUsers(): Promise<void> {
    try {
      await UserModel.deleteMany({}).exec();
    } catch (error) {
      throw new AppError(
        `Failed to delete all users: ${(error as Error).message}`,
        500
      );
    }
  }

  private normalizeSchoolId(
    school: Types.ObjectId | ISchool | string
  ): Types.ObjectId {
    if (typeof school === "string") {
      return new Types.ObjectId(school);
    }
    if (school instanceof Types.ObjectId) {
      return school;
    }
    if (school && school._id) {
      return school._id;
    }
    throw new AppError("Invalid school object: missing _id", 400);
  }
}
