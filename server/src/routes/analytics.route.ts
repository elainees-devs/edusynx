// server/src/routes/analytics.routes.ts
import { Router } from "express";
import { AnalyticsController } from "../controllers";
import { authenticateUser } from "../middlewares/auth";

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
  authenticateUser(),
  analyticsController.getPerformanceSummary
);

/**
 * @swagger
 * /api/v1/analytics/attendance/summary:
 *   get:
 *     summary: Get attendance summary analytics
 *     tags: [Analytics]
 */
analyticsRouter.get(
  "/attendance/summary",
  authenticateUser(),
  analyticsController.getAttendanceSummary
);

/**
 * @swagger
 * /api/v1/analytics/attendance/trends:
 *   get:
 *     summary: Get attendance trend analytics
 *     tags: [Analytics]
 */
analyticsRouter.get(
  "/attendance/trends",
  authenticateUser(),
  analyticsController.getAttendanceTrends
);

/**
 * @swagger
 * /api/v1/analytics/attendance/class/{id}:
 *   get:
 *     summary: Get attendance analytics for a specific class
 *     tags: [Analytics]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Class ID
 */
analyticsRouter.get(
  "/attendance/class/:id",
  authenticateUser(),
  analyticsController.getClassAttendanceAnalytics
);

/**
 * @swagger
 * /api/v1/analytics/attendance/at-risk:
 *   get:
 *     summary: Get at-risk students based on attendance threshold
 *     tags: [Analytics]
 */
analyticsRouter.get(
  "/attendance/at-risk",
  authenticateUser(),
  analyticsController.getAtRiskStudents
);

/**
 * @swagger
 * /api/v1/analytics/attendance/student/{id}:
 *   get:
 *     summary: Get attendance analytics for a specific student
 *     tags: [Analytics]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Student ID
 */
analyticsRouter.get(
  "/attendance/student/:id",
  authenticateUser(),
  analyticsController.getStudentAttendanceAnalytics
);

export { analyticsRouter };
