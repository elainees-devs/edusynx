import { Router } from "express";
import {
  createAcademicYearSchema,
  updateAcademicYearSchema,
} from "../validation/academic-year.schema";
import { validate } from "../middlewares/validate";
import { AcademicYearController } from "../controllers";
import { authenticateUser } from "../middlewares/auth";
import { UserRole } from "../types";

const academicYearRouter = Router();
const controller = new AcademicYearController();

/**
 * @swagger
 * tags:
 *   name: Academic Years
 *   description: Manage academic years and term periods
 */

/**
 * @swagger
 * /api/v1/academic-years:
 *   post:
 *     summary: Create a new academic year
 *     tags: [Academic Years]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AcademicYearCreate'
 *     responses:
 *       201:
 *         description: Academic year created
 */
academicYearRouter.post(
  "/",
  authenticateUser([UserRole.SCHOOL_ADMIN, UserRole.PRINCIPAL]),
  validate(createAcademicYearSchema),
  controller.createAcademicYear
);

/**
 * @swagger
 * /api/v1/academic-years:
 *   get:
 *     summary: Get paginated academic years
 *     tags: [Academic Years]
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
 *         description: Filter by school ID
 *       - in: query
 *         name: isActive
 *         schema:
 *           type: boolean
 *         description: Filter by active status
 *     responses:
 *       200:
 *         description: Paginated list of academic years
 */
academicYearRouter.get(
  "/",
  authenticateUser([UserRole.SCHOOL_ADMIN, UserRole.PRINCIPAL, UserRole.TEACHER]),
  controller.getAcademicYears
);

/**
 * @swagger
 * /api/v1/academic-years/all:
 *   get:
 *     summary: Get all academic years without pagination
 *     tags: [Academic Years]
 *     responses:
 *       200:
 *         description: List of all academic years
 */
academicYearRouter.get(
  "/all",
  authenticateUser([UserRole.SCHOOL_ADMIN, UserRole.PRINCIPAL, UserRole.TEACHER]),
  controller.getAllAcademicYears
);

/**
 * @swagger
 * /api/v1/academic-years/active:
 *   get:
 *     summary: Get the active academic year for a school
 *     tags: [Academic Years]
 *     parameters:
 *       - in: query
 *         name: school
 *         required: true
 *         schema:
 *           type: string
 *         description: School ID
 *     responses:
 *       200:
 *         description: Active academic year
 *       404:
 *         description: No active academic year found
 */
academicYearRouter.get(
  "/active",
  authenticateUser([UserRole.SCHOOL_ADMIN, UserRole.PRINCIPAL, UserRole.TEACHER]),
  controller.getActiveAcademicYear
);

/**
 * @swagger
 * /api/v1/academic-years/{id}:
 *   get:
 *     summary: Get academic year by ID
 *     tags: [Academic Years]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Academic year found
 *       404:
 *         description: Not found
 */
academicYearRouter.get(
  "/:id",
  authenticateUser([UserRole.SCHOOL_ADMIN, UserRole.PRINCIPAL, UserRole.TEACHER]),
  controller.getAcademicYearById
);

/**
 * @swagger
 * /api/v1/academic-years/{id}:
 *   patch:
 *     summary: Update an academic year
 *     tags: [Academic Years]
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
 *             $ref: '#/components/schemas/AcademicYearUpdate'
 *     responses:
 *       200:
 *         description: Academic year updated
 *       404:
 *         description: Not found
 */
academicYearRouter.patch(
  "/:id",
  authenticateUser([UserRole.SCHOOL_ADMIN, UserRole.PRINCIPAL]),
  validate(updateAcademicYearSchema),
  controller.updateAcademicYear
);

/**
 * @swagger
 * /api/v1/academic-years/{id}:
 *   delete:
 *     summary: Delete an academic year
 *     tags: [Academic Years]
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
academicYearRouter.delete(
  "/:id",
  authenticateUser([UserRole.SCHOOL_ADMIN, UserRole.PRINCIPAL]),
  controller.deleteAcademicYear
);

/**
 * @swagger
 * /api/v1/academic-years:
 *   delete:
 *     summary: Delete all academic years
 *     tags: [Academic Years]
 *     responses:
 *       204:
 *         description: All deleted
 */
academicYearRouter.delete(
  "/",
  authenticateUser([UserRole.SCHOOL_ADMIN, UserRole.PRINCIPAL]),
  controller.deleteAllAcademicYears
);

export { academicYearRouter };
