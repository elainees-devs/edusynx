// server/src/routes/school-core/attendance.route.ts
import { Router } from "express";
import { AttendanceController } from "../controllers";
import { createAttendanceSchema, updateAttendanceSchema } from "../validation";
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
 *           schema:
 *             $ref: '#/components/schemas/AttendanceCreate'
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
 * /api/v1/attendance/class:
 *   get:
 *     summary: Get attendance for a class on a specific date with pagination
 *     tags: [Attendance]
 *     parameters:
 *       - in: query
 *         name: classId
 *         required: true
 *         schema:
 *           type: string
 *         description: Class ID
 *       - in: query
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Date to filter attendance (ISO format)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Paginated attendance for the class on the given date
 *       400:
 *         description: Missing parameters
 */
attendanceRouter.get("/class", attendanceController.getAttendanceByClassAndDate);

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
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [present, absent, late, excused]
 *                 example: present
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AttendanceUpdate'
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
 *     responses:
 *       204:
 *         description: Attendance deleted successfully
 *       404:
 *         description: Attendance not found
 */
attendanceRouter.delete("/:id", attendanceController.deleteAttendance);

export { attendanceRouter };
