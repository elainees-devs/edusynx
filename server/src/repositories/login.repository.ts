// src/repositories/login.repository.ts
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Login } from "../models/login.model";
import { IBaseUser, ILoginRequest } from "../types";
import { UserModel } from "../models";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "default_jwt_secret";

export class LoginRepository {
  async login(data: ILoginRequest): Promise<{ token?: string; message: string }> {
    const { email, password } = data;

    const user: IBaseUser | null = await UserModel.findOne({ email });

    if (!user) {
      await Login.create({
        isSuccessful: false,
        failureReason: "User not found",
      });
      return { message: "Invalid credentials" };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    const loginData = {
      userId: user._id,
      isSuccessful: isPasswordValid,
      failureReason: isPasswordValid ? undefined : "Incorrect password",
    };

    await Login.create(loginData);

    if (!isPasswordValid) {
      return { message: "Invalid credentials" };
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.primaryEmail,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return { token, message: "Login successful" };
  }
}
