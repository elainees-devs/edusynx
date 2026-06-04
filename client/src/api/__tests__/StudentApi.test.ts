import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";

vi.mock("axios");

const mockedAxios = vi.mocked(axios);

const {
  promoteStudents,
  transferStudent,
  graduateStudents,
  getStudentHistory,
} = await import("../StudentApi");

const API_BASE = "http://localhost:5000/api/v1";

describe("StudentApi - Phase 2B.1", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("promoteStudents calls POST /students/promote with body", async () => {
    mockedAxios.post.mockResolvedValue({
      data: { message: "Promoted 25 students", modifiedCount: 25 },
    });

    const result = await promoteStudents("classA", "classB", "streamX", "2025-2026");

    expect(mockedAxios.post).toHaveBeenCalledWith(`${API_BASE}/students/promote`, {
      sourceClassId: "classA",
      targetClassId: "classB",
      targetStreamId: "streamX",
      academicYear: "2025-2026",
    });
    expect(result).toEqual({ message: "Promoted 25 students", modifiedCount: 25 });
  });

  it("promoteStudents omits optional fields when not provided", async () => {
    mockedAxios.post.mockResolvedValue({ data: {} });
    await promoteStudents("classA", "classB");
    expect(mockedAxios.post).toHaveBeenCalledWith(`${API_BASE}/students/promote`, {
      sourceClassId: "classA",
      targetClassId: "classB",
      targetStreamId: undefined,
      academicYear: undefined,
    });
  });

  it("transferStudent calls PATCH /students/:id/transfer with body", async () => {
    const mockStudent = { _id: "s1", studentFirstName: "John", classId: "classB" };
    mockedAxios.patch.mockResolvedValue({ data: mockStudent });

    const result = await transferStudent("s1", "classB", "streamY", "Family moved");

    expect(mockedAxios.patch).toHaveBeenCalledWith(`${API_BASE}/students/s1/transfer`, {
      targetClassId: "classB",
      targetStreamId: "streamY",
      reason: "Family moved",
    });
    expect(result).toEqual(mockStudent);
  });

  it("transferStudent omits optional fields", async () => {
    mockedAxios.patch.mockResolvedValue({ data: {} });
    await transferStudent("s1", "classB");
    expect(mockedAxios.patch).toHaveBeenCalledWith(`${API_BASE}/students/s1/transfer`, {
      targetClassId: "classB",
      targetStreamId: undefined,
      reason: undefined,
    });
  });

  it("graduateStudents calls PATCH /students/graduate with studentIds", async () => {
    mockedAxios.patch.mockResolvedValue({
      data: { message: "Graduated 3 students", modifiedCount: 3 },
    });

    const result = await graduateStudents(["s1", "s2", "s3"]);

    expect(mockedAxios.patch).toHaveBeenCalledWith(`${API_BASE}/students/graduate`, {
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
    mockedAxios.get.mockResolvedValue({ data: mockResponse });

    const result = await getStudentHistory("s1");

    expect(mockedAxios.get).toHaveBeenCalledWith(`${API_BASE}/students/s1/history`);
    expect(result._id).toBe("s1");
    expect(result.history).toHaveLength(1);
    expect(result.history![0].action).toBe("promoted");
  });
});
