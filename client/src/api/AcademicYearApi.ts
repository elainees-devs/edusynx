// client/src/api/AcademicYearApi.ts
import axios from "axios";
import type { PaginatedResponse } from "../types/pagination/PaginationTypes";
import type {
  IAcademicYear,
  CreateAcademicYearPayload,
  UpdateAcademicYearPayload,
} from "../types/school/AcademicYearTypes";

const API_BASE =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

export const getAcademicYears = async (
  page: number,
  limit: number,
  school?: string,
  isActive?: boolean
): Promise<PaginatedResponse<IAcademicYear>> => {
  const params: Record<string, string | number | boolean> = { page, limit };
  if (school) params.school = school;
  if (isActive !== undefined) params.isActive = isActive;
  const { data } = await axios.get(`${API_BASE}/academic-years`, { params });
  return data;
};

export const getAllAcademicYears = async (): Promise<IAcademicYear[]> => {
  const { data } = await axios.get(`${API_BASE}/academic-years/all`);
  return data;
};

export const getAcademicYearById = async (id: string): Promise<IAcademicYear> => {
  const { data } = await axios.get(`${API_BASE}/academic-years/${id}`);
  return data;
};

export const getActiveAcademicYear = async (school: string): Promise<IAcademicYear> => {
  const { data } = await axios.get(`${API_BASE}/academic-years/active`, {
    params: { school },
  });
  return data;
};

export const createAcademicYear = async (
  payload: CreateAcademicYearPayload
): Promise<IAcademicYear> => {
  const { data } = await axios.post(`${API_BASE}/academic-years`, payload);
  return data;
};

export const updateAcademicYear = async (
  id: string,
  payload: UpdateAcademicYearPayload
): Promise<IAcademicYear> => {
  const { data } = await axios.patch(`${API_BASE}/academic-years/${id}`, payload);
  return data;
};

export const deleteAcademicYear = async (id: string): Promise<void> => {
  await axios.delete(`${API_BASE}/academic-years/${id}`);
};
