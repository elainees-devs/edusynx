// client/src/api/super-admin-api.ts
import axios from 'axios';
import type { ISuperAdmin } from '../types/people/user.types';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

export const signupSuperAdmin = async (data: ISuperAdmin) => {
  try {
    const response = await axios.post(`${API_BASE}/super-admin/signup`, data);
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