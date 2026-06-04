import { describe, it, expect, vi, beforeEach } from "vitest";
import apiClient from "../client";
import { attendanceApi } from "../AttendanceApi";

vi.mock("../client");
const mockedClient = vi.mocked(apiClient);

describe("AttendanceApi - Phase 5", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("getAttendanceTrends calls GET /analytics/attendance/trends with params", async () => {
    mockedClient.get.mockResolvedValue({ data: { success: true, data: [] } });
    
    await attendanceApi.getAttendanceTrends("c1", "s1", "2026-01-01", "2026-01-31");

    expect(mockedClient.get).toHaveBeenCalledWith("/analytics/attendance/trends", {
      params: { classId: "c1", streamId: "s1", startDate: "2026-01-01", endDate: "2026-01-31" },
    });
  });

  it("getAtRiskStudents calls GET /analytics/attendance/at-risk with params", async () => {
    mockedClient.get.mockResolvedValue({ data: { success: true, data: [] } });

    await attendanceApi.getAtRiskStudents("sch1", "2026", 75);

    expect(mockedClient.get).toHaveBeenCalledWith("/analytics/attendance/at-risk", {
      params: { schoolId: "sch1", schoolYear: "2026", threshold: 75 },
    });
  });

  it("getStudentAnalytics calls GET /analytics/attendance/student/:id", async () => {
    mockedClient.get.mockResolvedValue({ data: { success: true, data: {} } });

    await attendanceApi.getStudentAnalytics("std1");

    expect(mockedClient.get).toHaveBeenCalledWith("/analytics/attendance/student/std1");
  });

  it("getClassAnalytics calls GET /analytics/attendance/class/:id with params", async () => {
    mockedClient.get.mockResolvedValue({ data: { success: true, data: {} } });

    await attendanceApi.getClassAnalytics("c1", "2026-01-01", "2026-01-31");

    expect(mockedClient.get).toHaveBeenCalledWith("/analytics/attendance/class/c1", {
      params: { startDate: "2026-01-01", endDate: "2026-01-31" },
    });
  });
});