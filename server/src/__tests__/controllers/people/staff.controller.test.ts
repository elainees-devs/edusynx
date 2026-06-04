import { StaffController } from "../../../controllers/people/staff.controller";
import { StaffRepository } from "../../../repositories/people/staff.repository";

jest.mock("../../../repositories/people/staff.repository");

function tick(): Promise<void> {
  return new Promise((resolve) => setImmediate(resolve));
}

describe("StaffController — Phase 3", () => {
  let controller: StaffController;
  let mockReq: Record<string, any>;
  let mockRes: Record<string, any>;

  beforeEach(() => {
    jest.clearAllMocks();
    controller = new StaffController();
    mockReq = { params: {}, body: {}, query: {} };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };
  });

  describe("createStaff", () => {
    it("should create staff and return 201", async () => {
      const mockStaff = { _id: "staff-1", firstName: "Alice", role: "teacher" };
      (StaffRepository.prototype.createStaff as jest.Mock).mockResolvedValue(mockStaff);
      mockReq.body = {
        school: "school-1",
        firstName: "Alice",
        lastName: "Njeri",
        email: "alice@school.com",
        role: "teacher",
        primaryPhoneNumber: "+254712345678",
        nationality: "Kenyan",
      };

      await controller.createStaff(mockReq as any, mockRes as any, jest.fn());

      expect(StaffRepository.prototype.createStaff).toHaveBeenCalledWith(mockReq.body);
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(mockStaff);
    });
  });

  describe("getStaffById", () => {
    it("should return staff when found", async () => {
      const mockStaff = { _id: "staff-1", firstName: "Alice" };
      (StaffRepository.prototype.getStaffById as jest.Mock).mockResolvedValue(mockStaff);
      mockReq.params = { id: "staff-1" };

      await controller.getStaffById(mockReq as any, mockRes as any, jest.fn());

      expect(StaffRepository.prototype.getStaffById).toHaveBeenCalledWith("staff-1");
      expect(mockRes.json).toHaveBeenCalledWith(mockStaff);
    });

    it("should pass AppError(404) when not found", async () => {
      (StaffRepository.prototype.getStaffById as jest.Mock).mockResolvedValue(null);
      mockReq.params = { id: "nonexistent" };

      const mockNext = jest.fn();
      controller.getStaffById(mockReq as any, mockRes as any, mockNext);
      await tick();

      expect(mockNext).toHaveBeenCalledWith(
        expect.objectContaining({ message: "Staff not found", status: 404 }),
      );
    });
  });

  describe("getAllStaff", () => {
    it("should return paginated staff", async () => {
      const mockResult = { data: [{ _id: "staff-1" }], total: 1 };
      (StaffRepository.prototype.getAllStaff as jest.Mock).mockResolvedValue(mockResult);
      mockReq.query = { schoolId: "school-1", role: "teacher", page: "1", limit: "10" };

      await controller.getAllStaff(mockReq as any, mockRes as any, jest.fn());

      expect(StaffRepository.prototype.getAllStaff).toHaveBeenCalledWith("school-1", {
        role: "teacher",
        department: undefined,
        isActive: undefined,
        search: undefined,
        page: 1,
        limit: 10,
      });
      expect(mockRes.json).toHaveBeenCalledWith(mockResult);
    });

    it("should return 400 when schoolId is missing", async () => {
      mockReq.query = {};

      const mockNext = jest.fn();
      controller.getAllStaff(mockReq as any, mockRes as any, mockNext);
      await tick();

      expect(mockNext).toHaveBeenCalledWith(
        expect.objectContaining({ message: "schoolId query parameter is required", status: 400 }),
      );
    });
  });

  describe("updateStaff", () => {
    it("should update and return staff", async () => {
      const mockStaff = { _id: "staff-1", firstName: "Alice", lastName: "Wanjiku" };
      (StaffRepository.prototype.updateStaff as jest.Mock).mockResolvedValue(mockStaff);
      mockReq.params = { id: "staff-1" };
      mockReq.body = { lastName: "Wanjiku" };

      await controller.updateStaff(mockReq as any, mockRes as any, jest.fn());

      expect(StaffRepository.prototype.updateStaff).toHaveBeenCalledWith("staff-1", { lastName: "Wanjiku" });
      expect(mockRes.json).toHaveBeenCalledWith(mockStaff);
    });

    it("should pass AppError(404) when not found", async () => {
      (StaffRepository.prototype.updateStaff as jest.Mock).mockResolvedValue(null);
      mockReq.params = { id: "nonexistent" };

      const mockNext = jest.fn();
      controller.updateStaff(mockReq as any, mockRes as any, mockNext);
      await tick();

      expect(mockNext).toHaveBeenCalledWith(
        expect.objectContaining({ message: "Staff not found", status: 404 }),
      );
    });
  });

  describe("deleteStaff", () => {
    it("should delete and return 204", async () => {
      (StaffRepository.prototype.deleteStaff as jest.Mock).mockResolvedValue({ _id: "staff-1" });
      mockReq.params = { id: "staff-1" };

      await controller.deleteStaff(mockReq as any, mockRes as any, jest.fn());

      expect(StaffRepository.prototype.deleteStaff).toHaveBeenCalledWith("staff-1");
      expect(mockRes.status).toHaveBeenCalledWith(204);
      expect(mockRes.send).toHaveBeenCalled();
    });

    it("should pass AppError(404) when not found", async () => {
      (StaffRepository.prototype.deleteStaff as jest.Mock).mockResolvedValue(null);
      mockReq.params = { id: "nonexistent" };

      const mockNext = jest.fn();
      controller.deleteStaff(mockReq as any, mockRes as any, mockNext);
      await tick();

      expect(mockNext).toHaveBeenCalledWith(
        expect.objectContaining({ message: "Staff not found", status: 404 }),
      );
    });
  });

  describe("toggleActive", () => {
    it("should toggle and return staff", async () => {
      const toggled = { _id: "staff-1", isActive: false };
      (StaffRepository.prototype.toggleActive as jest.Mock).mockResolvedValue(toggled);
      mockReq.params = { id: "staff-1" };

      await controller.toggleActive(mockReq as any, mockRes as any, jest.fn());

      expect(mockRes.json).toHaveBeenCalledWith(toggled);
    });
  });

  describe("assignDepartment", () => {
    it("should assign department and return staff", async () => {
      const updated = { _id: "staff-1", department: { _id: "dept-1" } };
      (StaffRepository.prototype.assignDepartment as jest.Mock).mockResolvedValue(updated);
      mockReq.params = { id: "staff-1" };
      mockReq.body = { departmentId: "dept-1" };

      await controller.assignDepartment(mockReq as any, mockRes as any, jest.fn());

      expect(StaffRepository.prototype.assignDepartment).toHaveBeenCalledWith("staff-1", "dept-1");
      expect(mockRes.json).toHaveBeenCalledWith(updated);
    });
  });

  describe("assignPosition", () => {
    it("should assign position and return staff", async () => {
      const updated = { _id: "staff-1", position: "Senior Teacher" };
      (StaffRepository.prototype.assignPosition as jest.Mock).mockResolvedValue(updated);
      mockReq.params = { id: "staff-1" };
      mockReq.body = { position: "Senior Teacher" };

      await controller.assignPosition(mockReq as any, mockRes as any, jest.fn());

      expect(StaffRepository.prototype.assignPosition).toHaveBeenCalledWith("staff-1", "Senior Teacher");
      expect(mockRes.json).toHaveBeenCalledWith(updated);
    });
  });

  describe("countStaff", () => {
    it("should return count", async () => {
      (StaffRepository.prototype.countStaff as jest.Mock).mockResolvedValue(5);
      mockReq.query = { schoolId: "school-1" };

      await controller.countStaff(mockReq as any, mockRes as any, jest.fn());

      expect(StaffRepository.prototype.countStaff).toHaveBeenCalledWith("school-1");
      expect(mockRes.json).toHaveBeenCalledWith({ count: 5 });
    });

    it("should return 400 when schoolId is missing", async () => {
      mockReq.query = {};

      const mockNext = jest.fn();
      controller.countStaff(mockReq as any, mockRes as any, mockNext);
      await tick();

      expect(mockNext).toHaveBeenCalledWith(
        expect.objectContaining({ message: "schoolId query parameter is required", status: 400 }),
      );
    });
  });
});
