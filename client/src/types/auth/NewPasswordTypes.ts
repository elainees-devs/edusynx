// client/src/types/auth/reset-password.types.types
export interface NewPasswordBody {
  token: string;
  newPassword: string;
  confirmPassword: string;
}
