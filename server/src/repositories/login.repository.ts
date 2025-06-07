// src/repositories/login.repository.ts
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Login } from "../models/login.model";
import { LoginHistoryModel } from "../models/loginHistory.model";
import { IBaseUser, ILoginRequest, LoginFailureReason } from "../types";
import { UserModel } from "../models";
import dotenv from "dotenv";
import { Types } from "mongoose";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "default_jwt_secret";

interface LoginResult {
  token?: string;
  message: string;
}

export class LoginRepository {
  /**
   * Attempt to login a user with email and password.
   * Logs every attempt in the Login and LoginHistory collections.
   */
  async login(
    data: ILoginRequest & { ipAddress?: string; deviceInfo?: string }
  ): Promise<LoginResult> {
    const { email, password, ipAddress, deviceInfo } = data;

    // Find user by email (primaryEmail)
    const user: (IBaseUser & { password: string; _id: Types.ObjectId }) | null =
      await UserModel.findOne({ primaryEmail: email }).exec();

    const loginTime = new Date();

    if (!user) {
      // User not found — log failed login with userId null
      const loginData = {
        userId: null, // user not found, so null here
        isSuccessful: false,
        failureReason: LoginFailureReason.USER_NOT_FOUND,
        loginTime,
        ipAddress,
        deviceInfo,
      };

      await Promise.all([
        Login.create(loginData),
        LoginHistoryModel.create(loginData),
      ]);

      return { message: "Invalid credentials" };
    }

    // Check password validity
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // Log login attempt
    const loginData = {
      userId: user._id,
      isSuccessful: isPasswordValid,
      failureReason: isPasswordValid ? undefined : LoginFailureReason.INVALID_CREDENTIALS,
      loginTime,
      ipAddress,
      deviceInfo,
      // sessionId: undefined, // add session tracking here if needed
    };

    await Promise.all([
      Login.create(loginData),
      LoginHistoryModel.create(loginData),
    ]);

    if (!isPasswordValid) {
      return { message: "Invalid credentials" };
    }

    // Generate JWT token for successful login
    const token = jwt.sign(
      {
        id: user._id.toString(),
        email: user.primaryEmail,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return { token, message: "Login successful" };
  }
}
