// server/src/repositories/login.repository.ts
import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { Login } from "../../models/security/login.model";
import {
  ILoginRepository,
  ILoginAttemptPayload,
  ILockoutCheckParams,
  ILockoutStatus,
} from "../../types/security/login.types";
import { LoginFailureReason } from "../../types/enum/enum";
import { IBaseUser, ISchool } from "../../types";
import { UserModel } from "../../models/people/user.model";


const MAX_ATTEMPTS = 5;
const LOCKOUT_MINUTES = 15;
const JWT_SECRET = process.env.JWT_SECRET || "secret";

export class LoginRepository implements ILoginRepository {
  private failedAttempts: Record<string, { count: number; lastAttempt: Date }> =
    {};

  async recordFailedAttempt(payload: ILoginAttemptPayload): Promise<void> {
    await Login.create({
      userId: payload.userId,
      sessionId: null,
      isSuccessful: false,
      failureReason: payload.reason ?? LoginFailureReason.INVALID_CREDENTIALS,
    });

    const key = `${payload.userId}-${payload.ipAddress}`;
    const now = new Date();

    if (!this.failedAttempts[key]) {
      this.failedAttempts[key] = { count: 1, lastAttempt: now };
    } else {
      this.failedAttempts[key].count++;
      this.failedAttempts[key].lastAttempt = now;
    }
  }

  async checkLockoutStatus(
    params: ILockoutCheckParams
  ): Promise<ILockoutStatus> {
    const { userId, ipAddress } = params;
    const key = `${userId}-${ipAddress}`;
    const attemptData = this.failedAttempts[key];

    if (!attemptData) {
      return { isLocked: false, attemptsRemaining: MAX_ATTEMPTS };
    }

    const elapsedMinutes =
      (Date.now() - attemptData.lastAttempt.getTime()) / 60000;
    if (attemptData.count >= MAX_ATTEMPTS && elapsedMinutes < LOCKOUT_MINUTES) {
      return {
        isLocked: true,
        attemptsRemaining: 0,
        lockoutTime: new Date(
          attemptData.lastAttempt.getTime() + LOCKOUT_MINUTES * 60000
        ),
        lockoutMinutes: LOCKOUT_MINUTES,
      };
    }

    return {
      isLocked: false,
      attemptsRemaining: MAX_ATTEMPTS - attemptData.count,
    };
  }

  async resetFailedAttempts(params: {
    userId?: Types.ObjectId | string;
    ipAddress: string;
  }): Promise<void> {
    const key = `${params.userId}-${params.ipAddress}`;
    delete this.failedAttempts[key];
  }


async findUserWithSchool(email: string): Promise<{
  user: IBaseUser | null;
  schoolData: ISchool | null;
}> {
  const user = await UserModel.findOne({ email })
    .populate<{ school: ISchool | null }>("school", "name slug isActive")
    .lean<IBaseUser & { school: ISchool | null }>();

  if (!user) return { user: null, schoolData: null };

  return {
    user: {
      ...user,
      school: user.school  // Convert back to ObjectId 
    },
    schoolData: user.school
  };
}
  async generateAuthToken(params: {
    userId: Types.ObjectId | string;
    email: string;
    role?: string;
    ipAddress: string;
    deviceInfo?: string;
    schoolId?: Types.ObjectId | string;
    schoolSlug?: string;
    isActive?: boolean;
  }): Promise<string> {
    const payload = {
      userId: params.userId,
      email: params.email,
      role: params.role,
      ipAddress: params.ipAddress,
      deviceInfo: params.deviceInfo,
      sessionId: new Types.ObjectId().toHexString(),
        school: params.schoolId
        ? {
            id: params.schoolId,
            slug: params.schoolSlug,
            isActive: params.isActive ?? true,
          }
        : undefined,
    };

    return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
  }
}