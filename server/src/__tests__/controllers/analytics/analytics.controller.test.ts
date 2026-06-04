import { Request, Response } from "express";
import { AnalyticsController } from "../../../controllers/analytics/analytics.controller";
import { AttendanceService } from "../../../services/attendance.service";
import { AttendanceRepository } from "../../../repositories/school-core/attendance.repository";

jest.mock("../../../services/attendance.service");
jest.mock("../../../repositories/school-core/attendance.repository");

describe("AnalyticsController - Attendance", () => {
  let controller: AnalyticsController;
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;

  beforeEach(() => {
    jest.clearAllMocks();
    controller = new AnalyticsController();
    mockReq = { params: {}, body: {}, query: {} };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  describe("getClassAttendanceAnalytics", () => {
    it("should return class-wide analytics summary", async () => {
      const mockRecords = [{ _id: "rec1" }];
      const mockSummary = { totalStudents: 10, attendanceRate: 90 };
      
      (AttendanceRepository.prototype.findByClass as jest.Mock).mockResolvedValue(mockRecords);
      (AttendanceService.prototype.calculateOverallSummary as jest.Mock).mockReturnValue(mockSummary);

      mockReq.params = { id: "class-1" };
      mockReq.query = { startDate: "2026-01-01", endDate: "2026-01-31" };

      await controller.getClassAttendanceAnalytics(
        mockReq as Request,
        mockRes as Response,
        jest.fn()
      );

      expect(AttendanceRepository.prototype.findByClass).toHaveBeenCalled();
      expect(AttendanceService.prototype.calculateOverallSummary).toHaveBeenCalledWith(mockRecords);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        data: mockSummary
      });
    });

    it("should throw error if dates are missing", async () => {
      mockReq.params = { id: "class-1" };
      mockReq.query = {};

      const next = jest.fn();
      await controller.getClassAttendanceAnalytics(
        mockReq as Request,
        mockRes as Response,
        next
      );

      expect(next).toHaveBeenCalledWith(expect.objectContaining({
        message: "startDate and endDate are required",
        statusCode: 400
      }));
    });
  });

  describe("getStudentAttendanceAnalytics", () => {
    it("should return student-specific analytics", async () => {
      const mockRecords = [{ _id: "rec2" }];
      const mockSummary = { studentId: "std1", attendanceRate: 95 };

      (AttendanceRepository.prototype.findByStudent as jest.Mock).mockResolvedValue(mockRecords);
      (AttendanceService.prototype.calculateStudentSummary as jest.Mock).mockReturnValue(mockSummary);

      mockReq.params = { id: "std1" };

      await controller.getStudentAttendanceAnalytics(
        mockReq as Request,
        mockRes as Response,
        jest.fn()
      );

      expect(AttendanceRepository.prototype.findByStudent).toHaveBeenCalledWith("std1");
      expect(AttendanceService.prototype.calculateStudentSummary).toHaveBeenCalledWith(mockRecords, "std1");
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        data: mockSummary
      });
    });
  });
});
