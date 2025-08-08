// client/src/api/student.api.ts
import axios from "axios";
import type { Student, StudentFormData } from "../types";

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';
export const registerStudent = async (data: StudentFormData) => {
  try {
    const response = await axios.post(`${API_BASE}/student`, data);
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

export const getAllStudents = async (): Promise<Student[]> => {
  const response = await axios.get(`${API_BASE}/student/students`);

  const data = response.data;
  console.log("Fetched students:", data);

  if (!Array.isArray(data)) {
    throw new Error("Expected an array of students from the API.");
  }

  return data as Student[];
};