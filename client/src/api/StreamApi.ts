// client/src/api/stream.api.ts
import apiClient from "./client";
import axios from "axios";
import type { GetPageParams, IStream, PaginatedStreams } from "../types";

export const registerStream = async (data: {
  streamName: string;
}): Promise<IStream> => {
  try {
    const response = await apiClient.post("/streams", data);
    return response.data;
  } catch (error) {
    console.error("Failed to add stream:", error);
    throw error;
  };
}

export const getAllStreams = async (): Promise<IStream[]> => {
  const response = await apiClient.get("/streams");
  return response.data.data || [];
};

export const getStreams = async (
  params: GetPageParams
): Promise<PaginatedStreams> => {
  const response = await apiClient.get("/streams", {
    params,
  });

  return response.data;
};

export const updateStream = async (
  id: string,
  data: Partial<Omit<IStream, "_id" | "createdAt" | "updatedAt">>,
): Promise<IStream> => {
  const payload = Object.fromEntries(
    Object.entries(data)
      .filter(([, value]) => value !== undefined && value !== "")
  );

  if (Object.keys(payload).length === 0) {
    throw new Error("No valid fields provided to update.");
  }

  const { data: updatedStream } = await apiClient.patch(
    `/streams/${id}`,
    payload,
  );

  return updatedStream;
};

export const getStreamsBySchool = async (schoolId: string): Promise<IStream[]> => {
  try {
    const response = await apiClient.get(`/stream/school/${schoolId}`);

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

export const deleteStream = async (
  id: string
): Promise<{ message: string }> => {
  const response = await apiClient.delete(`/streams/${id}`);
  return response.data;
};

export const countStreams = async (): Promise<{ count: number }> => {
  const response = await apiClient.get("/streams/count");
  return response.data;
}



