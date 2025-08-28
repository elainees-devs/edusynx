// client/src/api/student.api.ts
import axios from "axios";
import type { Student, StudentFormData } from "../types";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";
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

      throw error.response?.data || { message: "A network error occurred" };
    }

    // Fallback for non-Axios errors
    console.error("Unknown error occurred:", error);
    throw { message: "An unknown error occurred" };
  }
};

export const getAllStudents = async (): Promise<Student[]> => {
  const response = await axios.get(`${API_BASE}/student/students`);

  const data = response.data;

  if (!Array.isArray(data)) {
    throw new Error("Expected an array of students from the API.");
  }

  return data as Student[];
};

export const updateStudent = async (id: string, data: Partial<Student>) => {
  const payload: Partial<Student> = {};

  if (data.studentFirstName) payload.studentFirstName = data.studentFirstName;
  if (data.studentMiddleName) payload.studentMiddleName = data.studentMiddleName;
  if (data.studentLastName) payload.studentLastName = data.studentLastName;
  if (data.studentGender) payload.studentGender = data.studentGender;
  if (data.dateOfBirth) payload.dateOfBirth = new Date(data.dateOfBirth).toISOString();
  if (data.admissionDate) payload.admissionDate = new Date(data.admissionDate).toISOString();
  if (data.previousSchool) payload.previousSchool = data.previousSchool;
  if (data.classId) payload.classId = data.classId; 
  if (data.stream) payload.stream = data.stream;
  if (data.status) payload.status = data.status;
  if (data.studentPhotoUrl) payload.studentPhotoUrl = data.studentPhotoUrl;

  console.log("Final update payload:", payload);

  const response = await axios.put(`${API_BASE}/student/update/${id}`, payload);
  return response.data;
};



export const deleteStudent = async (id: string): Promise<{ message: string }> => {
  const response = await axios.delete(`${API_BASE}/student/${id}`);
  return response.data; // e.g. { message: "Student deleted successfully" }
};
