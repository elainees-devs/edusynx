// server/src/controllers/analytics/analytics.controller.ts

import { computePerformanceSummary } from "../../services/analytics.service";
import { IPerformanceSummary } from "../../types";
import { AppError, handleAsync } from "../../utils";

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
}
