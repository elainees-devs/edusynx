// client/src/api/subject.api.ts
import axios from "axios";
import type { ISubject, GetPageParams, PaginatedSubjects } from "../types";

const BASE_URL = "http://localhost:5000/api/v1";

/* ==============================
   Register subject (POST)
================================ */
export const registerSubject = async (data: {
  subjectName: string;
}): Promise<ISubject> => {
  try {
    const response = await axios.post(`${BASE_URL}/subjects`, data);
    return response.data;
  } catch (error) {
    console.error("Failed to add subject:", error);
    throw error;
  }
};

/* ==============================
   Fetch all subjects
================================ */
export const getAllSubjects = async (): Promise<ISubject[]> => {
  const response = await axios.get(`${BASE_URL}/subjects`);
  return response.data.data || [];
};

/* ==============================
   Fetch subjects (paginated)
================================ */
export const getSubjects = async (
  params: GetPageParams
): Promise<PaginatedSubjects> => {
  const response = await axios.get(`${BASE_URL}/subjects`, { params });
  return response.data;
};

/* ==============================
   Update subject (PATCH)
================================ */
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

  const { data: updatedSubject } = await axios.patch(
    `${BASE_URL}/subjects/${id}`,
    payload
  );

  return updatedSubject;
};

/* ==============================
   Get subjects by school
================================ */
export const getSubjectsBySchool = async (schoolId: string): Promise<ISubject[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/subject/school/${schoolId}`);
    console.log("📦 Full response.data:", response.data);

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

/* ==============================
   Delete subject
================================ */
export const deleteSubject = async (
  id: string
): Promise<{ message: string }> => {
  const response = await axios.delete(`${BASE_URL}/subjects/${id}`);
  return response.data;
};

/* ==============================
   Count subjects
================================ */
export const countSubjects = async (): Promise<{ count: number }> => {
  const response = await axios.get(`${BASE_URL}/subjects/count`);
  return response.data;
};
