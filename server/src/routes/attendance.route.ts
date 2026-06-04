// server/src/routes/school-core/attendance.route.ts

import { Router } from "express";
import { AttendanceController } from "../controllers";
import {
  createAttendanceSchema,
  updateAttendanceSchema,
} from "../validation";
import { validate } from "../middlewares/validate";

const attendanceRouter = Router();
const attendanceController = new AttendanceController();

/**
 * @swagger
 * tags:
 *   name: Attendance
 *   description: API endpoints for managing attendance records
 */

/**
 * @swagger
 * /api/v1/attendance:
 *   post:
 *     summary: Create a new attendance record for a class on a specific date
 *     tags: [Attendance]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             school: "6857e1d7f0f9bdf3c7f1001"
 *             classRef: "6857e1d7f0f9bdf3c7f1002"
 *             streamId: "6857e1d7f0f9bdf3c7f1003"
 *             schoolYear: "2026"
 *             date: "2026-06-04"
 *             createdBy: "6857e1d7f0f9bdf3c7f1004"
 *             remarks: "Morning attendance"
 *             attendance:
 *               - studentId: "6857e1d7f0f9bdf3c7f1005"
 *                 status: "present"
 *               - studentId: "6857e1d7f0f9bdf3c7f1006"
 *                 status: "absent"
 *     responses:
 *       201:
 *         description: Attendance created successfully
 *       400:
 *         description: Validation error
 */
attendanceRouter.post(
  "/",
  validate(createAttendanceSchema),
  attendanceController.createAttendance
);

/**
 * @swagger
 * /api/v1/attendance:
 *   get:
 *     summary: Get all attendance records
 *     tags: [Attendance]
 *     responses:
 *       200:
 *         description: List of all attendance records
 */
attendanceRouter.get("/", attendanceController.getAllAttendance);

/**
 * @swagger
 * /api/v1/attendance/class:
 *   get:
 *     summary: Get attendance for a class and stream on a specific date
 *     tags: [Attendance]
 *     parameters:
 *       - in: query
 *         name: classId
 *         required: true
 *         schema:
 *           type: string
 *         description: Class ID
 *       - in: query
 *         name: streamId
 *         required: true
 *         schema:
 *           type: string
 *         description: Stream ID
 *       - in: query
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Attendance date
 *     responses:
 *       200:
 *         description: Attendance record found
 *       400:
 *         description: Missing required parameters
 */
attendanceRouter.get(
  "/class",
  attendanceController.getAttendanceByClassAndDate
);

/**
 * =========================
 * ANALYTICS ROUTES
 * =========================
 */

/**
 * @swagger
 * /api/v1/attendance/analytics/summary:
 *   get:
 *     summary: Get attendance summary analytics
 *     tags: [Attendance]
 */
attendanceRouter.get(
  "/analytics/summary",
  attendanceController.getAttendanceSummary
);

/**
 * @swagger
 * /api/v1/attendance/analytics/trends:
 *   get:
 *     summary: Get attendance trend analytics
 *     tags: [Attendance]
 */
attendanceRouter.get(
  "/analytics/trends",
  attendanceController.getAttendanceTrends
);

/**
 * @swagger
 * /api/v1/attendance/analytics/at-risk:
 *   get:
 *     summary: Get at-risk students based on attendance threshold
 *     tags: [Attendance]
 */
attendanceRouter.get(
  "/analytics/at-risk",
  attendanceController.getAtRiskStudents
);

/**
 * @swagger
 * /api/v1/attendance/analytics/student/{id}:
 *   get:
 *     summary: Get attendance analytics for a specific student
 *     tags: [Attendance]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Student ID
 */
attendanceRouter.get(
  "/analytics/student/:id",
  attendanceController.getStudentAttendanceAnalytics
);


/**
 * @swagger
 * /api/v1/attendance/{id}:
 *   get:
 *     summary: Get attendance by ID
 *     tags: [Attendance]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Attendance ID
 *     responses:
 *       200:
 *         description: Attendance details
 *       404:
 *         description: Attendance not found
 */
attendanceRouter.get("/:id", attendanceController.getAttendanceById);

/**
 * @swagger
 * /api/v1/attendance/student/{attendanceId}/{studentId}:
 *   patch:
 *     summary: Update a specific student's attendance status
 *     tags: [Attendance]
 *     parameters:
 *       - in: path
 *         name: attendanceId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             status: "present"
 *     responses:
 *       200:
 *         description: Student attendance status updated
 *       404:
 *         description: Attendance or student not found
 */
attendanceRouter.patch(
  "/student/:attendanceId/:studentId",
  attendanceController.updateStudentStatus
);

/**
 * @swagger
 * /api/v1/attendance/{id}:
 *   patch:
 *     summary: Replace the full attendance array for a class/date
 *     tags: [Attendance]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Attendance ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             updatedBy: "6857e1d7f0f9bdf3c7f1004"
 *             remarks: "Updated after roll call"
 *             attendance:
 *               - studentId: "6857e1d7f0f9bdf3c7f1005"
 *                 status: "present"
 *               - studentId: "6857e1d7f0f9bdf3c7f1006"
 *                 status: "late"
 *     responses:
 *       200:
 *         description: Attendance updated successfully
 *       404:
 *         description: Attendance not found
 */
attendanceRouter.patch(
  "/:id",
  validate(updateAttendanceSchema),
  attendanceController.updateAttendance
);

/**
 * @swagger
 * /api/v1/attendance/{id}:
 *   delete:
 *     summary: Delete an attendance record by ID
 *     tags: [Attendance]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Attendance ID
 *     responses:
 *       204:
 *         description: Attendance deleted successfully
 *       404:
 *         description: Attendance not found
 */
attendanceRouter.delete("/:id", attendanceController.deleteAttendance);



export { attendanceRouter };