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

describe("StudentRepository — Phase 2B.1", () => {
  let repo: StudentRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    repo = new StudentRepository();
  });

  describe("promoteStudents", () => {
    it("should update all ACTIVE students in the source class", async () => {
      const mockResult = { acknowledged: true, matchedCount: 5, modifiedCount: 5 };
      (StudentModel.updateMany as jest.Mock).mockResolvedValue(mockResult);

      const result = await repo.promoteStudents("class-a", "class-b", "stream-x");

      expect(StudentModel.updateMany).toHaveBeenCalledWith(
        { classId: "class-a", status: StudentStatus.ACTIVE },
        { $set: { classId: "class-b", stream: "stream-x" } },
      );
      expect(result.modifiedCount).toBe(5);
    });

    it("should return 0 modified when no ACTIVE students exist", async () => {
      const mockResult = { acknowledged: true, matchedCount: 0, modifiedCount: 0 };
      (StudentModel.updateMany as jest.Mock).mockResolvedValue(mockResult);

      const result = await repo.promoteStudents("class-empty", "class-b", "stream-x");

      expect(result.modifiedCount).toBe(0);
    });
  });

  describe("transferStudent", () => {
    it("should update class, stream, and set status to TRANSFERRED", async () => {
      const studentDoc = {
        _id: "student-1",
        studentFirstName: "John",
        classId: { _id: "class-b", clasName: "Grade 2" },
        stream: { _id: "stream-y", streamName: "B" },
      };
      (StudentModel.findByIdAndUpdate as jest.Mock).mockReturnValue(mockQuery(studentDoc));

      const result = await repo.transferStudent("student-1", "class-b", "stream-y");

      expect(StudentModel.findByIdAndUpdate).toHaveBeenCalledWith(
        "student-1",
        {
          $set: {
            classId: "class-b",
            stream: "stream-y",
            status: StudentStatus.TRANSFERRED,
          },
        },
        { new: true },
      );
      expect(result).toEqual(studentDoc);
    });

    it("should return null when student is not found", async () => {
      (StudentModel.findByIdAndUpdate as jest.Mock).mockReturnValue(mockQuery(null));

      const result = await repo.transferStudent("nonexistent", "class-b", "stream-y");

      expect(result).toBeNull();
    });
  });

  describe("graduateStudents", () => {
    it("should update status to GRADUATED for given student IDs", async () => {
      const mockResult = { acknowledged: true, matchedCount: 3, modifiedCount: 3 };
      (StudentModel.updateMany as jest.Mock).mockResolvedValue(mockResult);

      const ids = ["s1", "s2", "s3"];
      const result = await repo.graduateStudents(ids);

      expect(StudentModel.updateMany).toHaveBeenCalledWith(
        { _id: { $in: ids } },
        { $set: { status: StudentStatus.GRADUATED } },
      );
      expect(result.modifiedCount).toBe(3);
    });

    it("should return 0 modified when no students match", async () => {
      const mockResult = { acknowledged: true, matchedCount: 0, modifiedCount: 0 };
      (StudentModel.updateMany as jest.Mock).mockResolvedValue(mockResult);

      const result = await repo.graduateStudents(["nonexistent"]);

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
});
