import axios from "axios";
import type { PaginatedResponse } from "../types/pagination/PaginationTypes";
import type {
  IEnrollment,
  CreateEnrollmentPayload,
  UpdateEnrollmentPayload,
} from "../types/academics/EnrollmentTypes";

const API_BASE =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

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
  const { data } = await axios.get(`${API_BASE}/enrollments`, { params });
  return data;
};

export const getAllEnrollments = async (): Promise<IEnrollment[]> => {
  const { data } = await axios.get(`${API_BASE}/enrollments/all`);
  return data;
};

export const getEnrollmentById = async (id: string): Promise<IEnrollment> => {
  const { data } = await axios.get(`${API_BASE}/enrollments/${id}`);
  return data;
};

export const createEnrollment = async (
  payload: CreateEnrollmentPayload
): Promise<IEnrollment> => {
  const { data } = await axios.post(`${API_BASE}/enrollments`, payload);
  return data;
};

export const updateEnrollment = async (
  id: string,
  payload: UpdateEnrollmentPayload
): Promise<IEnrollment> => {
  const { data } = await axios.patch(`${API_BASE}/enrollments/${id}`, payload);
  return data;
};

export const deleteEnrollment = async (id: string): Promise<void> => {
  await axios.delete(`${API_BASE}/enrollments/${id}`);
};
