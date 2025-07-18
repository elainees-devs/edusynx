// src/types/auth/auth.types.ts
import { Types } from "mongoose";

export interface ILoginRequest {
  email: string;
  password: string;
  ipAddress?: string;
  deviceInfo?: string;
  rememberMe?: boolean;
}

export interface ILoginResponse {
  success: boolean;
  token?: string;
  user?: {
    id: Types.ObjectId | string;
    email: string;
    role?: string;
  };
  message?: string;
  isLocked?: boolean;
  expiresIn?: number;
}
export interface IPasswordResetToken {
  userId?: Types.ObjectId | string
  superAdmin?: Types.ObjectId | String
  token: string;
  expiresAt: Date;
  used: boolean;
}

export interface ILogoutRequest {
  userId: Types.ObjectId | string;
  sessionId: string;
  ipAddress: string;
}


export interface ILoginResponseSuccess {
  success: true;
  token: string;
  user: {
    id: Types.ObjectId | string;
    email: string;
    role?: string;
  };
  message: string;
  isLocked?: boolean;
  expiresIn?: number;
}

export interface ILoginResponseFailure {
  success: false;
  message: string;
  isLocked?: boolean;
}

