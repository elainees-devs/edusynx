// server/src/controllers/login.controller.ts
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { LoginRepository } from "../repositories/login.repository";
import { LoginFailureReason } from "../types/enum/enum";
import { AppError } from "../utils/AppError";
import { handleAsync } from "../utils/handleAsync";
import logger from "../utils/logger";

export class LoginController {
  private loginRepo: LoginRepository;

  constructor() {
    this.loginRepo = new LoginRepository();
  }

  login = handleAsync(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    logger.info(`[LOGIN ATTEMPT] Email=${email}`);
    
    if (!email || !password) {
      logger.warn("Login attempt with missing email or password");
      throw new AppError("Email and password are required", 400);
    }

    const ipAddress = (req.headers["x-forwarded-for"] as string) || req.ip || "unknown";
    const deviceInfo = (req.headers["user-agent"] as string) || "unknown";
    
    logger.info(`Login attempt: Email=${email}, IP=${ipAddress}, Device=${deviceInfo}`);

    // Get user with school data using loginRepo
    const { user, schoolData } = await this.loginRepo.findUserWithSchool(email);
    
    if (!user) {
      await this.loginRepo.recordFailedAttempt({
        email,
        ipAddress,
        reason: LoginFailureReason.USER_NOT_FOUND,
      });
      logger.warn(`Login failed - user not found: Email=${email}, IP=${ipAddress}`);
      throw new AppError("Invalid credentials", 401);
    }

    // Check account lockout status
    const lockoutStatus = await this.loginRepo.checkLockoutStatus({
      userId: user._id,
      ipAddress,
    });

    if (lockoutStatus.isLocked) {
      logger.warn(`Account locked: Email=${email}, IP=${ipAddress}`);
      throw new AppError("Account locked. Try again later.", 403);
    }

    // Verify password
    if (!user.password) {
      await this.loginRepo.recordFailedAttempt({
        userId: user._id,
        email,
        ipAddress,
        reason: LoginFailureReason.INVALID_CREDENTIALS,
      });
      logger.warn(`User has no password set: Email=${email}, IP=${ipAddress}`);
      throw new AppError("Invalid credentials", 401);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      await this.loginRepo.recordFailedAttempt({
        userId: user._id,
        email,
        ipAddress,
        reason: LoginFailureReason.INVALID_CREDENTIALS,
      });
      logger.warn(`Invalid password: Email=${email}, IP=${ipAddress}`);
      throw new AppError("Invalid credentials", 401);
    }

    // Check user and school status
    if (!user.isActive) {
      throw new AppError("User account is inactive", 403);
    }

    if (schoolData && !schoolData.isActive) {
      throw new AppError("School is inactive", 403);
    }

    // Generate token
    const token = await this.loginRepo.generateAuthToken({
      userId: user._id,
      email: user.email,
      role: user.role,
      ipAddress,
      deviceInfo,
      schoolId: schoolData?._id,
      schoolSlug: schoolData?.slug,
      isActive: schoolData?.isActive
    });

    // Reset failed attempts on successful login
    await this.loginRepo.resetFailedAttempts({ userId: user._id, ipAddress });

    logger.info(`Login successful: Email=${email}, IP=${ipAddress}, Device=${deviceInfo}`);

    // Prepare response
    const responseData = {
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        isActive: user.isActive,
        school: schoolData || null
      }
    };

    res.status(200).json(responseData);
  });
}