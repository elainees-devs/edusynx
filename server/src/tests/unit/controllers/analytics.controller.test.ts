// server/src/tests/unit/controllers/analytics.controller.test.ts
import { AnalyticsController } from "../../../controllers/analytics/analytics.controller";
import { StudentModel } from "../../../models";

// Mock StudentModel methods
jest.mock("../../../models", () => ({
  StudentModel: {
    aggregate: jest.fn(),
    find: jest.fn(),
  },
}));

// Mock XLSX to avoid real file parsing
jest.mock("xlsx", () => ({
  utils: {
    sheet_to_json: jest.fn().mockReturnValue([{ name: "Test Student" }]),
  },
  read: jest.fn(),
}));

// Mock computePerformanceSummary at the top level
const computePerformanceSummaryMock = jest.fn();
jest.mock("../../../services/analytics.service", () => ({
  computePerformanceSummary: (...args: any[]) => computePerformanceSummaryMock(...args),
}));

describe("AnalyticsController", () => {
  let controller: AnalyticsController;

  beforeEach(() => {
    controller = new AnalyticsController();
    jest.clearAllMocks();
  });

  it("should return analytics summary", async () => {
    // Arrange
    computePerformanceSummaryMock.mockResolvedValue([{ totalStudents: 10 }]);
    const req: any = {
      params: { schoolId: "1", classId: "A", term: "1" },
    };
    const res: any = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    const next = jest.fn();

    // Act
    await controller.getPerformanceSummary(req, res, next);

    // Assert
    expect(computePerformanceSummaryMock).toHaveBeenCalledWith("1", "A", "1");
    expect(res.json).toHaveBeenCalledWith([{ totalStudents: 10 }]);
  });
});
