import request from "supertest";
import express from "express";
import { staffRouter } from "../../routes/staff.route";
import { StaffRepository } from "../../repositories/people/staff.repository";

jest.mock("../../repositories/people/staff.repository");

jest.mock("../../middlewares/auth", () => ({
  authenticateUser:
    () =>
    (req: any, _res: any, next: any) => {
      req.user = {
        _id: "mock-user-id",
        role: "school-admin",
        school: "mock-school-id",
      };
      next();
    },
}));

const app = express();
app.use(express.json());
app.use("/api/v1/staff", staffRouter);

const validObjectId = "507f1f77bcf86cd799439011";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("POST /api/v1/staff", () => {
  it("should return 201 on successful creation", async () => {
    (StaffRepository.prototype.createStaff as jest.Mock).mockResolvedValue({
      _id: "staff-1",
      firstName: "Alice",
      role: "teacher",
    });

    const res = await request(app)
      .post("/api/v1/staff")
      .send({
        school: validObjectId,
        firstName: "Alice",
        middleName: "M.",
        lastName: "Njeri",
        email: "alice@school.com",
        primaryPhoneNumber: "+254712345678",
        nationality: "Kenyan",
        role: "teacher",
      })
      .set("Authorization", "Bearer mock-token");

    expect(res.status).toBe(201);
    expect(res.body.firstName).toBe("Alice");
    expect(StaffRepository.prototype.createStaff).toHaveBeenCalled();
  });

  it("should return 400 on missing required fields", async () => {
    const res = await request(app)
      .post("/api/v1/staff")
      .send({ role: "teacher" })
      .set("Authorization", "Bearer mock-token");

    expect(res.status).toBe(400);
  });

  it("should return 400 on invalid role", async () => {
    const res = await request(app)
      .post("/api/v1/staff")
      .send({
        school: validObjectId,
        firstName: "Alice",
        lastName: "Njeri",
        email: "alice@school.com",
        primaryPhoneNumber: "+254712345678",
        nationality: "Kenyan",
        role: "invalid-role",
      })
      .set("Authorization", "Bearer mock-token");

    expect(res.status).toBe(400);
  });
});

describe("GET /api/v1/staff", () => {
  it("should return 200 with paginated staff", async () => {
    (StaffRepository.prototype.getAllStaff as jest.Mock).mockResolvedValue({
      data: [{ _id: "staff-1", firstName: "Alice" }],
      total: 1,
    });

    const res = await request(app)
      .get("/api/v1/staff?schoolId=mock-school-id")
      .set("Authorization", "Bearer mock-token");

    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(1);
    expect(StaffRepository.prototype.getAllStaff).toHaveBeenCalled();
  });
});

describe("GET /api/v1/staff/count", () => {
  it("should return 200 with count", async () => {
    (StaffRepository.prototype.countStaff as jest.Mock).mockResolvedValue(5);

    const res = await request(app)
      .get("/api/v1/staff/count?schoolId=mock-school-id")
      .set("Authorization", "Bearer mock-token");

    expect(res.status).toBe(200);
    expect(res.body.count).toBe(5);
  });
});

describe("GET /api/v1/staff/:id", () => {
  it("should return 200 when found", async () => {
    (StaffRepository.prototype.getStaffById as jest.Mock).mockResolvedValue({
      _id: "staff-1",
      firstName: "Alice",
    });

    const res = await request(app)
      .get("/api/v1/staff/staff-1")
      .set("Authorization", "Bearer mock-token");

    expect(res.status).toBe(200);
    expect(res.body._id).toBe("staff-1");
  });

  it("should return 404 when not found", async () => {
    (StaffRepository.prototype.getStaffById as jest.Mock).mockResolvedValue(null);

    const res = await request(app)
      .get("/api/v1/staff/nonexistent")
      .set("Authorization", "Bearer mock-token");

    expect(res.status).toBe(404);
  });
});

describe("PUT /api/v1/staff/:id", () => {
  it("should return 200 on update", async () => {
    (StaffRepository.prototype.updateStaff as jest.Mock).mockResolvedValue({
      _id: "staff-1",
      firstName: "Alice",
      lastName: "Wanjiku",
    });

    const res = await request(app)
      .put("/api/v1/staff/staff-1")
      .send({ lastName: "Wanjiku" })
      .set("Authorization", "Bearer mock-token");

    expect(res.status).toBe(200);
    expect(StaffRepository.prototype.updateStaff).toHaveBeenCalled();
  });
});

describe("DELETE /api/v1/staff/:id", () => {
  it("should return 204 on deletion", async () => {
    (StaffRepository.prototype.deleteStaff as jest.Mock).mockResolvedValue({
      _id: "staff-1",
    });

    const res = await request(app)
      .delete("/api/v1/staff/staff-1")
      .set("Authorization", "Bearer mock-token");

    expect(res.status).toBe(204);
    expect(StaffRepository.prototype.deleteStaff).toHaveBeenCalled();
  });
});

describe("PATCH /api/v1/staff/:id/toggle-active", () => {
  it("should return 200", async () => {
    (StaffRepository.prototype.toggleActive as jest.Mock).mockResolvedValue({
      _id: "staff-1",
      isActive: false,
    });

    const res = await request(app)
      .patch("/api/v1/staff/staff-1/toggle-active")
      .set("Authorization", "Bearer mock-token");

    expect(res.status).toBe(200);
    expect(StaffRepository.prototype.toggleActive).toHaveBeenCalledWith("staff-1");
  });
});

describe("PATCH /api/v1/staff/:id/department", () => {
  it("should return 200 on assignment", async () => {
    (StaffRepository.prototype.assignDepartment as jest.Mock).mockResolvedValue({
      _id: "staff-1",
      department: { _id: "dept-1" },
    });

    const res = await request(app)
      .patch("/api/v1/staff/staff-1/department")
      .send({ departmentId: validObjectId })
      .set("Authorization", "Bearer mock-token");

    expect(res.status).toBe(200);
    expect(StaffRepository.prototype.assignDepartment).toHaveBeenCalled();
  });

  it("should return 400 when departmentId missing", async () => {
    const res = await request(app)
      .patch("/api/v1/staff/staff-1/department")
      .send({})
      .set("Authorization", "Bearer mock-token");

    expect(res.status).toBe(400);
  });
});

describe("PATCH /api/v1/staff/:id/position", () => {
  it("should return 200 on assignment", async () => {
    (StaffRepository.prototype.assignPosition as jest.Mock).mockResolvedValue({
      _id: "staff-1",
      position: "Senior Teacher",
    });

    const res = await request(app)
      .patch("/api/v1/staff/staff-1/position")
      .send({ position: "Senior Teacher" })
      .set("Authorization", "Bearer mock-token");

    expect(res.status).toBe(200);
    expect(StaffRepository.prototype.assignPosition).toHaveBeenCalled();
  });

  it("should return 400 when position missing", async () => {
    const res = await request(app)
      .patch("/api/v1/staff/staff-1/position")
      .send({})
      .set("Authorization", "Bearer mock-token");

    expect(res.status).toBe(400);
  });
});


