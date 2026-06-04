import { Router } from "express";
import {
  createEnrollmentSchema,
  updateEnrollmentSchema,
} from "../validation/enrollment.schema";
import { validate } from "../middlewares/validate";
import { EnrollmentController } from "../controllers";
import { authenticateUser } from "../middlewares/auth";
import { UserRole } from "../types";

const enrollmentRouter = Router();
const controller = new EnrollmentController();

/**
 * @swagger
 * tags:
 *   name: Enrollments
 *   description: Manage student enrollments
 */

/**
 * @swagger
 * /api/v1/enrollments:
 *   post:
 *     summary: Create a new enrollment record
 *     tags: [Enrollments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EnrollmentCreate'
 *     responses:
 *       201:
 *         description: Enrollment created
 */
enrollmentRouter.post(
  "/",
  authenticateUser([UserRole.SCHOOL_ADMIN, UserRole.PRINCIPAL]),
  validate(createEnrollmentSchema),
  controller.createEnrollment
);

/**
 * @swagger
 * /api/v1/enrollments:
 *   get:
 *     summary: Get paginated enrollments
 *     tags: [Enrollments]
 *     parameters:
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
 *       - in: query
 *         name: school
 *         schema:
 *           type: string
 *       - in: query
 *         name: student
 *         schema:
 *           type: string
 *       - in: query
 *         name: clas
 *         schema:
 *           type: string
 *       - in: query
 *         name: stream
 *         schema:
 *           type: string
 *       - in: query
 *         name: academicYear
 *         schema:
 *           type: string
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *       - in: query
 *         name: enrollmentType
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Paginated list of enrollments
 */
enrollmentRouter.get(
  "/",
  authenticateUser([UserRole.SCHOOL_ADMIN, UserRole.PRINCIPAL, UserRole.TEACHER]),
  controller.getEnrollments
);

/**
 * @swagger
 * /api/v1/enrollments/all:
 *   get:
 *     summary: Get all enrollments without pagination
 *     tags: [Enrollments]
 *     responses:
 *       200:
 *         description: List of all enrollments
 */
enrollmentRouter.get(
  "/all",
  authenticateUser([UserRole.SCHOOL_ADMIN, UserRole.PRINCIPAL, UserRole.TEACHER]),
  controller.getAllEnrollments
);

/**
 * @swagger
 * /api/v1/enrollments/by-student:
 *   get:
 *     summary: Get enrollments by student ID
 *     tags: [Enrollments]
 *     parameters:
 *       - in: query
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of enrollments for the student
 */
enrollmentRouter.get(
  "/by-student",
  authenticateUser([UserRole.SCHOOL_ADMIN, UserRole.PRINCIPAL, UserRole.TEACHER]),
  controller.getEnrollmentsByStudent
);

/**
 * @swagger
 * /api/v1/enrollments/by-academic-year:
 *   get:
 *     summary: Get enrollments by academic year ID
 *     tags: [Enrollments]
 *     parameters:
 *       - in: query
 *         name: academicYearId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of enrollments for the academic year
 */
enrollmentRouter.get(
  "/by-academic-year",
  authenticateUser([UserRole.SCHOOL_ADMIN, UserRole.PRINCIPAL, UserRole.TEACHER]),
  controller.getEnrollmentsByAcademicYear
);

/**
 * @swagger
 * /api/v1/enrollments/{id}:
 *   get:
 *     summary: Get enrollment by ID
 *     tags: [Enrollments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Enrollment found
 *       404:
 *         description: Not found
 */
enrollmentRouter.get(
  "/:id",
  authenticateUser([UserRole.SCHOOL_ADMIN, UserRole.PRINCIPAL, UserRole.TEACHER]),
  controller.getEnrollmentById
);

/**
 * @swagger
 * /api/v1/enrollments/{id}:
 *   patch:
 *     summary: Update an enrollment
 *     tags: [Enrollments]
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
 *             $ref: '#/components/schemas/EnrollmentUpdate'
 *     responses:
 *       200:
 *         description: Enrollment updated
 *       404:
 *         description: Not found
 */
enrollmentRouter.patch(
  "/:id",
  authenticateUser([UserRole.SCHOOL_ADMIN, UserRole.PRINCIPAL]),
  validate(updateEnrollmentSchema),
  controller.updateEnrollment
);

/**
 * @swagger
 * /api/v1/enrollments/{id}:
 *   delete:
 *     summary: Delete an enrollment
 *     tags: [Enrollments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Deleted successfully
 *       404:
 *         description: Not found
 */
enrollmentRouter.delete(
  "/:id",
  authenticateUser([UserRole.SCHOOL_ADMIN, UserRole.PRINCIPAL]),
  controller.deleteEnrollment
);

/**
 * @swagger
 * /api/v1/enrollments:
 *   delete:
 *     summary: Delete all enrollments
 *     tags: [Enrollments]
 *     responses:
 *       204:
 *         description: All deleted
 */
enrollmentRouter.delete(
  "/",
  authenticateUser([UserRole.SCHOOL_ADMIN, UserRole.PRINCIPAL]),
  controller.deleteAllEnrollments
);

export { enrollmentRouter };
