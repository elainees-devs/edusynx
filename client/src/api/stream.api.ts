// client/src/api/stream.api.ts
import axios from "axios";
import type { IStream } from "../types";

const BASE_URL = "http://localhost:5000/api/v1"; 

export const registerStream = async (data: {
  streamName: string;
}): Promise<IStream> => {
  try {
    const response = await axios.post(`${BASE_URL}/stream`, data);
    return response.data;
  } catch (error) {
    console.error("Failed to add stream:", error);
    throw error;
};
}
