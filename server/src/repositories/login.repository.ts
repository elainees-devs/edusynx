//src/repositories/login.repository.ts
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Login } from "../models/login.model";
import { ILogin } from "../types/security/login.types";
import { IBaseUser } from "../types";
import { UserModel } from "../models";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "default_jwt_secret";

export class LoginRepository {
  static async login(email: string, password: string): Promise<{ token?: string; message: string }> {
    const user: IBaseUser | null = await UserModel.findOne({ email });

    if (!user) {
      // If user not found, log attempt without userId
      await Login.create({
        isSuccessful: false,
        failureReason: "User not found",
      } as Partial<ILogin>);
      return { message: "Invalid credentials" };
    }

    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);

    const loginData: Partial<ILogin> = {
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
