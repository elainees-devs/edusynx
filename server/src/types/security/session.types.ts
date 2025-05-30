//src/types/security/session.types.ts
import { BaseDocument } from "../common/base.types";

export interface ISession extends BaseDocument {
  userId: string; // Refers to IBaseUser._id
  loginTime: Date;
  logoutTime?: Date;
  ipAddress?: string;
  deviceInfo: string;
  lastAccessedAt?: Date;
  expiryTime: number; // Duration in seconds
  permissions?: string[];
  roles?: string[];

  isValid(): boolean;
  extendSession(duration: number): void;
  endSession(): void;
}
