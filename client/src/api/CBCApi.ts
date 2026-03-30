import axios from "axios";
import type { ICompetency, PaginatedCompetencies } from "../types";

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
