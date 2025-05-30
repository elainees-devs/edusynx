//src/types/security/session.ts
export interface ISession {
  _id: string;
  userId: string;
  createdAt: Date;
  expiresAt: Date;
  loginTime: Date;
  logoutTime?: Date;
  isActive: boolean;
  ipAddress?: string;
  deviceInfo: string;
  lastAccessedAt?: Date;
  expiryTime: number; // Duration in seconds for which the session is valid
  roles?: string[]; // User roles associated with the session
  permissions?: string[];
  isValid(): boolean; // Check if the session is still valid
  extendSession(duration: number): void;
  endSession(): void;
}
