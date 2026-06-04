import apiClient from "./client";
import type { IStaff, CreateStaffDTO, UpdateStaffDTO } from "../types/people/StaffTypes";
import type { GetPageParams, PaginatedResponse } from "../types/pagination/PaginationTypes";

export interface StaffQueryParams extends GetPageParams {
  schoolId: string;
  role?: string;
  department?: string;
  isActive?: boolean;
}

export type PaginatedStaff = PaginatedResponse<IStaff>;

export const createStaff = async (data: CreateStaffDTO): Promise<IStaff> => {
  const response = await apiClient.post("/staff", data);
  return response.data;
};

export const getAllStaff = async (
  params: StaffQueryParams,
): Promise<PaginatedStaff> => {
  const response = await apiClient.get("/staff", { params });
  return response.data;
};

export const getStaffById = async (id: string): Promise<IStaff> => {
  const response = await apiClient.get(`/staff/${id}`);
  return response.data;
};

export const updateStaff = async (
  id: string,
  data: UpdateStaffDTO,
): Promise<IStaff> => {
  const response = await apiClient.put(`/staff/${id}`, data);
  return response.data;
};

export const deleteStaff = async (id: string): Promise<void> => {
  await apiClient.delete(`/staff/${id}`);
};

export const toggleActive = async (id: string): Promise<IStaff> => {
  const response = await apiClient.patch(`/staff/${id}/toggle-active`);
  return response.data;
};

export const assignDepartment = async (
  id: string,
  departmentId: string,
): Promise<IStaff> => {
  const response = await apiClient.patch(`/staff/${id}/department`, {
    departmentId,
  });
  return response.data;
};

export const assignPosition = async (
  id: string,
  position: string,
): Promise<IStaff> => {
  const response = await apiClient.patch(`/staff/${id}/position`, {
    position,
  });
  return response.data;
};

export const countStaff = async (
  schoolId: string,
): Promise<{ count: number }> => {
  const response = await apiClient.get("/staff/count", {
    params: { schoolId },
  });
  return response.data;
};
