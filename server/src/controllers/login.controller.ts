// server/src/controllers/login.controller.ts
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { UserModel } from "../models/user.model";
import { LoginRepository } from "../repositories/login.repository";
import { LoginFailureReason } from "../types/enum/enum";
import { AppError } from "../utils/AppError";
import { handleAsync } from "../utils/handleAsync";
import logger from "../utils/logger";

const loginRepo = new LoginRepository();

export class LoginController {
  login = handleAsync(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    logger.info(`[LOGIN ATTEMPT] Email=${email}`);
    if (!email || !password) {
      logger.warn("Login attempt with missing email or password");
      throw new AppError("Email and password are required", 400);
    }

    // Log the login attempt details

    const ipAddress = (req.headers["x-forwarded-for"] as string) || "unknown";
    const deviceInfo = (req.headers["user-agent"] as string) || "unknown";
    logger.info(
      `Login attempt: Email=${email}, IP=${ipAddress}, Device=${deviceInfo}`
    );

    const user = await UserModel.findOne({ email });
    console.log("user:", user);
    if (!user) {
      await loginRepo.recordFailedAttempt({
        email,
        ipAddress,
        reason: LoginFailureReason.USER_NOT_FOUND,
      });
      logger.warn(
        `Login failed - user not found: Email=${email}, IP=${ipAddress}`
      );
      throw new AppError("Invalid credentials", 401);
    }

    const lockoutStatus = await loginRepo.checkLockoutStatus({
      userId: user._id,
      ipAddress,
    });

    if (lockoutStatus.isLocked) {
      logger.warn(`Account locked: Email=${email}, IP=${ipAddress}`);
      throw new AppError("Account locked. Try again later.", 403);
    }

    const isMatch = await bcrypt.compare(password, user.password || "");
    if (!isMatch) {
      await loginRepo.recordFailedAttempt({
        userId: user._id,
        email,
        ipAddress,
        reason: LoginFailureReason.INVALID_CREDENTIALS,
      });
      logger.warn(`Invalid password: Email=${email}, IP=${ipAddress}`);
      throw new AppError("Invalid credentials", 401);
    }

    const token = await loginRepo.generateAuthToken({
      userId: user._id,
      email: user.email,
      role: user.role,
      ipAddress,
      deviceInfo,
    });

    await loginRepo.resetFailedAttempts({ userId: user._id, ipAddress });

    logger.info(
      `Login successful: Email=${email}, IP=${ipAddress}, Device=${deviceInfo}`
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user,
    });
  });
}
