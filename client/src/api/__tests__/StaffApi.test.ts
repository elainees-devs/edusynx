import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../client");

import apiClient from "../client";
const mockedClient = vi.mocked(apiClient);

const {
  createStaff,
  getAllStaff,
  getStaffById,
  updateStaff,
  deleteStaff,
  toggleActive,
  assignDepartment,
  assignPosition,
  countStaff,
} = await import("../StaffApi");

const mockStaff = {
  _id: "staff-1",
  firstName: "Alice",
  middleName: "M.",
  lastName: "Njeri",
  email: "alice@school.com",
  primaryPhoneNumber: "+254712345678",
  nationality: "Kenyan",
  isActive: true,
  isLocked: false,
  isTwoFactorEnabled: false,
  role: "teacher" as const,
  employeeNumber: "EMP-2026-SCHL-0001",
};

describe("StaffApi — Phase 3A", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("createStaff sends POST /staff with body", async () => {
    mockedClient.post.mockResolvedValue({ data: mockStaff });

    const result = await createStaff({
      school: "school-1",
      firstName: "Alice",
      lastName: "Njeri",
      email: "alice@school.com",
      primaryPhoneNumber: "+254712345678",
      nationality: "Kenyan",
      role: "teacher",
    });

    expect(mockedClient.post).toHaveBeenCalledWith("/staff", {
      school: "school-1",
      firstName: "Alice",
      lastName: "Njeri",
      email: "alice@school.com",
      primaryPhoneNumber: "+254712345678",
      nationality: "Kenyan",
      role: "teacher",
    });
    expect(result).toEqual(mockStaff);
  });

  it("getAllStaff sends GET /staff with params", async () => {
    const paginated = { data: [mockStaff], page: 1, limit: 10, total: 1, totalPages: 1 };
    mockedClient.get.mockResolvedValue({ data: paginated });

    const result = await getAllStaff({
      schoolId: "school-1",
      role: "teacher",
      page: 1,
      limit: 10,
    });

    expect(mockedClient.get).toHaveBeenCalledWith("/staff", {
      params: { schoolId: "school-1", role: "teacher", page: 1, limit: 10 },
    });
    expect(result.data).toHaveLength(1);
  });

  it("getStaffById sends GET /staff/:id", async () => {
    mockedClient.get.mockResolvedValue({ data: mockStaff });

    const result = await getStaffById("staff-1");

    expect(mockedClient.get).toHaveBeenCalledWith("/staff/staff-1");
    expect(result._id).toBe("staff-1");
  });

  it("updateStaff sends PUT /staff/:id with body", async () => {
    const updated = { ...mockStaff, lastName: "Wanjiku" };
    mockedClient.put.mockResolvedValue({ data: updated });

    const result = await updateStaff("staff-1", { lastName: "Wanjiku" });

    expect(mockedClient.put).toHaveBeenCalledWith("/staff/staff-1", { lastName: "Wanjiku" });
    expect(result.lastName).toBe("Wanjiku");
  });

  it("deleteStaff sends DELETE /staff/:id", async () => {
    mockedClient.delete.mockResolvedValue({});

    await deleteStaff("staff-1");

    expect(mockedClient.delete).toHaveBeenCalledWith("/staff/staff-1");
  });

  it("toggleActive sends PATCH /staff/:id/toggle-active", async () => {
    const toggled = { ...mockStaff, isActive: false };
    mockedClient.patch.mockResolvedValue({ data: toggled });

    const result = await toggleActive("staff-1");

    expect(mockedClient.patch).toHaveBeenCalledWith("/staff/staff-1/toggle-active");
    expect(result.isActive).toBe(false);
  });

  it("assignDepartment sends PATCH /staff/:id/department with departmentId", async () => {
    const assigned = { ...mockStaff, department: { _id: "dept-1", departmentName: "Science" } };
    mockedClient.patch.mockResolvedValue({ data: assigned });

    const result = await assignDepartment("staff-1", "dept-1");

    expect(mockedClient.patch).toHaveBeenCalledWith("/staff/staff-1/department", {
      departmentId: "dept-1",
    });
    expect(result.department).toBeDefined();
  });

  it("assignPosition sends PATCH /staff/:id/position with position", async () => {
    const assigned = { ...mockStaff, position: "Senior Teacher" };
    mockedClient.patch.mockResolvedValue({ data: assigned });

    const result = await assignPosition("staff-1", "Senior Teacher");

    expect(mockedClient.patch).toHaveBeenCalledWith("/staff/staff-1/position", {
      position: "Senior Teacher",
    });
    expect(result.position).toBe("Senior Teacher");
  });

  it("countStaff sends GET /staff/count with schoolId param", async () => {
    mockedClient.get.mockResolvedValue({ data: { count: 5 } });

    const result = await countStaff("school-1");

    expect(mockedClient.get).toHaveBeenCalledWith("/staff/count", {
      params: { schoolId: "school-1" },
    });
    expect(result.count).toBe(5);
  });
});
