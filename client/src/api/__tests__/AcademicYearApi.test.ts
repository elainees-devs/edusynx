import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../client");

import apiClient from "../client";
const mockedClient = vi.mocked(apiClient);

const {
  getAcademicYears,
  getAllAcademicYears,
  getAcademicYearById,
  getActiveAcademicYear,
  createAcademicYear,
  updateAcademicYear,
  deleteAcademicYear,
} = await import("../AcademicYearApi");

describe("AcademicYearApi", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("getAcademicYears calls GET /academic-years with params", async () => {
    const mockResponse = {
      data: { data: [], page: 1, limit: 10, total: 0, totalPages: 0 },
    };
    mockedClient.get.mockResolvedValue(mockResponse);

    const result = await getAcademicYears(1, 10, "school123", true);

    expect(mockedClient.get).toHaveBeenCalledWith("/academic-years", {
      params: { page: 1, limit: 10, school: "school123", isActive: true },
    });
    expect(result).toEqual(mockResponse.data);
  });

  it("getAcademicYears omits optional params when not provided", async () => {
    mockedClient.get.mockResolvedValue({ data: {} });
    await getAcademicYears(2, 5);
    expect(mockedClient.get).toHaveBeenCalledWith("/academic-years", {
      params: { page: 2, limit: 5 },
    });
  });

  it("getAllAcademicYears calls GET /academic-years/all", async () => {
    mockedClient.get.mockResolvedValue({ data: [{ _id: "1" }] });
    const result = await getAllAcademicYears();
    expect(mockedClient.get).toHaveBeenCalledWith("/academic-years/all");
    expect(result).toEqual([{ _id: "1" }]);
  });

  it("getAcademicYearById calls GET /academic-years/:id", async () => {
    mockedClient.get.mockResolvedValue({ data: { _id: "abc" } });
    const result = await getAcademicYearById("abc");
    expect(mockedClient.get).toHaveBeenCalledWith("/academic-years/abc");
    expect(result).toEqual({ _id: "abc" });
  });

  it("getActiveAcademicYear calls GET /academic-years/active?school=", async () => {
    mockedClient.get.mockResolvedValue({ data: { _id: "active1" } });
    const result = await getActiveAcademicYear("sch1");
    expect(mockedClient.get).toHaveBeenCalledWith("/academic-years/active", {
      params: { school: "sch1" },
    });
    expect(result).toEqual({ _id: "active1" });
  });

  it("createAcademicYear calls POST /academic-years with body", async () => {
    const payload = {
      school: "sch1",
      name: "2026",
      startDate: "2026-01-01",
      endDate: "2026-12-31",
      isActive: true,
      terms: [{ name: "Term 1", startDate: "2026-01-01", endDate: "2026-04-30" }],
    };
    mockedClient.post.mockResolvedValue({ data: { _id: "new1", ...payload } });
    const result = await createAcademicYear(payload);
    expect(mockedClient.post).toHaveBeenCalledWith("/academic-years", payload);
    expect(result._id).toBe("new1");
  });

  it("updateAcademicYear calls PATCH /academic-years/:id with body", async () => {
    mockedClient.patch.mockResolvedValue({ data: { _id: "abc", name: "Updated" } });
    const result = await updateAcademicYear("abc", { name: "Updated" });
    expect(mockedClient.patch).toHaveBeenCalledWith("/academic-years/abc", {
      name: "Updated",
    });
    expect(result.name).toBe("Updated");
  });

  it("deleteAcademicYear calls DELETE /academic-years/:id", async () => {
    mockedClient.delete.mockResolvedValue({});
    await deleteAcademicYear("abc");
    expect(mockedClient.delete).toHaveBeenCalledWith("/academic-years/abc");
  });
});
