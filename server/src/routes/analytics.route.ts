// server/src/routes/analytics.routes.ts
import { Router } from "express";
import { AnalyticsController } from "../controllers";


const analyticsRouter = Router();
const analyticsController = new AnalyticsController();

/**
 * @swagger
 * tags:
 *   name: Analytics
 *   description: API endpoints for school performance analytics
 */

/**
 * @swagger
 * /api/v1/analytics/performance/{schoolId}/{classId}/{term}:
 *   get:
 *     summary: Get performance summary for a specific school, class, and term
 *     tags: [Analytics]
 *     parameters:
 *       - in: path
 *         name: schoolId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the school
 *       - in: path
 *         name: classId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the class
 *       - in: path
 *         name: term
 *         required: true
 *         schema:
 *           type: string
 *         description: Academic term (e.g., Term 1)
 *     responses:
 *       200:
 *         description: Performance summary retrieved successfully
 *       404:
 *         description: Performance summary not found
 */
analyticsRouter.get(
  "/performance/:schoolId/:classId/:term",
  analyticsController.getPerformanceSummary
);

export { analyticsRouter };
