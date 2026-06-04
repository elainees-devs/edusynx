import apiClient from "./client";
import type { SubjectAssignment } from "../types/school/Allocation";

export const registerTeacherSubjectAllocation = async (data: {
  schoolId: string;
  allocation: {
    teacher: string;
    subject: string;
    clasName: string;
    stream: string;
  };
}): Promise<SubjectAssignment> => {
  try {
    const response = await apiClient.post("/teacher-subject-allocations", data);
    return response.data;
  } catch (error) {
    console.error("Failed to add teacher-subject allocation:", error);
    throw error;
  }
};
