//src/repository/user.repository.ts
import { User } from "../models/user.model";
import { IBaseUser } from "../types/people/user.types";
import {createUserSchema,updateUserSchema} from "../validation/user.schema";

export class UserRepository {
  async create(userData: Partial<IBaseUser>): Promise<IBaseUser> {
    const parsed = createUserSchema.parse(userData); // Validate input
    const user = new User(parsed);
    return await user.save();
  }

  async updateById(
    id: string,
    updates: Partial<IBaseUser>
  ): Promise<IBaseUser | null> {
    const parsed = updateUserSchema.parse(updates); // Validate input
    return await User.findByIdAndUpdate(id, parsed, { new: true }).exec();
  }

 async findById(id: string): Promise<IBaseUser | null> {
    return await User.findById(id)
      .populate("school", "name")
      .exec();                                                                                      
}
 async findAll(): Promise<IBaseUser[]> {
    return await User.find()
      .populate("school", "name")
      .exec();
  }

async deleteById(id: string): Promise<IBaseUser | null> {
    return await User.findByIdAndDelete(id).exec();
  }

async deleteAll(): Promise<void> {
    await User.deleteMany({}).exec();
  }
 
}
