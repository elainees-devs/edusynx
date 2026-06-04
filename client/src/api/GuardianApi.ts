// client/src/api/guardian.api.ts
import apiClient from "./client";
import type { Guardian, PaginatedGuardians } from "../types";

export const getGuardians = async (
  params: Record<string, any>,
): Promise<PaginatedGuardians> => {
  const response = await apiClient.get("/guardians", {
    params,
  });

  return response.data;
};

export const searchGuardians = async (
  filters: { search?: string; schoolId?: string; page: number; limit: number }
): Promise<PaginatedGuardians> => {
  const { data } = await apiClient.get("/guardians/search", {
    params: filters,
  });
  return data;
};

export const updateGuardian = async (
  id: string,
  data: Partial<Omit<Guardian, "_id" | "createdAt" | "updatedAt">>,
): Promise<Guardian> => {
  // Remove undefined or empty string fields
  const payload = Object.fromEntries(
    Object.entries(data).filter(
      ([, value]) => value !== undefined && value !== "",
    ),
  );

  if (Object.keys(payload).length === 0) {
    throw new Error("No valid fields provided to update.");
  }

  const { data: updatedGuardian } = await apiClient.patch(
    `/guardians/${id}`,
    payload,
  );

  return updatedGuardian;
};
