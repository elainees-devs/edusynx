// client/src/api/subject.api.ts
import axios from "axios";
import type {ISubject} from "../types";

const BASE_URL = "http://localhost:5000/api/v1";

export const registerSubject = async (data: {
  subjectName: string;
}): Promise<ISubject> => {
  try {
    const response = await axios.post(`${BASE_URL}/subjects`, data);

    return response.data;
  } catch (error) {
    console.error("Failed to add subject:", error);
    throw error;
};
}


//  fetch all subjects
export const getAllSubjects = async (): Promise<ISubject[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/subjects`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch subjects:", error);
    throw error;
  }
};

// Fetch all subjects for a specific school

export const getSubjectBySchool = async (schoolId: string): Promise<ISubject[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/s/school/${schoolId}`);
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



