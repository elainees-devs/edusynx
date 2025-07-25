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



