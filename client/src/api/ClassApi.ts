// client/src/api/class.api.ts
import axios from "axios";
import type { GetPageParams, IClass, PaginatedClasses } from "../types";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

/* ==============================
   Register a new class (POST)
================================ */
export const registerClass = async (data: IClass): Promise<IClass> => {
  try {
    const response = await axios.post(`${API_BASE}/classes`, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error response:", error.response?.data);

      if (error.response?.data?.issues) {
        console.table(error.response.data.issues);
      }

      throw error.response?.data || { message: "A network error occurred" };
    }

    console.error("Unknown error:", error);
    throw { message: "An unknown error occurred" };
  }
};

/* ==============================
   Fetch all classes (no pagination)
================================ */
export const getAllClasses = async (): Promise<IClass[]> => {
  const response = await axios.get(`${API_BASE}/classes/all`);
  return response.data;
};

/* ==============================
   Fetch paginated classes
================================ */
export const getClasses = async (params: GetPageParams): Promise<PaginatedClasses> => {
  const response = await axios.get(`${API_BASE}/classes`, { params });
  return response.data;
};

/* ==============================
   Fetch classes by filter: schoolId (required), academicYear (optional)
================================ */
export const getClassesByFilter = async (
  schoolId: string,
  academicYear?: string,
  page?: number,
  limit?: number,
): Promise<PaginatedClasses> => {
  try {
    const url = new URL(`${API_BASE}/classes/school/${schoolId}`);
    if (academicYear) url.searchParams.append("academicYear", academicYear);
    if (page) url.searchParams.append("page", page.toString());
    if (limit) url.searchParams.append("limit", limit.toString());

    const response = await axios.get(url.toString());
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error fetching classes:", error.response?.data);
      throw error.response?.data || { message: "Failed to fetch classes" };
    }
    throw { message: "An unknown error occurred while fetching classes" };
  }
};

/* ==============================
   Update class (PATCH)
================================ */
export const updateClass = async (
  id: string,
  data: Partial<Omit<IClass, "_id" | "createdAt" | "updatedAt">>,
): Promise<IClass> => {
  // Remove undefined or empty string fields
  const payload = Object.fromEntries(
    Object.entries(data).filter(([, value]) => value !== undefined && value !== "")
  );

  if (Object.keys(payload).length === 0) {
    throw new Error("No valid fields provided to update.");
  }

  const { data: updatedClass } = await axios.patch(`${API_BASE}/classes/${id}`, payload);
  return updatedClass;
};

/* ==============================
   Delete a class by ID
================================ */
export const deleteClass = async (id: string): Promise<void> => {
  await axios.delete(`${API_BASE}/classes/${id}`);
};

/* ==============================
   Delete all classes
================================ */
export const deleteAllClasses = async (): Promise<void> => {
  await axios.delete(`${API_BASE}/classes`);
};

/* ==============================
   Count total classes
================================ */
export const countClasses = async (): Promise<{ count: number }> => {
  const response = await axios.get(`${API_BASE}/classes/count`);
  return response.data;
};
