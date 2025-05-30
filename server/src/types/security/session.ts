//src/types/security/session.ts
export interface ISession {
  _id: string;
  userId: string; // Refers to IBaseUser._id
  createdAt: Date;
  expiresAt: Date;
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
