// client/src/api/guardian.api.ts
import axios from "axios";
import type {Guardian, GuardianFormInput } from "../types";

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';
export const registerGuardian = async (data: GuardianFormInput) => {
  try {
    const response = await axios.post(`${API_BASE}/guardian`, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error response:", error.response?.data);

      // Log validation issues specifically
      if (error.response?.data?.issues) {
        console.table(error.response.data.issues);
      }

      throw error.response?.data || { message: 'A network error occurred' };
    }

    // Fallback for non-Axios errors
    console.error("Unknown error occurred:", error);
    throw { message: 'An unknown error occurred' };
  }
};

export const getAllGuardians = async (): Promise<Guardian[]> => {
  const response = await axios.get(`${API_BASE}/guardian`);

  const data = response.data;
  console.log("Fetched guardians:", data);

  if (!Array.isArray(data)) {
    throw new Error("Expected an array of guardian from the API.");
  }

  return data as Guardian[];
};