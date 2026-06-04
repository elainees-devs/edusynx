import { StaffRepository } from "../../../repositories/people/staff.repository";
import { StaffModel } from "../../../models";

jest.mock("../../../models/people/staff.model");

function mockQuery(resolved: unknown) {
  const q = {
    populate: jest.fn().mockReturnThis(),
    sort: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    then: jest.fn((onFulfilled: (v: unknown) => unknown) =>
      Promise.resolve(onFulfilled(resolved)),
    ),
    catch: jest.fn(),
  };
  return q;
}

describe("StaffRepository — Phase 3", () => {
  let repo: StaffRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    repo = new StaffRepository();
  });

  describe("createStaff", () => {
    it("should save and return a new staff member", async () => {
      const input = {
        school: "school-1",
        firstName: "Alice",
        middleName: "M.",
        lastName: "Njeri",
        email: "alice@school.com",
        primaryPhoneNumber: "+254712345678",
        nationality: "Kenyan",
        role: "teacher" as const,
      };
      const saved = { _id: "staff-1", ...input, employeeNumber: "EMP-2026-SCHL-0001" };
      (StaffModel.prototype.save as jest.Mock).mockResolvedValue(saved);

      const result = await repo.createStaff(input as any);

      expect(StaffModel).toHaveBeenCalledWith(input);
      expect(StaffModel.prototype.save).toHaveBeenCalled();
      expect(result).toEqual(saved);
    });
  });

  describe("getStaffById", () => {
    it("should return staff with populated fields", async () => {
      const staffDoc = {
        _id: "staff-1",
        firstName: "Alice",
        department: { _id: "dept-1", departmentName: "Science" },
      };
      (StaffModel.findById as jest.Mock).mockReturnValue(mockQuery(staffDoc));

      const result = await repo.getStaffById("staff-1");

      expect(StaffModel.findById).toHaveBeenCalledWith("staff-1");
      expect(result).toEqual(staffDoc);
    });

    it("should return null when not found", async () => {
      (StaffModel.findById as jest.Mock).mockReturnValue(mockQuery(null));

      const result = await repo.getStaffById("nonexistent");

      expect(result).toBeNull();
    });
  });

  describe("getAllStaff", () => {
    it("should paginate and filter staff", async () => {
      const staffList = [
        { _id: "staff-1", firstName: "Alice", role: "teacher" },
        { _id: "staff-2", firstName: "Bob", role: "teacher" },
      ];
      (StaffModel.find as jest.Mock).mockReturnValue(mockQuery(staffList));
      (StaffModel.countDocuments as jest.Mock).mockResolvedValue(2);

      const result = await repo.getAllStaff("school-1", {
        role: "teacher",
        page: 1,
        limit: 10,
      });

      expect(StaffModel.find).toHaveBeenCalledWith(
        expect.objectContaining({ school: "school-1", role: "teacher" }),
      );
      expect(result.data).toHaveLength(2);
      expect(result.total).toBe(2);
    });

    it("should search by name, email, or employeeNumber", async () => {
      (StaffModel.find as jest.Mock).mockReturnValue(mockQuery([]));
      (StaffModel.countDocuments as jest.Mock).mockResolvedValue(0);

      await repo.getAllStaff("school-1", { search: "Alice" });

      const findCall = (StaffModel.find as jest.Mock).mock.calls[0][0];
      expect(findCall.$or).toBeDefined();
      expect(findCall.$or.length).toBe(5);
    });

    it("should filter by department", async () => {
      (StaffModel.find as jest.Mock).mockReturnValue(mockQuery([]));
      (StaffModel.countDocuments as jest.Mock).mockResolvedValue(0);

      await repo.getAllStaff("school-1", { department: "dept-1" });

      expect(StaffModel.find).toHaveBeenCalledWith(
        expect.objectContaining({ school: "school-1", department: "dept-1" }),
      );
    });
  });

  describe("updateStaff", () => {
    it("should update and return staff", async () => {
      const updated = { _id: "staff-1", firstName: "Alice", lastName: "Wanjiku" };
      (StaffModel.findByIdAndUpdate as jest.Mock).mockReturnValue(mockQuery(updated));

      const result = await repo.updateStaff("staff-1", { lastName: "Wanjiku" });

      expect(StaffModel.findByIdAndUpdate).toHaveBeenCalledWith(
        "staff-1",
        { lastName: "Wanjiku" },
        { new: true },
      );
      expect(result).toEqual(updated);
    });
  });

  describe("deleteStaff", () => {
    it("should delete and return staff", async () => {
      const deleted = { _id: "staff-1", firstName: "Alice" };
      (StaffModel.findByIdAndDelete as jest.Mock).mockResolvedValue(deleted);

      const result = await repo.deleteStaff("staff-1");

      expect(StaffModel.findByIdAndDelete).toHaveBeenCalledWith("staff-1");
      expect(result).toEqual(deleted);
    });
  });

  describe("toggleActive", () => {
    it("should toggle isActive from true to false", async () => {
      const before = { _id: "staff-1", isActive: true, save: jest.fn().mockResolvedValue({ _id: "staff-1", isActive: false }) };
      (StaffModel.findById as jest.Mock).mockResolvedValue(before);

      const result = await repo.toggleActive("staff-1");

      expect(result?.isActive).toBe(false);
      expect(before.save).toHaveBeenCalled();
    });
  });

  describe("assignDepartment", () => {
    it("should update department and return populated staff", async () => {
      const updated = { _id: "staff-1", department: { _id: "dept-1", departmentName: "Science" } };
      (StaffModel.findByIdAndUpdate as jest.Mock).mockReturnValue(mockQuery(updated));

      const result = await repo.assignDepartment("staff-1", "dept-1");

      expect(StaffModel.findByIdAndUpdate).toHaveBeenCalledWith(
        "staff-1",
        { department: "dept-1" },
        { new: true },
      );
      expect(result).toEqual(updated);
    });
  });

  describe("assignPosition", () => {
    it("should update position field", async () => {
      const updated = { _id: "staff-1", position: "Senior Teacher" };
      (StaffModel.findByIdAndUpdate as jest.Mock).mockReturnValue(mockQuery(updated));

      const result = await repo.assignPosition("staff-1", "Senior Teacher");

      expect(StaffModel.findByIdAndUpdate).toHaveBeenCalledWith(
        "staff-1",
        { position: "Senior Teacher" },
        { new: true },
      );
      expect(result).toEqual(updated);
    });
  });

  describe("countStaff", () => {
    it("should return count for a school", async () => {
      (StaffModel.countDocuments as jest.Mock).mockResolvedValue(10);

      const result = await repo.countStaff("school-1");

      expect(StaffModel.countDocuments).toHaveBeenCalledWith({ school: "school-1" });
      expect(result).toBe(10);
    });
  });
});
