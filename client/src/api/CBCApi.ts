import apiClient from "./client";
import type { ICompetency, IStrand,PaginatedCompetencies, PaginatedStrands } from "../types";

// Create a new competency
export const createCompetency = async (data: Omit<ICompetency, "_id" | "createdAt" | "updatedAt">): Promise<ICompetency> => {
  const response = await apiClient.post("/cbc/competencies", data);
  return response.data;
};

// Get all competencies (paginated)
export const getCompetencies = async (page = 1, limit = 10): Promise<PaginatedCompetencies> => {
  const response = await apiClient.get("/cbc/competencies", { params: { page, limit } });
  return response.data;
};

// Get a single competency by ID
export const getCompetencyById = async (id: string): Promise<ICompetency> => {
  const response = await apiClient.get(`/cbc/competencies/${id}`);
  return response.data;
};

// Update a competency
export const updateCompetency = async (
  id: string,
  data: Partial<Omit<ICompetency, "_id" | "createdAt" | "updatedAt">>
): Promise<ICompetency> => {
  const payload = Object.fromEntries(
    Object.entries(data).filter(([, value]) => value !== undefined && value !== "")
  );
  if (Object.keys(payload).length === 0) {
    throw new Error("No valid fields provided to update.");
  }
  const response = await apiClient.patch(`/cbc/competencies/${id}`, payload);
  return response.data;
};


// Delete a competency
export const deleteCompetency = async (id: string): Promise<void> => {
  await apiClient.delete(`/cbc/competencies/${id}`);
};

// =========================
// Strand APIs
// =========================

// Create a new strand
export const createStrand = async (data: Omit<IStrand, "_id" | "createdAt" | "updatedAt">): Promise<IStrand> => {
  const response = await apiClient.post("/cbc/strands", data);
  return response.data;
};

// Get all strands (paginated)
export const getStrands = async (page = 1, limit = 10): Promise<PaginatedStrands> => {
  const response = await apiClient.get("/cbc/strands", { params: { page, limit } });
  return response.data;
};

// Get a single strand by ID
export const getStrandById = async (id: string): Promise<IStrand> => {
  const response = await apiClient.get(`/cbc/strands/${id}`);
  return response.data;
};

// Update a strand
export const updateStrand = async (
  id: string,
  data: Partial<Omit<IStrand, "_id" | "createdAt" | "updatedAt">>
): Promise<IStrand> => {
  const payload = Object.fromEntries(
    Object.entries(data).filter(([, value]) => value !== undefined && value !== "")
  );
  if (Object.keys(payload).length === 0) {
    throw new Error("No valid fields provided to update.");
  }
  const response = await apiClient.patch(`/cbc/strands/${id}`, payload);
  return response.data;
};

// Delete a strand
export const deleteStrand = async (id: string): Promise<void> => {
  await apiClient.delete(`/cbc/strands/${id}`);
};


