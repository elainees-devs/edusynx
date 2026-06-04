import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../client");

import apiClient from "../client";
const mockedClient = vi.mocked(apiClient);

const {
  promoteStudents,
  transferStudent,
  graduateStudents,
  getStudentHistory,
} = await import("../StudentApi");

describe("StudentApi - Phase 2B.1", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("promoteStudents calls POST /students/promote with body", async () => {
    mockedClient.post.mockResolvedValue({
      data: { message: "Promoted 25 students", modifiedCount: 25 },
    });

    const result = await promoteStudents("classA", "classB", "streamX", "2025-2026");

    expect(mockedClient.post).toHaveBeenCalledWith("/students/promote", {
      sourceClassId: "classA",
      targetClassId: "classB",
      targetStreamId: "streamX",
      academicYear: "2025-2026",
    });
    expect(result).toEqual({ message: "Promoted 25 students", modifiedCount: 25 });
  });

  it("promoteStudents omits optional fields when not provided", async () => {
    mockedClient.post.mockResolvedValue({ data: {} });
    await promoteStudents("classA", "classB");
    expect(mockedClient.post).toHaveBeenCalledWith("/students/promote", {
      sourceClassId: "classA",
      targetClassId: "classB",
      targetStreamId: undefined,
      academicYear: undefined,
    });
  });

  it("transferStudent calls PATCH /students/:id/transfer with body", async () => {
    const mockStudent = { _id: "s1", studentFirstName: "John", classId: "classB" };
    mockedClient.patch.mockResolvedValue({ data: mockStudent });

    const result = await transferStudent("s1", "classB", "streamY", "Family moved");

    expect(mockedClient.patch).toHaveBeenCalledWith("/students/s1/transfer", {
      targetClassId: "classB",
      targetStreamId: "streamY",
      reason: "Family moved",
    });
    expect(result).toEqual(mockStudent);
  });

  it("transferStudent omits optional fields", async () => {
    mockedClient.patch.mockResolvedValue({ data: {} });
    await transferStudent("s1", "classB");
    expect(mockedClient.patch).toHaveBeenCalledWith("/students/s1/transfer", {
      targetClassId: "classB",
      targetStreamId: undefined,
      reason: undefined,
    });
  });

  it("graduateStudents calls PATCH /students/graduate with studentIds", async () => {
    mockedClient.patch.mockResolvedValue({
      data: { message: "Graduated 3 students", modifiedCount: 3 },
    });

    const result = await graduateStudents(["s1", "s2", "s3"]);

    expect(mockedClient.patch).toHaveBeenCalledWith("/students/graduate", {
      studentIds: ["s1", "s2", "s3"],
    });
    expect(result).toEqual({ message: "Graduated 3 students", modifiedCount: 3 });
  });

  it("getStudentHistory calls GET /students/:id/history and returns student with history", async () => {
    const mockResponse = {
      _id: "s1",
      studentFirstName: "Jane",
      history: [
        {
          _id: "h1",
          action: "promoted",
          fromClass: "classA",
          toClass: "classB",
          date: "2025-06-01T00:00:00.000Z",
        },
      ],
    };
    mockedClient.get.mockResolvedValue({ data: mockResponse });

    const result = await getStudentHistory("s1");

    expect(mockedClient.get).toHaveBeenCalledWith("/students/s1/history");
    expect(result._id).toBe("s1");
    expect(result.history).toHaveLength(1);
    expect(result.history![0].action).toBe("promoted");
  });
});
