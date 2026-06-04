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
    mockReq = { params: {}, body: {}, query: {} };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };
  });

  describe("createAttendance", () => {
    it("should successfully create attendance", async () => {
      const mockData = { _id: "att-1", school: "sch-1" };
      (AttendanceRepository.prototype.create as jest.Mock).mockResolvedValue(mockData);

      mockReq.body = {
        school: "654321098765432109876543", // Valid ObjectId string
        classRef: "654321098765432109876544",
        streamId: "654321098765432109876545",
        schoolYear: "2026",
        date: "2026-06-04T00:00:00.000Z",
        createdBy: "654321098765432109876546",
        attendance: [
          { studentId: "654321098765432109876547", status: "present" }
        ]
      };

      await controller.createAttendance(
        mockReq as Request,
        mockRes as Response,
        jest.fn()
      );

      expect(AttendanceRepository.prototype.create).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        data: mockData
      });
    });
  });

  describe("updateAttendance", () => {
    it("should transform entries and update through repository", async () => {
      const mockResult = { _id: "att-1" };
      (AttendanceRepository.prototype.updateAttendance as jest.Mock).mockResolvedValue(mockResult);

      mockReq.params = { id: "att-1" };
      mockReq.body = {
        attendance: [{ studentId: "654321098765432109876547", status: "absent" }],
        updatedBy: "654321098765432109876546",
        remarks: "Updated"
      };

      await controller.updateAttendance(
        mockReq as Request,
        mockRes as Response,
        jest.fn()
      );

      expect(AttendanceRepository.prototype.updateAttendance).toHaveBeenCalled();
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        data: mockResult
      });
    });
  });
});
