import { StudentRepository } from "../../../repositories/people/student.repository";
import { StudentModel } from "../../../models";
import { StudentStatus } from "../../../types";

jest.mock("../../../models/people/student.model");

function mockQuery(resolved: unknown) {
  const q = {
    populate: jest.fn().mockReturnThis(),
    then: jest.fn((onFulfilled: (v: unknown) => unknown) =>
      Promise.resolve(onFulfilled(resolved)),
    ),
    catch: jest.fn(),
  };
  return q;
}

describe("StudentRepository — Phase 2B", () => {
  let repo: StudentRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    repo = new StudentRepository();
  });

  describe("promoteStudents", () => {
    it("should update all ACTIVE students and push history entries", async () => {
      const mockStudents = [
        { _id: "s1", classId: "class-a", stream: "stream-x" },
        { _id: "s2", classId: "class-a", stream: "stream-x" },
      ];
      (StudentModel.find as jest.Mock).mockResolvedValue(mockStudents);
      (StudentModel.bulkWrite as jest.Mock).mockResolvedValue({ ok: 1 });

      const result = await repo.promoteStudents("class-a", "class-b", "stream-y", "2025");

      expect(StudentModel.find).toHaveBeenCalledWith(
        { classId: "class-a", status: StudentStatus.ACTIVE },
      );
      expect(StudentModel.bulkWrite).toHaveBeenCalledTimes(1);
      expect(result.modifiedCount).toBe(2);
    });

    it("should return 0 modified when no ACTIVE students exist", async () => {
      (StudentModel.find as jest.Mock).mockResolvedValue([]);

      const result = await repo.promoteStudents("class-empty", "class-b", "stream-y");

      expect(StudentModel.bulkWrite).not.toHaveBeenCalled();
      expect(result.modifiedCount).toBe(0);
    });
  });

  describe("transferStudent", () => {
    it("should update class, stream, status, and push history entry", async () => {
      const existingStudent = {
        _id: "student-1",
        classId: "class-a",
        stream: "stream-x",
      };
      (StudentModel.findById as jest.Mock).mockResolvedValue(existingStudent);

      const updatedDoc = {
        _id: "student-1",
        studentFirstName: "John",
        classId: { _id: "class-b", clasName: "Grade 2" },
        stream: { _id: "stream-y", streamName: "B" },
      };
      (StudentModel.findByIdAndUpdate as jest.Mock).mockReturnValue(mockQuery(updatedDoc));

      const result = await repo.transferStudent("student-1", "class-b", "stream-y", "Family moved");

      expect(StudentModel.findById).toHaveBeenCalledWith("student-1");
      expect(StudentModel.findByIdAndUpdate).toHaveBeenCalledWith(
        "student-1",
        expect.objectContaining({
          $set: expect.objectContaining({
            classId: "class-b",
            stream: "stream-y",
            status: StudentStatus.TRANSFERRED,
          }),
          $push: expect.objectContaining({
            history: expect.objectContaining({
              action: "transferred",
              fromClass: "class-a",
              toClass: "class-b",
              fromStream: "stream-x",
              toStream: "stream-y",
              reason: "Family moved",
            }),
          }),
        }),
        { new: true },
      );
      expect(result).toEqual(updatedDoc);
    });

    it("should return null when student is not found", async () => {
      (StudentModel.findById as jest.Mock).mockResolvedValue(null);

      const result = await repo.transferStudent("nonexistent", "class-b", "stream-y");

      expect(StudentModel.findByIdAndUpdate).not.toHaveBeenCalled();
      expect(result).toBeNull();
    });
  });

  describe("graduateStudents", () => {
    it("should update status to GRADUATED and push history entries", async () => {
      const mockStudents = [
        { _id: "s1", classId: "class-a", stream: "stream-x" },
        { _id: "s2", classId: "class-b", stream: "stream-y" },
        { _id: "s3", classId: "class-c", stream: "stream-z" },
      ];
      (StudentModel.find as jest.Mock).mockResolvedValue(mockStudents);
      (StudentModel.bulkWrite as jest.Mock).mockResolvedValue({ ok: 1 });

      const ids = ["s1", "s2", "s3"];
      const result = await repo.graduateStudents(ids);

      expect(StudentModel.find).toHaveBeenCalledWith({ _id: { $in: ids } });
      expect(StudentModel.bulkWrite).toHaveBeenCalledTimes(1);
      expect(result.modifiedCount).toBe(3);
    });

    it("should return 0 modified when no students match", async () => {
      (StudentModel.find as jest.Mock).mockResolvedValue([]);

      const result = await repo.graduateStudents(["nonexistent"]);

      expect(StudentModel.bulkWrite).not.toHaveBeenCalled();
      expect(result.modifiedCount).toBe(0);
    });
  });

  describe("getStudentHistory", () => {
    it("should return student with populated class, stream, and guardian", async () => {
      const studentDoc = {
        _id: "student-1",
        studentFirstName: "John",
        studentLastName: "Doe",
        classId: { _id: "class-a", clasName: "Grade 1" },
        stream: { _id: "stream-a", streamName: "A" },
        guardian: { _id: "guardian-1", firstName: "Parent", lastName: "Doe", email: "p@e.com", phoneNumber: "123" },
      };
      (StudentModel.findById as jest.Mock).mockReturnValue(mockQuery(studentDoc));

      const result = await repo.getStudentHistory("student-1");

      expect(StudentModel.findById).toHaveBeenCalledWith("student-1");
      expect(result).toEqual(studentDoc);
    });

    it("should return null when student is not found", async () => {
      (StudentModel.findById as jest.Mock).mockReturnValue(mockQuery(null));

      const result = await repo.getStudentHistory("nonexistent");

      expect(result).toBeNull();
    });
  });

  describe("findAllStudents", () => {
    it("should filter by status when provided", async () => {
      (StudentModel.find as jest.Mock).mockReturnValue(mockQuery([]));

      await repo.findAllStudents("active");

      expect(StudentModel.find).toHaveBeenCalledWith({ status: "active" });
    });

    it("should return all students when no status filter", async () => {
      (StudentModel.find as jest.Mock).mockReturnValue(mockQuery([]));

      await repo.findAllStudents();

      expect(StudentModel.find).toHaveBeenCalledWith({});
    });
  });
});
