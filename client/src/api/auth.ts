// client/src/api/auth.ts
import axios from "axios";

import { logger } from "../utils/logger";
import type { IUser } from "../types/people/user.types";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

interface LoginResponse {
  message: string;
  token: string;
  user: IUser;
}

export const loginUser = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await axios.post(
      `${API_BASE}/auth`,
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
