import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../client");

import apiClient from "../client";
const mockedClient = vi.mocked(apiClient);

const {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
} = await import("../DepartmentApi");

const mockDepartment = {
  _id: "dept-1",
  school: "sch1",
  departmentName: "science",
  headOfDepartment: {
    _id: "staff-1",
    firstName: "Alice",
    lastName: "Njeri",
  },
};

describe("DepartmentApi — Phase 3C", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("createDepartment sends POST /departments with body", async () => {
    mockedClient.post.mockResolvedValue({ data: mockDepartment });

    const result = await createDepartment({
      school: "sch1",
      departmentName: "Science",
      headOfDepartment: "staff-1",
    });

    expect(mockedClient.post).toHaveBeenCalledWith("/departments", {
      school: "sch1",
      departmentName: "Science",
      headOfDepartment: "staff-1",
    });
    expect(result).toEqual(mockDepartment);
  });

  it("getAllDepartments sends GET /departments with params", async () => {
    const paginated = {
      data: [mockDepartment],
      page: 1,
      limit: 10,
      total: 1,
      totalPages: 1,
    };
    mockedClient.get.mockResolvedValue({ data: paginated });

    const result = await getAllDepartments({
      schoolId: "sch1",
      page: 1,
      limit: 10,
    });

    expect(mockedClient.get).toHaveBeenCalledWith("/departments", {
      params: { schoolId: "sch1", page: 1, limit: 10 },
    });
    expect(result.data).toHaveLength(1);
  });

  it("getDepartmentById sends GET /departments/:id", async () => {
    mockedClient.get.mockResolvedValue({ data: mockDepartment });

    const result = await getDepartmentById("dept-1");

    expect(mockedClient.get).toHaveBeenCalledWith("/departments/dept-1");
    expect(result._id).toBe("dept-1");
  });

  it("updateDepartment sends PUT /departments/:id with body", async () => {
    const updated = { ...mockDepartment, departmentName: "mathematics" };
    mockedClient.put.mockResolvedValue({ data: updated });

    const result = await updateDepartment("dept-1", {
      departmentName: "Mathematics",
    });

    expect(mockedClient.put).toHaveBeenCalledWith("/departments/dept-1", {
      departmentName: "Mathematics",
    });
    expect(result.departmentName).toBe("mathematics");
  });

  it("deleteDepartment sends DELETE /departments/:id", async () => {
    mockedClient.delete.mockResolvedValue({});

    await deleteDepartment("dept-1");

    expect(mockedClient.delete).toHaveBeenCalledWith("/departments/dept-1");
  });
});
