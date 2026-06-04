import { Request, Response } from "express";
import { AttendanceController } from "../../../controllers/school-core/attendance.controller";
import { AttendanceRepository } from "../../../repositories/school-core/attendance.repository";

jest.mock("../../../repositories/school-core/attendance.repository");

describe("AttendanceController", () => {
  let controller: AttendanceController;
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;

  beforeEach(() => {
    jest.clearAllMocks();
    controller = new AttendanceController();
    mockReq = { params: {}, body: {}, query: {}, user: { _id: "654321098765432109876546" } as any };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };
  });

  describe("createAttendance", () => {
    it("should successfully create attendance using req.user as creator", async () => {
      const mockData = { _id: "att-1", school: "sch-1" };
      (AttendanceRepository.prototype.create as jest.Mock).mockResolvedValue(mockData);

      mockReq.body = {
        school: "654321098765432109876543", 
        classRef: "654321098765432109876544",
        streamId: "654321098765432109876545",
        schoolYear: "2026",
        date: "2026-06-04T00:00:00.000Z",
        attendance: [
          { studentId: "654321098765432109876547", status: "present" }
        ]
      };

      await controller.createAttendance(
        mockReq as any,
        mockRes as Response,
        jest.fn()
      );

      expect(AttendanceRepository.prototype.create).toHaveBeenCalledWith(
        expect.objectContaining({
          createdBy: "654321098765432109876546"
        })
      );
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        data: mockData
      });
    });
  });

  describe("updateAttendance", () => {
    it("should transform entries and update through repository using req.user", async () => {
      const mockResult = { _id: "att-1" };
      (AttendanceRepository.prototype.updateAttendance as jest.Mock).mockResolvedValue(mockResult);

      mockReq.params = { id: "att-1" };
      mockReq.body = {
        attendance: [{ studentId: "654321098765432109876547", status: "absent" }],
        remarks: "Updated"
      };

      await controller.updateAttendance(
        mockReq as any,
        mockRes as Response,
        jest.fn()
      );

      expect(AttendanceRepository.prototype.updateAttendance).toHaveBeenCalledWith(
        "att-1",
        expect.any(Array),
        "654321098765432109876546",
        "Updated"
      );
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        data: mockResult
      });
    });
  });

  describe("getAttendanceRecords", () => {
    it("should return all attendance records", async () => {
      const mockRecords = [{ _id: "att-1" }];
      (AttendanceRepository.prototype.findAll as jest.Mock).mockResolvedValue(mockRecords);

      await controller.getAllAttendance(
        mockReq as any,
        mockRes as Response,
        jest.fn()
      );

      expect(AttendanceRepository.prototype.findAll).toHaveBeenCalled();
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        data: mockRecords
      });
    });
  });

  describe("getAttendanceByClassAndDate", () => {
    it("should return single record for class/stream/date", async () => {
      const mockRecord = { _id: "att-1" };
      (AttendanceRepository.prototype.findByClassStreamAndDate as jest.Mock).mockResolvedValue(mockRecord);

      mockReq.query = {
        classId: "654321098765432109876544",
        streamId: "654321098765432109876545",
        date: "2026-06-04"
      };

      await controller.getAttendanceByClassAndDate(
        mockReq as any,
        mockRes as Response,
        jest.fn()
      );

      expect(AttendanceRepository.prototype.findByClassStreamAndDate).toHaveBeenCalled();
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        data: mockRecord
      });
    });
  });
});
