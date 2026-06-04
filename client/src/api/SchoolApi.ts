// client/src/api/school.api.ts
import apiClient from "./client";
import axios from "axios";
import type { ISchool } from "../types";

export interface PaginatedSchoolResponse {
  page: number;
  limit: number;
  totalPages: number;
  totalSchools: number;
  schools: ISchool[];
}

export const getSchoolById = async (id: string): Promise<ISchool> => {
  const response = await apiClient.get(`/school/${id}`);
  return response.data;
};

export const registerSchool = async (data: ISchool): Promise<ISchool> => {
  try {
    const response = await apiClient.post("/schools/register", data);
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

export const getSchoolBySlug = async (slug: string): Promise<ISchool> => {
  const response = await apiClient.get(`/schools/${slug}`);
  return response.data;
};

export const fetchSchools = async (
  page: number = 1,
  limit: number = 10,
): Promise<PaginatedSchoolResponse> => {
  const response = await apiClient.get("/schools", {
    params: { page, limit },
  });

  return response.data;
};

export const updateSchool = async (
  id: string,
  updatedData: Partial<ISchool>,
): Promise<ISchool> => {
  try {
    const response = await apiClient.put(`/schools/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Failed to update school:", error);
    throw error;
  }
};

export const deleteSchool = async (id: string): Promise<ISchool> => {
  try {
    const response = await apiClient.delete(`/school/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to delete school:", error);
    throw error;
  }
};
