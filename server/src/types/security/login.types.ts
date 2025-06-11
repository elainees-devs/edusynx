// src/types/security/login.types.ts
import { Types } from "mongoose";
import { BaseDocument } from "../common/base.types";
import { ISession } from "./session.types";
import { IBaseUser } from "../people/user.types";
import { ILoginBase } from "../common/auth-context.types";
import { LoginFailureReason } from "../enum/enum";

export interface ILogin extends IBaseUser, ILoginBase, BaseDocument{
  userId?: Types.ObjectId | IBaseUser | null;
  sessionId?: string | Types.ObjectId | ISession;
  isSuccessful: boolean;
  failureReason?: LoginFailureReason;
  metadata?: Record<string, unknown>;
}

export interface ILoginAttemptPayload {
  userId?: Types.ObjectId | string;
  email: string;
  ipAddress: string;
  deviceInfo?: string;
  reason?: LoginFailureReason;
}

export interface ILockoutCheckParams {
  userId?: Types.ObjectId | string;
  ipAddress: string;
  maxAttempts?: number;
  lockoutMinutes?: number;
}

export interface ILoginRepository {
  recordFailedAttempt(payload: ILoginAttemptPayload): Promise<void>;
  
  checkLockoutStatus(params: ILockoutCheckParams): Promise<ILockoutStatus>;
  
  resetFailedAttempts(params: {
    userId?: Types.ObjectId | string;
    ipAddress: string;
  }): Promise<void>;
  
  generateAuthToken(params: {
    userId: Types.ObjectId | string;
    email: string;
    role?: string;
    ipAddress: string;
    deviceInfo?: string;
  }): Promise<string>;
}

export interface ILoginResult {
  success: boolean;
  token?: string;
  message?: string;
  isLocked?: boolean;
  attemptsRemaining?: number;
  user?: {
    id: Types.ObjectId | string;
    email: string;
    role?: string;
  };
}

export interface ILockoutStatus {
  isLocked: boolean;
  attemptsRemaining: number;
  lockoutTime?: Date;
  lockoutMinutes?: number;
}

export interface IAuthTokenPayload {
  userId: Types.ObjectId | string;
  email: string;
  role?: string;
  sessionId: string;
  ipAddress?: string;
  deviceInfo?: string;
  iat?: number;
  exp?: number;
}