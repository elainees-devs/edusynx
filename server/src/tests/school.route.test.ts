import request from "supertest";
import express, { Express } from "express";
import { schoolRouter } from "../routes";


// Mock the controller methods to isolate routing behavior
jest.mock("../controllers", () => ({
  SchoolController: jest.fn().mockImplementation(() => ({
    createSchool: jest.fn((req, res) => res.status(201).json({ message: "School created" })),
    getPaginatedSchools: jest.fn((req, res) => res.status(200).json({ message: "Paginated schools" })),
    getAllSchools: jest.fn((req, res) => res.status(200).json({ message: "All schools" })),
    activateSchool: jest.fn((req, res) => res.status(200).json({ message: `School ${req.params.id} activated` })),
    updateSchool: jest.fn((req, res) => res.status(200).json({ message: "School updated" })),
    deleteSchoolById: jest.fn((req, res) => res.status(204).end()),
    deleteAllSchools: jest.fn((req, res) => res.status(204).end()),
    getSchoolById: jest.fn((req, res) => res.status(200).json({ id: req.params.id, name: "Test School" })),
    getSchoolBySlug: jest.fn((req, res) => res.status(200).json({ slug: req.params.slug, name: "Slug School" })),
  })),
}));

let app: Express;

beforeAll(() => {
  app = express();
  app.use(express.json());
  app.use("/api/v1/schools", schoolRouter);
});

describe("School Routes", () => {
  it("POST /api/v1/schools/register → should create a new school", async () => {
    const res = await request(app)
      .post("/api/v1/schools/register")
      .send({ name: "New School", email: "test@school.com" });
    expect(res.status).toBe(201);
    expect(res.body.message).toBe("School created");
  });

  it("GET /api/v1/schools → should return paginated schools", async () => {
    const res = await request(app).get("/api/v1/schools");
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Paginated schools");
  });

  it("GET /api/v1/schools/all → should return all schools", async () => {
    const res = await request(app).get("/api/v1/schools/all");
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("All schools");
  });

  it("PATCH /api/v1/schools/:id/activate → should activate a school", async () => {
    const res = await request(app).patch("/api/v1/schools/12345/activate");
    expect(res.status).toBe(200);
    expect(res.body.message).toContain("activated");
  });

  it("PUT /api/v1/schools/:id → should update a school", async () => {
    const res = await request(app).put("/api/v1/schools/12345").send({ name: "Updated School" });
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("School updated");
  });

  it("DELETE /api/v1/schools/:id → should delete a school", async () => {
    const res = await request(app).delete("/api/v1/schools/12345");
    expect(res.status).toBe(204);
  });

  it("DELETE /api/v1/schools → should delete all schools", async () => {
    const res = await request(app).delete("/api/v1/schools");
    expect(res.status).toBe(204);
  });

  it("GET /api/v1/schools/:id → should get school by ID", async () => {
    const res = await request(app).get("/api/v1/schools/12345");
    expect(res.status).toBe(200);
    expect(res.body.name).toBe("Test School");
  });

  it("GET /api/v1/schools/slug/:slug → should get school by slug", async () => {
    const res = await request(app).get("/api/v1/schools/slug/test-slug");
    expect(res.status).toBe(200);
    expect(res.body.name).toBe("Slug School");
  });
});
