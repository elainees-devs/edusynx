// client/src/api/school.api.ts
import axios from "axios";
import type { ISchool } from "../types";

// Base URL for all school-related API requests
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

/* ==============================
   Paginated School Response Interface
================================ */
export interface PaginatedSchoolResponse {
  page: number; // Current page number
  limit: number; // Number of schools per page
  totalPages: number; // Total number of pages available
  totalSchools: number; // Total number of schools in the database
  schools: ISchool[]; // Array of school objects
}

/* ==============================
   Get school by ID
================================ */
export const getSchoolById = async (id: string): Promise<ISchool> => {
  const response = await axios.get(`${API_BASE}/school/${id}`);
  return response.data;
};

/* ==============================
   Register a new school
================================ */
export const registerSchool = async (data: ISchool): Promise<ISchool> => {
  try {
    const response = await axios.post(`${API_BASE}/schools/register`, data);
    console.log("School registered successfully:", response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error response:", error.response?.data);

      if (error.response?.data?.issues) {
        console.table(error.response.data.issues);
      }

      throw error.response?.data || { message: "A network error occurred" };
    }

    console.error("Unknown error occurred:", error);
    throw { message: "An unknown error occurred" };
  }
};

/* ==============================
   Get school by slug
================================ */
export const getSchoolBySlug = async (slug: string): Promise<ISchool> => {
  const response = await axios.get(`${API_BASE}/schools/${slug}`);
  return response.data;
};

/* ==============================
   Fetch paginated list of schools
================================ */
export const fetchSchools = async (
  page: number = 1,
  limit: number = 10,
): Promise<PaginatedSchoolResponse> => {
  const response = await axios.get(`${API_BASE}/schools`, {
    params: { page, limit },
  });

  return response.data;
};

/* ==============================
   Update school by ID
================================ */
export const updateSchool = async (
  id: string,
  updatedData: Partial<ISchool>,
): Promise<ISchool> => {
  try {
    const response = await axios.put(`${API_BASE}/schools/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Failed to update school:", error);
    throw error;
  }
};

/* ==============================
   Delete school by ID
================================ */
export const deleteSchool = async (id: string): Promise<ISchool> => {
  try {
    const response = await axios.delete(`${API_BASE}/school/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to delete school:", error);
    throw error;
  }
};
