import apiClient from "./client";
import type { PaginatedResponse } from "../types/pagination/PaginationTypes";
import type {
  IEnrollment,
  CreateEnrollmentPayload,
  UpdateEnrollmentPayload,
} from "../types/academics/EnrollmentTypes";

export const getEnrollments = async (
  page: number,
  limit: number,
  filters?: Record<string, string>
): Promise<PaginatedResponse<IEnrollment>> => {
  const params: Record<string, string | number> = { page, limit };
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params[key] = value;
    });
  }
  const { data } = await apiClient.get("/enrollments", { params });
  return data;
};

export const getAllEnrollments = async (): Promise<IEnrollment[]> => {
  const { data } = await apiClient.get("/enrollments/all");
  return data;
};

export const getEnrollmentById = async (id: string): Promise<IEnrollment> => {
  const { data } = await apiClient.get(`/enrollments/${id}`);
  return data;
};

export const createEnrollment = async (
  payload: CreateEnrollmentPayload
): Promise<IEnrollment> => {
  const { data } = await apiClient.post("/enrollments", payload);
  return data;
};

export const updateEnrollment = async (
  id: string,
  payload: UpdateEnrollmentPayload
): Promise<IEnrollment> => {
  const { data } = await apiClient.patch(`/enrollments/${id}`, payload);
  return data;
};

export const deleteEnrollment = async (id: string): Promise<void> => {
  await apiClient.delete(`/enrollments/${id}`);
};
