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

export interface IRefreshTokenRequest {
  refreshToken: string;
  ipAddress: string;
  deviceInfo?: string;
}

export interface ILogoutRequest {
  userId: Types.ObjectId | string;
  sessionId: string;
  ipAddress: string;
}

export interface IPasswordResetRequest {
  email: string;
  ipAddress: string;
}

export interface IChangePasswordRequest {
  userId: Types.ObjectId | string;
  currentPassword: string;
  newPassword: string;
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

