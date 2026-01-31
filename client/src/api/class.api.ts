// client/src/api/class.api.ts
import axios from "axios";
import type { GetPageParams, IClass, PaginatedClasses } from "../types";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

/* ==============================
   Refister classes (POST)
================================ */
export const registerClass = async (data: IClass) => {
  try {
    const response = await axios.post(`${API_BASE}/classes`, data);
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

/* ==============================
   Fetch classes (paginated)
================================ */

export const getAllClasses = async (
  params: GetPageParams,
): Promise<PaginatedClasses> => {
  const response = await axios.get(`${API_BASE}/classes`, {
    params,
  });

  return response.data;
};

// Get classes by dynamic filter: schoolId (required), academicYear (optional)
export const getClassesByFilter = async (
  schoolId: string,
  academicYear?: string,
): Promise<IClass[]> => {
  try {
    const url = new URL(`${API_BASE}/classes/school/${schoolId}`);
    if (academicYear) {
      url.searchParams.append("academicYear", academicYear);
    }

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
   Update stream (PATCH)
================================ */
export const updateClass = async (
  id: string,
  data: Partial<Omit<IClass, "_id" | "createdAt" | "updatedAt">>,
): Promise<IClass> => {
  // Remove undefined or empty string fields, and convert date fields to ISO
  const payload = Object.fromEntries(
    Object.entries(data)
      .filter(([, value]) => value !== undefined && value !== "")
      .map(([key, value]) => {
        return [key, value];
      }),
  );

  if (Object.keys(payload).length === 0) {
    throw new Error("No valid fields provided to update.");
  }

  const { data: updatedClass } = await axios.patch(
    `${API_BASE}/classes/${id}`,
    payload,
  );

  return updatedClass;
};

/* ==============================
   Delete class
================================ */

export const deleteClass = async (id: string): Promise<{ message: string }> => {
  const response = await axios.delete(`${API_BASE}/classes/${id}`);
  return response.data;
};

/* ==============================
   Count classes
================================ */
export const countClasses = async (): Promise<{ count: number }> => {
  const response = await axios.get(`${API_BASE}/classes/count`);
  return response.data;
};
