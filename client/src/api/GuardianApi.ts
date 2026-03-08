// client/src/api/guardian.api.ts
import axios from "axios";
import type { GetPageParams, Guardian, PaginatedGuardians } from "../types";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1";

/* ==============================
   Fetch guardians (paginated)
================================ */

export const getGuardians = async (
  params: GetPageParams,
): Promise<PaginatedGuardians> => {
  const response = await axios.get(`${API_BASE}/guardians`, {
    params,
  });

  return response.data;
};

/* ==============================
Update guardian (PATCH)
================================ */
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

  const { data: updatedGuardian } = await axios.patch(
    `${API_BASE}/guardians/${id}`,
    payload,
  );

  return updatedGuardian;
};
