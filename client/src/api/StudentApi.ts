// client/src/api/student.api.ts
import apiClient from "./client";
import axios from "axios";
import type { GetPageParams, PaginatedStudents, Student, StudentFormData, StudentHistoryEntry } from "../types";

export const registerStudent = async (
  data: StudentFormData
): Promise<Student> => {
  try {
    const response = await apiClient.post("/students", data);
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

export const getStudents = async (
  params: GetPageParams
): Promise<PaginatedStudents> => {
  const response = await apiClient.get("/students", {
    params,
  });

  return response.data;
};

export interface StudentSearchFilters {
  search?: string;
  classId?: string;
  streamId?: string;
  status?: string;
  gender?: string;
  page: number;
  limit: number;
}

export const searchStudents = async (
  filters: StudentSearchFilters
): Promise<PaginatedStudents> => {
  const { data } = await apiClient.get("/students/search", {
    params: filters,
  });
  return data;
};

export const getStudentsByClass = async (classId: string): Promise<Student[]> => {
  try {
    const response = await apiClient.get("/students", {
      params: { classId },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error fetching students:", error.response?.data);
      throw error.response?.data || { message: "Failed to fetch students" };
    }
    throw { message: "Unknown error occurred while fetching students" };
  }
};

export const uploadStudentsFile = async (
  file: File
): Promise<Student[]> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await apiClient.post<{ students: Student[] }>(
    "/students/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data.students;
};

export const updateStudent = async (
  id: string,
  data: Partial<Omit<Student, "_id" | "createdAt" | "updatedAt">>,
): Promise<Student> => {
  const payload = Object.fromEntries(
    Object.entries(data)
      .filter(([, value]) => value !== undefined && value !== "")
      .map(([key, value]) => {
        if (key === "dateOfBirth" || key === "admissionDate") {
          return [key, new Date(value as string).toISOString()];
        }
        return [key, value];
      }),
  );

  if (Object.keys(payload).length === 0) {
    throw new Error("No valid fields provided to update.");
  }

  const { data: updatedStudent } = await apiClient.patch(
    `/students/${id}`,
    payload,
  );

  return updatedStudent;
};

export const deleteStudent = async (
  id: string
): Promise<{ message: string }> => {
  const response = await apiClient.delete(`/students/${id}`);
  return response.data;
};

export const countStudents = async (): Promise<{ count: number }> => {
  const response = await apiClient.get("/students/count");
  return response.data;
}

export const getStudentsByClassAndStream = async (
  classId: string,
  stream: string
): Promise<Student[]> => {
  try {
    const response = await apiClient.get("/students/class", {
      params: { classId, stream },
    });

    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error fetching students:", error.response?.data);
      throw error.response?.data || { message: "Failed to fetch students" };
    }

    throw { message: "Unknown error occurred while fetching students" };
  }
};

export const promoteStudents = async (
  sourceClassId: string,
  targetClassId: string,
  targetStreamId?: string,
  academicYear?: string,
): Promise<{ message: string; modifiedCount: number }> => {
  const { data } = await apiClient.post("/students/promote", {
    sourceClassId,
    targetClassId,
    targetStreamId,
    academicYear,
  });
  return data;
};

export const transferStudent = async (
  id: string,
  targetClassId: string,
  targetStreamId?: string,
  reason?: string,
): Promise<Student> => {
  const { data } = await apiClient.patch(`/students/${id}/transfer`, {
    targetClassId,
    targetStreamId,
    reason,
  });
  return data;
};

export const graduateStudents = async (
  studentIds: string[],
): Promise<{ message: string; modifiedCount: number }> => {
  const { data } = await apiClient.patch("/students/graduate", {
    studentIds,
  });
  return data;
};

export const getStudentHistory = async (
  id: string,
): Promise<Student & { history?: StudentHistoryEntry[] }> => {
  const { data } = await apiClient.get(`/students/${id}/history`);
  return data;
};

