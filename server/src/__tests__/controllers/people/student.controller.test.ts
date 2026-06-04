import { Request, Response } from "express";
import { StudentController } from "../../../controllers/people/student.controller";
import { StudentRepository } from "../../../repositories/people/student.repository";

jest.mock("../../../repositories/people/student.repository");

function tick(): Promise<void> {
  return new Promise((resolve) => setImmediate(resolve));
}

describe("StudentController — Phase 2B", () => {
  let controller: StudentController;
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;

  beforeEach(() => {
    jest.clearAllMocks();
    controller = new StudentController();
    mockReq = { params: {}, body: {}, query: {} };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };
  });

  describe("promoteStudents", () => {
    it("should pass academicYear to repo and return modifiedCount", async () => {
      const mockResult = { modifiedCount: 5 };
      (StudentRepository.prototype.promoteStudents as jest.Mock).mockResolvedValue(mockResult);
      mockReq.body = {
        sourceClassId: "class-a",
        targetClassId: "class-b",
        targetStreamId: "stream-x",
        academicYear: "2025",
      };

      await controller.promoteStudents(
        mockReq as Request,
        mockRes as Response,
        jest.fn(),
      );

      expect(StudentRepository.prototype.promoteStudents).toHaveBeenCalledWith(
        "class-a", "class-b", "stream-x", "2025",
      );
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "5 student(s) promoted successfully",
        modifiedCount: 5,
      });
    });

    it("should return 0 modifiedCount when no students to promote", async () => {
      const mockResult = { modifiedCount: 0 };
      (StudentRepository.prototype.promoteStudents as jest.Mock).mockResolvedValue(mockResult);
      mockReq.body = {
        sourceClassId: "class-empty",
        targetClassId: "class-b",
        targetStreamId: "stream-x",
        academicYear: "2025",
      };

      await controller.promoteStudents(
        mockReq as Request,
        mockRes as Response,
        jest.fn(),
      );

      expect(mockRes.json).toHaveBeenCalledWith({
        message: "0 student(s) promoted successfully",
        modifiedCount: 0,
      });
    });
  });

  describe("transferStudent", () => {
    it("should pass reason to repo and return transferred student", async () => {
      const mockStudent = {
        _id: "student-1",
        studentFirstName: "John",
        classId: { _id: "class-b", clasName: "Grade 2" },
        stream: { _id: "stream-y", streamName: "B" },
      };
      (StudentRepository.prototype.transferStudent as jest.Mock).mockResolvedValue(mockStudent);
      mockReq.params = { id: "student-1" };
      mockReq.body = { targetClassId: "class-b", targetStreamId: "stream-y", reason: "Medical" };

      await controller.transferStudent(
        mockReq as Request,
        mockRes as Response,
        jest.fn(),
      );

      expect(StudentRepository.prototype.transferStudent).toHaveBeenCalledWith(
        "student-1", "class-b", "stream-y", "Medical",
      );
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Student transferred successfully",
        student: mockStudent,
      });
    });

    it("should pass AppError(404) to next when student not found", async () => {
      (StudentRepository.prototype.transferStudent as jest.Mock).mockResolvedValue(null);
      mockReq.params = { id: "nonexistent" };
      mockReq.body = { targetClassId: "class-b", targetStreamId: "stream-y" };

      const mockNext = jest.fn();
      controller.transferStudent(
        mockReq as Request,
        mockRes as Response,
        mockNext,
      );
      await tick();

      expect(mockNext).toHaveBeenCalledWith(
        expect.objectContaining({ message: "Student not found", status: 404 }),
      );
    });
  });

  describe("graduateStudents", () => {
    it("should return modifiedCount on successful graduation", async () => {
      const mockResult = { modifiedCount: 3 };
      (StudentRepository.prototype.graduateStudents as jest.Mock).mockResolvedValue(mockResult);
      mockReq.body = { studentIds: ["s1", "s2", "s3"] };

      await controller.graduateStudents(
        mockReq as Request,
        mockRes as Response,
        jest.fn(),
      );

      expect(StudentRepository.prototype.graduateStudents).toHaveBeenCalledWith(
        ["s1", "s2", "s3"],
      );
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "3 student(s) graduated successfully",
        modifiedCount: 3,
      });
    });

    it("should return 0 modifiedCount when no students match", async () => {
      const mockResult = { modifiedCount: 0 };
      (StudentRepository.prototype.graduateStudents as jest.Mock).mockResolvedValue(mockResult);
      mockReq.body = { studentIds: ["nonexistent"] };

      await controller.graduateStudents(
        mockReq as Request,
        mockRes as Response,
        jest.fn(),
      );

      expect(mockRes.json).toHaveBeenCalledWith({
        message: "0 student(s) graduated successfully",
        modifiedCount: 0,
      });
    });
  });

  describe("getStudentHistory", () => {
    it("should return student when found", async () => {
      const mockStudent = {
        _id: "student-1",
        studentFirstName: "John",
        classId: { _id: "class-a", clasName: "Grade 1" },
        stream: { _id: "stream-a", streamName: "A" },
      };
      (StudentRepository.prototype.getStudentHistory as jest.Mock).mockResolvedValue(mockStudent);
      mockReq.params = { id: "student-1" };

      await controller.getStudentHistory(
        mockReq as Request,
        mockRes as Response,
        jest.fn(),
      );

      expect(StudentRepository.prototype.getStudentHistory).toHaveBeenCalledWith("student-1");
      expect(mockRes.json).toHaveBeenCalledWith(mockStudent);
    });

    it("should pass AppError(404) to next when student not found", async () => {
      (StudentRepository.prototype.getStudentHistory as jest.Mock).mockResolvedValue(null);
      mockReq.params = { id: "nonexistent" };

      const mockNext = jest.fn();
      controller.getStudentHistory(
        mockReq as Request,
        mockRes as Response,
        mockNext,
      );
      await tick();

      expect(mockNext).toHaveBeenCalledWith(
        expect.objectContaining({ message: "Student not found", status: 404 }),
      );
    });
  });
});
