// client/src/api/school-api.ts
import axios from 'axios';
import type { ISchool } from '../types';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

export interface PaginatedSchoolResponse {
  page: number;
  limit: number;
  totalPages: number;
  totalSchools: number;
  schools: ISchool[];
}

export const getSchoolById = async (id: string): Promise<ISchool> => {
  const response = await axios.get(`${API_BASE}/school/${id}`);
  return response.data;
};


export const registerSchool = async (data: ISchool) => {
  try {
    const response = await axios.post(`${API_BASE}/school/register`, data);
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

/**
 * Fetches a school document by slug.
 * @param slug - The unique slug used in the signup URL.
 * @returns A Promise that resolves to a school object.
 */
export const getSchoolBySlug = async (slug: string): Promise<ISchool> => {
  const response = await axios.get(`${API_BASE}/school/slug/${slug}`);
  console.log("response data:", response.data);
  return response.data;
};

export const fetchSchools = async (
  page: number = 1,
  limit: number = 10
): Promise<PaginatedSchoolResponse> => {
  const response = await axios.get(`${API_BASE}/school`, {
    params: { page, limit },
  });

  console.log("✅ Fetched Schools Response:", response.data);
  return response.data; 
};


export const updateSchool = async (id: string, updatedData: Partial<ISchool>): Promise<ISchool> => {
  try {
    const response = await axios.put(`${API_BASE}/school/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Failed to update school:", error);
    throw error;
  }
};

export const deleteSchool = async (id: string): Promise<ISchool> => {
  try {
    const response = await axios.delete(`${API_BASE}/school/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to delete school:", error);
    throw error;
  }
};



