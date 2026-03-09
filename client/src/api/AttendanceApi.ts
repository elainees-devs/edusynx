// client/src/api/attendance.api.ts
import axios from "axios";
import type {
  AttendanceStatus,
  IAttendance,
} from "../types/school/AttendanceTypes";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

export const attendanceApi = {
  /**
   * Fetch a single attendance sheet for a class/stream on a specific date.
   * Based on controller: GET /attendance/class?classId=...&streamId=...&date=...
   */
  getAttendanceByClassAndDate: async (
    classId: string,
    streamId: string,
    date: string,
  ): Promise<{
    success: boolean;
    data: IAttendance | null;
    page?: number;
    total?: number;
  }> => {
    const response = await api.get("/attendance/class", {
      params: { classId, streamId, date },
    });
    return response.data;
  },

  /**
   * Create a new attendance record.
   * POST /attendance
   */
  createAttendance: async (
    attendanceData: Partial<IAttendance>,
  ): Promise<IAttendance> => {
    const response = await api.post("/attendance", attendanceData);
    return response.data;
  },

  /**
   * Replace the full attendance array for an existing record.
   * PATCH /attendance/:id
   */
  updateFullAttendance: async (
    id: string,
    attendanceArray: { studentId: string; status: AttendanceStatus }[],
  ): Promise<IAttendance> => {
    const response = await api.patch(`/attendance/${id}`, {
      attendance: attendanceArray,
    });
    return response.data;
  },

  /**
   * Update a specific student's status within an attendance record.
   * PATCH /attendance/student/:attendanceId/:studentId
   */
  updateStudentStatus: async (
    attendanceId: string,
    studentId: string,
    status: AttendanceStatus,
  ): Promise<IAttendance> => {
    const response = await api.patch(
      `/attendance/student/${attendanceId}/${studentId}`,
      { status },
    );
    return response.data;
  },

  /**
   * Get the flattened list of all attendance records for the UI table.
   * GET /attendance/
   */
  getAllAttendanceFlattened: async (): Promise<IAttendance[]> => {
    const response = await api.get("/attendance");
    return response.data;
  },

  /**
   * Delete an attendance record.
   * DELETE /attendance/:id
   */
  deleteAttendance: async (id: string): Promise<void> => {
    await api.delete(`/attendance/${id}`);
  },

  /**
   * Get attendance by unique ID.
   * GET /attendance/:id
   */
  getAttendanceById: async (id: string): Promise<IAttendance> => {
    const response = await api.get(`/attendance/${id}`);
    return response.data;
  },
};
