// client/src/api/auth/super-admin-auth.ts
import apiClient from "../client";
import axios from "axios";
import type { ISuperAdmin } from "../../types/people/UserTypes";
import { logger } from "../../utils/Logger";

interface LoginResponse {
  message: string;
  token: string;
  user: ISuperAdmin;
}

export const loginSuperAdmin = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await apiClient.post(
      "/super-admin/login",
      { email, password },
    );

    logger.info(`Super Admin  login successful: ${email}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      logger.error(`Login failed for super admin: ${email}`, error);

      if (error.response?.data?.issues) {
        console.table(error.response.data.issues);
      }

      throw (
        error.response?.data || { message: "Login failed. Please try again." }
      );
    }

    throw new Error("A network error occurred");
  }
};

export const sendPasswordResetEmail = async (email: string): Promise<void> => {
  try {
    await apiClient.post("/password-reset", { email });

    logger.info(`Password reset email sent to: ${email}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      logger.error(`Failed to send password reset email to: ${email}`, error);
      throw (
        error.response?.data || { message: "Failed to send password reset email." }
      );
    }

    throw new Error("A network error occurred while sending the password reset email.");
  }
}
   
