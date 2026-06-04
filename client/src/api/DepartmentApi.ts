import apiClient from "./client";
import type { IDepartment } from "../types/school/AcademicTypes";
import type { GetPageParams, PaginatedResponse } from "../types/pagination/PaginationTypes";

export type PaginatedDepartments = PaginatedResponse<IDepartment>;

export interface CreateDepartmentDTO {
  school: string;
  departmentName: string;
  headOfDepartment?: string;
  teachers?: string[];
}

export type UpdateDepartmentDTO = Partial<CreateDepartmentDTO>;

export const createDepartment = async (
  data: CreateDepartmentDTO,
): Promise<IDepartment> => {
  const response = await apiClient.post("/departments", data);
  return response.data;
};

export const getAllDepartments = async (
  params: GetPageParams & { schoolId?: string },
): Promise<PaginatedDepartments> => {
  const response = await apiClient.get("/departments", { params });
  return response.data;
};

export const getDepartmentById = async (
  id: string,
): Promise<IDepartment> => {
  const response = await apiClient.get(`/departments/${id}`);
  return response.data;
};

export const updateDepartment = async (
  id: string,
  data: UpdateDepartmentDTO,
): Promise<IDepartment> => {
  const response = await apiClient.put(`/departments/${id}`, data);
  return response.data;
};

export const deleteDepartment = async (id: string): Promise<void> => {
  await apiClient.delete(`/departments/${id}`);
};
