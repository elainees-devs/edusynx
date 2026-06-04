// client/src/api/AcademicYearApi.ts
import apiClient from "./client";
import type { PaginatedResponse } from "../types/pagination/PaginationTypes";
import type {
  IAcademicYear,
  CreateAcademicYearPayload,
  UpdateAcademicYearPayload,
} from "../types/school/AcademicYearTypes";

export const getAcademicYears = async (
  page: number,
  limit: number,
  school?: string,
  isActive?: boolean
): Promise<PaginatedResponse<IAcademicYear>> => {
  const params: Record<string, string | number | boolean> = { page, limit };
  if (school) params.school = school;
  if (isActive !== undefined) params.isActive = isActive;
  const { data } = await apiClient.get("/academic-years", { params });
  return data;
};

export const getAllAcademicYears = async (): Promise<IAcademicYear[]> => {
  const { data } = await apiClient.get("/academic-years/all");
  return data;
};

export const getAcademicYearById = async (id: string): Promise<IAcademicYear> => {
  const { data } = await apiClient.get(`/academic-years/${id}`);
  return data;
};

export const getActiveAcademicYear = async (school: string): Promise<IAcademicYear> => {
  const { data } = await apiClient.get("/academic-years/active", {
    params: { school },
  });
  return data;
};

export const createAcademicYear = async (
  payload: CreateAcademicYearPayload
): Promise<IAcademicYear> => {
  const { data } = await apiClient.post("/academic-years", payload);
  return data;
};

export const updateAcademicYear = async (
  id: string,
  payload: UpdateAcademicYearPayload
): Promise<IAcademicYear> => {
  const { data } = await apiClient.patch(`/academic-years/${id}`, payload);
  return data;
};

export const deleteAcademicYear = async (id: string): Promise<void> => {
  await apiClient.delete(`/academic-years/${id}`);
};
