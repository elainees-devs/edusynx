//src/types/common/auth-context.types.ts
export interface ILoginBase {
  loginTime: Date;
  ipAddress?: string;
  deviceInfo?: string;
}