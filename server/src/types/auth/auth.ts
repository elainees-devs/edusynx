//src/types/auth/auth.ts
export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
  userId: string;
  email: string;
  role?: string;
}
