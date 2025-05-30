//src/types/security/session.types.ts
import { ILoginBase } from "../common/auth-context.types";
import { BaseDocument } from "../common/base.types";

export interface ISession extends BaseDocument, ILoginBase {
  userId: string; // Refers to IBaseUser._id
  logoutTime?: Date;
  lastAccessedAt?: Date;
  expiryTime: number; // Duration in seconds
  permissions?: string[];
  roles?: string[];

  isValid(): boolean;
  extendSession(duration: number): void;
  endSession(): void;
}
