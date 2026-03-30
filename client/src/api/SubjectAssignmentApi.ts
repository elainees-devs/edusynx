import axios from "axios";
import type { SubjectAssignment } from "../types/school/Allocation";

const BASE_URL = "http://localhost:5000/api/v1";

/* ==============================
   Register teacher-subject allocation (POST)
================================ */
export const registerTeacherSubjectAllocation = async (data: {
  schoolId: string;
  allocation: {
    teacher: string;
    subject: string;
    className: string;
    stream: string;
  };
}): Promise<SubjectAssignment> => {
  try {
    const response = await axios.post(`${BASE_URL}/teacher-subject-allocations`, data);
    return response.data;
  } catch (error) {
    console.error("Failed to add teacher-subject allocation:", error);
    throw error;
  }
};
