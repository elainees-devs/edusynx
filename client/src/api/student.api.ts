// src/api/student.api.ts
import axios from "axios";
import type { GetPageParams, PaginatedStudents, Student, StudentFormData } from "../types";


/* ==============================
   Axios config
================================ */

const API_BASE =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

/* ==============================
   Create student
================================ */

export const registerStudent = async (
  data: StudentFormData
): Promise<Student> => {
  try {
    const response = await axios.post(`${API_BASE}/students`, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Register student error:", error.response?.data);

      if (error.response?.data?.issues) {
        console.table(error.response.data.issues);
      }

      throw error.response?.data || { message: "Network error" };
    }

    console.error("Unknown error:", error);
    throw { message: "Unknown error occurred" };
  }
};

/* ==============================
   Fetch students (paginated)
================================ */

export const getStudents = async (
  params: GetPageParams
): Promise<PaginatedStudents> => {
  const response = await axios.get(`${API_BASE}/students`, {
    params,
  });

  return response.data;
};

/* ==============================
   Upload students file
================================ */

export const uploadStudentsFile = async (
  file: File
): Promise<Student[]> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post<{ students: Student[] }>(
    `${API_BASE}/students/upload`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data.students;
};

/* ==============================
   Update student (PATCH)
================================ */

export const updateStudent = async (
  id: string,
  data: Partial<Student>
): Promise<Student> => {
  const payload: Partial<Student> = {};

  if (data.studentFirstName !== undefined)
    payload.studentFirstName = data.studentFirstName;

  if (data.studentMiddleName !== undefined)
    payload.studentMiddleName = data.studentMiddleName;

  if (data.studentLastName !== undefined)
    payload.studentLastName = data.studentLastName;

  if (data.studentGender !== undefined)
    payload.studentGender = data.studentGender;

  if (data.dateOfBirth !== undefined)
    payload.dateOfBirth = new Date(data.dateOfBirth).toISOString();

  if (data.admissionDate !== undefined)
    payload.admissionDate = new Date(data.admissionDate).toISOString();

  if (data.previousSchool !== undefined)
    payload.previousSchool = data.previousSchool;

  if (data.classId !== undefined)
    payload.classId = data.classId;

  if (data.stream !== undefined)
    payload.stream = data.stream;

  if (data.status !== undefined)
    payload.status = data.status;

  if (data.studentPhotoUrl !== undefined)
    payload.studentPhotoUrl = data.studentPhotoUrl;

  console.log("Update payload:", payload);

  const response = await axios.patch(
    `${API_BASE}/students/${id}`,
    payload
  );

  return response.data;
};

/* ==============================
   Delete student
================================ */

export const deleteStudent = async (
  id: string
): Promise<{ message: string }> => {
  const response = await axios.delete(`${API_BASE}/students/${id}`);
  return response.data;
};

/* ==============================
   Count students
================================ */
export const countStudents = async (): Promise<{ count: number }> => {
  const response = await axios.get(`${API_BASE}/students/count`);
  return response.data;
}