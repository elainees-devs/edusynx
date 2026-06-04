// client/src/api/subject.api.ts
import apiClient from "./client";
import type { ISubject, GetPageParams, PaginatedSubjects } from "../types";

export const registerSubject = async (data: {
  subjectName: string;
}): Promise<ISubject> => {
  try {
    const response = await apiClient.post("/subjects", data);
    return response.data;
  } catch (error) {
    console.error("Failed to add subject:", error);
    throw error;
  }
};

export const getAllSubjects = async (): Promise<ISubject[]> => {
  const response = await apiClient.get("/subjects");
  return response.data.data || [];
};

export const getSubjects = async (
  params: GetPageParams
): Promise<PaginatedSubjects> => {
  const response = await apiClient.get("/subjects", { params });
  return response.data;
};

export const updateSubject = async (
  id: string,
  data: Partial<Omit<ISubject, "_id" | "createdAt" | "updatedAt">>
): Promise<ISubject> => {
  const payload = Object.fromEntries(
    Object.entries(data).filter(([, value]) => value !== undefined && value !== "")
  );

  if (Object.keys(payload).length === 0) {
    throw new Error("No valid fields provided to update.");
  }

  const { data: updatedSubject } = await apiClient.patch(
    `/subjects/${id}`,
    payload
  );

  return updatedSubject;
};

export const getSubjectsBySchool = async (schoolId: string): Promise<ISubject[]> => {
  try {
    const response = await apiClient.get(`/subject/school/${schoolId}`);

    if (Array.isArray(response.data.subjects)) {
      return response.data.subjects;
    } else {
      throw new Error("Expected an array of subjects inside response.data.subjects");
    }
  } catch (error) {
    console.error("Failed to fetch subjects:", error);
    throw error;
  }
};

export const deleteSubject = async (
  id: string
): Promise<{ message: string }> => {
  const response = await apiClient.delete(`/subjects/${id}`);
  return response.data;
};

export const countSubjects = async (): Promise<{ count: number }> => {
  const response = await apiClient.get("/subjects/count");
  return response.data;
};
