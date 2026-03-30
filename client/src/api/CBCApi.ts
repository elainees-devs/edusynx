import axios from "axios";
import type { ICompetency, IStrand,PaginatedCompetencies, PaginatedStrands } from "../types";

const API_BASE = "http://localhost:5000/api/v1/cbc";

// Create a new competency
export const createCompetency = async (data: Omit<ICompetency, "_id" | "createdAt" | "updatedAt">): Promise<ICompetency> => {
  console.log("Creating competency with data:", data);
  const response = await axios.post(`${API_BASE}/competencies`, data);
  console.log("Created competency response:", response.data);
  return response.data;
};

// Get all competencies (paginated)
export const getCompetencies = async (page = 1, limit = 10): Promise<PaginatedCompetencies> => {
  console.log(`Fetching competencies: page=${page}, limit=${limit}`);
  const response = await axios.get(`${API_BASE}/competencies`, { params: { page, limit } });
  console.log("Fetched competencies response:", response.data);
  return response.data;
};

// Get a single competency by ID
export const getCompetencyById = async (id: string): Promise<ICompetency> => {
  console.log("Fetching competency by ID:", id);
  const response = await axios.get(`${API_BASE}/competencies/${id}`);
  console.log("Fetched competency response:", response.data);
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
  console.log("Updating competency:", { id, payload });
  if (Object.keys(payload).length === 0) {
    throw new Error("No valid fields provided to update.");
  }
  const response = await axios.patch(`${API_BASE}/competencies/${id}`, payload);
  console.log("Updated competency response:", response.data);
  return response.data;
};


// Delete a competency
export const deleteCompetency = async (id: string): Promise<void> => {
  console.log("Deleting competency with ID:", id);
  await axios.delete(`${API_BASE}/competencies/${id}`);
  console.log("Deleted competency with ID:", id);
};

// =========================
// Strand APIs
// =========================

// Create a new strand
export const createStrand = async (data: Omit<IStrand, "_id" | "createdAt" | "updatedAt">): Promise<IStrand> => {
  const response = await axios.post(`${API_BASE}/strands`, data);
  return response.data;
};

// Get all strands (paginated)
export const getStrands = async (page = 1, limit = 10): Promise<PaginatedStrands> => {
  const response = await axios.get(`${API_BASE}/strands`, { params: { page, limit } });
  return response.data;
};

// Get a single strand by ID
export const getStrandById = async (id: string): Promise<IStrand> => {
  const response = await axios.get(`${API_BASE}/strands/${id}`);
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
  const response = await axios.patch(`${API_BASE}/strands/${id}`, payload);
  return response.data;
};

// Delete a strand
export const deleteStrand = async (id: string): Promise<void> => {
  await axios.delete(`${API_BASE}/strands/${id}`);
};


