// src/types/common/auth-context.types.ts
export interface ILoginBase {
  loginTime: Date;
  ipAddress?: string;
  deviceInfo?: string;
  userAgent?: string;
  location?: {
    country?: string;
    region?: string;
    city?: string;
  };
}