// client/src/api/stream.api.ts
import axios from "axios";
import type { GetPageParams, IStream, PaginatedStreams } from "../types";

const BASE_URL = "http://localhost:5000/api/v1";

/* ==============================
   Register stream (POST)
================================ */
export const registerStream = async (data: {
  streamName: string;
}): Promise<IStream> => {
  try {
    const response = await axios.post(`${BASE_URL}/streams`, data);
    return response.data;
  } catch (error) {
    console.error("Failed to add stream:", error);
    throw error;
};
}


// // Fetch all streams
export const getAllStreams = async (): Promise<IStream[]> => {
  const response = await axios.get(`${BASE_URL}/streams`);
  console.log("📦 Full response.data:", response.data);
  return response.data // array of objects {_id, streamName}
};

/* ==============================
   Fetch streams (paginated)
================================ */

export const getStreams = async (
  params: GetPageParams
): Promise<PaginatedStreams> => {
  const response = await axios.get(`${BASE_URL}/streams`, {
    params,
  });

  return response.data;
};

/* ==============================
   Update stream (PATCH)
================================ */
export const updateStream = async (
  id: string,
  data: Partial<Omit<IStream, "_id" | "createdAt" | "updatedAt">>,
): Promise<IStream> => {
  // Remove undefined or empty string fields, and convert date fields to ISO
  const payload = Object.fromEntries(
    Object.entries(data)
      .filter(([, value]) => value !== undefined && value !== "")
      .map(([key, value]) => {
        return [key, value];
      }),
  );

  if (Object.keys(payload).length === 0) {
    throw new Error("No valid fields provided to update.");
  }

  const { data: updatedStream } = await axios.patch(
    `${BASE_URL}/streams/${id}`,
    payload,
  );

  return updatedStream;
};


/* ==============================
   Get streams by school
================================ */

export const getStreamsBySchool = async (schoolId: string): Promise<IStream[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/stream/school/${schoolId}`);
    console.log("📦 Full response.data:", response.data);

    // response.data is an object with streams array inside
    if (Array.isArray(response.data.streams)) {
      return response.data.streams;
    } else {
      throw new Error("Expected an array of streams inside response.data.streams");
    }
  } catch (error) {
    console.error("Failed to fetch streams:", error);
    throw error;
  }
};

/* ==============================
   Delete stream
================================ */

export const deleteStream = async (
  id: string
): Promise<{ message: string }> => {
  const response = await axios.delete(`${BASE_URL}/streams/${id}`);
  return response.data;
};

/* ==============================
   Count streams
================================ */
export const countStreams = async (): Promise<{ count: number }> => {
  const response = await axios.get(`${BASE_URL}/streams/count`);
  return response.data;
}



