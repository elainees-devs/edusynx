// client/src/api/attendance.api.ts
import axios from "axios";
import type { IAttendance, IStudentAttendance, PaginatedAttendanceRecords } from "../types";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

/* ==============================
   Create a new attendance record (POST)
================================ */
export const createAttendance = async (data: IAttendance): Promise<IAttendance> => {
  try {
    const response = await axios.post(`${API_BASE}/attendance`, data);
    console.log("Attendance created:", response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error creating attendance:", error.response?.data);
      throw error.response?.data || { message: "Failed to create attendance" };
    }
    throw { message: "Unknown error occurred while creating attendance" };
  }
};

/* ==============================
   Get attendance by ID (GET)
================================ */
export const getAttendanceById = async (id: string): Promise<IAttendance> => {
  const response = await axios.get(`${API_BASE}/attendance/${id}`);
  return response.data;
};

/* ==============================
   Get attendance for a class on a specific date with pagination (GET)
================================ */
export const getAttendanceByClassAndDate = async (
  classId: string,
  date: string,
  page = 1,
  limit = 10
): Promise<PaginatedAttendanceRecords> => {
  try {
    const response = await axios.get(`${API_BASE}/attendance/class`, {
      params: { classId, date, page, limit },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error fetching attendance:", error.response?.data);
      throw error.response?.data || { message: "Failed to fetch attendance" };
    }
    throw { message: "Unknown error occurred while fetching attendance" };
  }
};

/* ==============================
   Update a specific student's attendance status (PATCH)
================================ */
export const updateStudentAttendanceStatus = async (
  attendanceId: string,
  studentId: string,
  status: "present" | "absent" | "late" | "excused"
): Promise<IStudentAttendance> => {
  const response = await axios.patch(
    `${API_BASE}/attendance/student/${attendanceId}/${studentId}`,
    { status }
  );
  return response.data;
};

/* ==============================
   Replace full attendance array for a class/date (PATCH)
================================ */
export const updateAttendance = async (
  id: string,
  data: Partial<IAttendance>
): Promise<IAttendance> => {
  const payload = Object.fromEntries(
    Object.entries(data).filter(([, value]) => value !== undefined && value !== "")
  );

  if (Object.keys(payload).length === 0) {
    throw new Error("No valid fields provided to update.");
  }

  const response = await axios.patch(`${API_BASE}/attendance/${id}`, payload);
  return response.data;
};

/* ==============================
   Delete attendance record by ID (DELETE)
================================ */
export const deleteAttendance = async (id: string): Promise<void> => {
  await axios.delete(`${API_BASE}/attendance/${id}`);
};
