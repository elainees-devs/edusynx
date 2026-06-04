import request from "supertest";
import express from "express";
import { studentRouter } from "../../routes/student.route";
import { StudentRepository } from "../../repositories/people/student.repository";

jest.mock("../../repositories/people/student.repository");

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
app.use("/api/v1/students", studentRouter);

beforeEach(() => {
  jest.clearAllMocks();
});

describe("POST /api/v1/students/promote", () => {
  it("should return 200 on successful promotion", async () => {
    (StudentRepository.prototype.promoteStudents as jest.Mock).mockResolvedValue({
      modifiedCount: 5,
    });

    const res = await request(app)
      .post("/api/v1/students/promote")
      .send({
        sourceClassId: "507f1f77bcf86cd799439011",
        targetClassId: "507f1f77bcf86cd799439012",
        targetStreamId: "507f1f77bcf86cd799439013",
        academicYear: "2025",
      })
      .set("Authorization", "Bearer mock-token");

    expect(res.status).toBe(200);
    expect(res.body.message).toContain("5 student(s) promoted");
    expect(StudentRepository.prototype.promoteStudents).toHaveBeenCalled();
  });
});

describe("PATCH /api/v1/students/:id/transfer", () => {
  it("should return 200 on successful transfer", async () => {
    (StudentRepository.prototype.transferStudent as jest.Mock).mockResolvedValue({
      _id: "student-1",
      studentFirstName: "John",
    });

    const res = await request(app)
      .patch("/api/v1/students/student-1/transfer")
      .send({
        targetClassId: "507f1f77bcf86cd799439012",
        targetStreamId: "507f1f77bcf86cd799439013",
      })
      .set("Authorization", "Bearer mock-token");

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Student transferred successfully");
    expect(StudentRepository.prototype.transferStudent).toHaveBeenCalled();
  });
});

describe("PATCH /api/v1/students/graduate", () => {
  it("should return 200 on successful graduation", async () => {
    (StudentRepository.prototype.graduateStudents as jest.Mock).mockResolvedValue({
      modifiedCount: 3,
    });

    const res = await request(app)
      .patch("/api/v1/students/graduate")
      .send({ studentIds: ["507f1f77bcf86cd799439011", "507f1f77bcf86cd799439012"] })
      .set("Authorization", "Bearer mock-token");

    expect(res.status).toBe(200);
    expect(res.body.message).toContain("3 student(s) graduated");
    expect(StudentRepository.prototype.graduateStudents).toHaveBeenCalled();
  });
});

describe("GET /api/v1/students/:id/history", () => {
  it("should return 200 with student history", async () => {
    (StudentRepository.prototype.getStudentHistory as jest.Mock).mockResolvedValue({
      _id: "student-1",
      studentFirstName: "John",
    });

    const res = await request(app)
      .get("/api/v1/students/student-1/history")
      .set("Authorization", "Bearer mock-token");

    expect(res.status).toBe(200);
    expect(res.body._id).toBe("student-1");
    expect(StudentRepository.prototype.getStudentHistory).toHaveBeenCalled();
  });
});

describe("Validation — 400 on invalid payload", () => {
  it("should reject promote with missing fields", async () => {
    const res = await request(app)
      .post("/api/v1/students/promote")
      .send({})
      .set("Authorization", "Bearer mock-token");

    expect(res.status).toBe(400);
  });

  it("should reject transfer with missing targetClassId", async () => {
    const res = await request(app)
      .patch("/api/v1/students/student-1/transfer")
      .send({})
      .set("Authorization", "Bearer mock-token");

    expect(res.status).toBe(400);
  });

  it("should reject graduate with empty studentIds", async () => {
    const res = await request(app)
      .patch("/api/v1/students/graduate")
      .send({ studentIds: [] })
      .set("Authorization", "Bearer mock-token");

    expect(res.status).toBe(400);
  });
});
