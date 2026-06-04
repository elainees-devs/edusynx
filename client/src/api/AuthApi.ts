// client/src/api/auth.ts
import apiClient from "./client";
import axios from "axios";
import { logger } from "../utils/Logger";
import type { NewPasswordBody } from "../types/auth/NewPasswordTypes";
import type { IBaseUser } from "../types";

interface LoginResponse {
  message: string;
  token: string;
  user: IBaseUser;
}

export const loginUser = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await apiClient.post(
      "/auth/login",
      { email, password },
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

// Reset password functionality
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
   
export const confirmPasswordReset = async (data: NewPasswordBody) => {
  const response = await apiClient.post("/password-reset/confirm", data);
  return response.data;
};

export const signupUser = async (slug: string, userData: any) => {
  try {
    const response = await apiClient.post(`/${slug}/signup`, userData);
    logger.info(`User signup successful for school: ${slug}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      logger.error(`Signup failed for school: ${slug}`, error);
      throw (
        error.response?.data || { message: "Signup failed. Please try again." }
      );
    }
    throw new Error("A network error occurred while signing up.");
  }
};

export const getPublicClassesBySlug = async (slug: string) => {
  const response = await apiClient.get(`/${slug}/classes`);
  return response.data;
};

export const getPublicStreamsBySlug = async (slug: string) => {
  const response = await apiClient.get(`/${slug}/streams`);
  return response.data;
};

export const getPublicAcademicYearsBySlug = async (slug: string) => {
  const response = await apiClient.get(`/${slug}/academic-years`);
  return response.data;
};
