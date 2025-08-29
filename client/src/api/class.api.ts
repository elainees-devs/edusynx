// client/src/api/class.api.ts
import axios from 'axios';
import type { IClass } from '../types';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

export const registerClass = async (data: IClass) => {
  try {
    const response = await axios.post(`${API_BASE}/class`, data);
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

// Retrieve all classes
export const getAllClasses = async (): Promise<IClass[]> => {
  try {
    const response = await axios.get(`${API_BASE}/class`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error fetching classes:", error.response?.data);
      throw error.response?.data || { message: "Failed to fetch classes" };
    }
    throw new Error("Unexpected error while fetching classes");
  }
};

// Get classes by dynamic filter: schoolId (required), academicYear (optional)
export const getClassesByFilter = async (
  schoolId: string,
  academicYear?: string
): Promise<IClass[]> => {
  try {
    const url = new URL(`${API_BASE}/class/school/${schoolId}`);
    if (academicYear) {
      url.searchParams.append("academicYear", academicYear);
    }

    const response = await axios.get(url.toString());
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error fetching classes:", error.response?.data);
      throw error.response?.data || { message: 'Failed to fetch classes' };
    }

    throw { message: 'An unknown error occurred while fetching classes' };
  }
};
