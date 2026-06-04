// server/src/controllers/analytics/analytics.controller.ts

import { computePerformanceSummary } from "../../services/analytics.service";
import { AttendanceService } from "../../services/attendance.service";
import { AttendanceRepository } from "../../repositories";
import { IPerformanceSummary } from "../../types";
import { AppError, handleAsync } from "../../utils";

const attendanceService = new AttendanceService();
const attendanceRepo = new AttendanceRepository();

export class AnalyticsController {
  // Get performance summary for a specific school, class, and term
  getPerformanceSummary = handleAsync<{ schoolId: string; classId: string; term: string }>(
    async (req, res) => {
      const { schoolId, classId, term } = req.params;

      // Call service directly
      const summary: IPerformanceSummary = await computePerformanceSummary(
        schoolId,
        classId,
        term
      );

      if (!summary) throw new AppError("Performance summary not found", 404);

      res.json(summary);
    }
  );

  /**
   * GET /attendance/summary
   */
  getAttendanceSummary = handleAsync(async (req, res) => {
    const { schoolId, schoolYear } = req.query;

    if (!schoolId || !schoolYear) {
      throw new AppError("schoolId and schoolYear are required", 400);
    }

    const records = await attendanceRepo.findAllBySchoolYear(
      schoolId as string,
      schoolYear as string
    );

    const summary = attendanceService.calculateOverallSummary(records);

    res.json({
      success: true,
      data: summary,
    });
  });

  /**
   * GET /attendance/trends
   */
  getAttendanceTrends = handleAsync(async (req, res) => {
    const { classId, streamId, startDate, endDate } = req.query;

    if (!classId || !streamId || !startDate || !endDate) {
      throw new AppError(
        "classId, streamId, startDate, and endDate are required",
        400
      );
    }

    const records = await attendanceRepo.findByDateRange(
      classId as string,
      streamId as string,
      new Date(startDate as string),
      new Date(endDate as string)
    );

    const trends = attendanceService.calculateTrendData(records);

    res.json({
      success: true,
      data: trends,
    });
  });

  /**
   * GET /attendance/student/:id
   */
  getStudentAttendanceAnalytics = handleAsync<{ id: string }>(async (req, res) => {
    const studentId = req.params.id;

    const records = await attendanceRepo.findByStudent(studentId);

    const summary = attendanceService.calculateStudentSummary(records, studentId);

    res.json({
      success: true,
      data: summary,
    });
  });

  /**
   * GET /attendance/class/:id
   */
  getClassAttendanceAnalytics = handleAsync<{ id: string }>(async (req, res) => {
    const classId = req.params.id;
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      throw new AppError("startDate and endDate are required", 400);
    }

    const records = await attendanceRepo.findByClass(
      classId,
      new Date(startDate as string),
      new Date(endDate as string)
    );

    const summary = attendanceService.calculateOverallSummary(records);

    res.json({
      success: true,
      data: summary,
    });
  });

  /**
   * GET /attendance/at-risk
   */
  getAtRiskStudents = handleAsync(async (req, res) => {
    const { schoolId, schoolYear, threshold } = req.query;

    if (!schoolId || !schoolYear) {
      throw new AppError("schoolId and schoolYear required", 400);
    }

    const records = await attendanceRepo.findAllBySchoolYear(
      schoolId as string,
      schoolYear as string
    );

    const atRisk = attendanceService.getAtRiskStudents(
      records,
      threshold ? Number(threshold) : 75
    );

    res.json({
      success: true,
      data: atRisk,
    });
  });
}
