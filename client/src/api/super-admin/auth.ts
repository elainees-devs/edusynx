// client/src/api/super-admin/auth.ts
import axios from "axios";
import type { ISuperAdmin } from "../../types/people/user.types";
import { logger } from "../../utils/logger";


const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

interface LoginResponse {
  message: string;
  token: string;
  user: ISuperAdmin;
}

export const loginUser = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await axios.post(
      `${API_BASE}/auth/super-admin`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    logger.info(`User login successful: ${email}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      logger.error(`Login failed for user: ${email}`, error);

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

// forgot password functionality
export const sendPasswordResetEmail = async (email: string): Promise<void> => {
  try {
    await axios.post(`${API_BASE}/auth/forgot-password`, { email }, {
      headers: {
        "Content-Type": "application/json",
      },
    });

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
   
