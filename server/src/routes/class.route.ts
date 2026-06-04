// server/src/routes/class.route.ts
import { Router } from "express";
import { createClassSchema, updateClassSchema } from "../validation";
import { ClassController } from "../controllers";
import { validate } from "../middlewares/validate";
import { authenticateUser } from "../middlewares/auth";
import { UserRole } from "../types";

const classRouter = Router();
const classController = new ClassController();

/**
 * @swagger
 * tags:
 *   name: Classes
 *   description: Class management endpoints
 */

/**
 * CREATE CLASS
 */
classRouter.post(
  "/",
  authenticateUser([
    UserRole.SUPER_ADMIN,
    UserRole.SCHOOL_ADMIN,
    UserRole.PRINCIPAL,
  ]),
  validate(createClassSchema),
  classController.createClass
);

/**
 * @swagger
 * /api/v1/classes:
 *   post:
 *     summary: Create a new class
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - clasName
 *               - academicYear
 *             properties:
 *               school:
 *                 type: string
 *                 description: Required only for Super Admin (ObjectId)
 *               clasName:
 *                 type: string
 *                 example: "Grade 7"
 *               academicYear:
 *                 type: string
 *                 example: "2026"
 *     responses:
 *       201:
 *         description: Class created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
classRouter.get(
  "/",
  authenticateUser([
    UserRole.SCHOOL_ADMIN,
    UserRole.PRINCIPAL,
    UserRole.TEACHER,
  ]),
  classController.getAllClasses
);

/**
 * @swagger
 * /api/v1/classes:
 *   get:
 *     summary: Get paginated classes (scoped by school)
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of classes
 */
classRouter.get(
  "/all",
  authenticateUser([
    UserRole.SCHOOL_ADMIN,
    UserRole.PRINCIPAL,
    UserRole.TEACHER,
  ]),
  classController.getAllClasses
);

/**
 * @swagger
 * /api/v1/classes/school/{schoolId}:
 *   get:
 *     summary: Get classes by school ID (with optional academic year filter)
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: schoolId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: academicYear
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: Filtered class list
 */
classRouter.get(
  "/school/:schoolId",
  authenticateUser([
    UserRole.SUPER_ADMIN,
    UserRole.SCHOOL_ADMIN,
    UserRole.PRINCIPAL,
  ]),
  classController.getClassesByFilter
);

/**
 * @swagger
 * /api/v1/classes/year/{academicYear}:
 *   get:
 *     summary: Get classes by academic year
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: academicYear
 *         required: true
 *         schema:
 *           type: string
 *           example: "2026"
 *     responses:
 *       200:
 *         description: Classes for academic year
 */
classRouter.get(
  "/year/:academicYear",
  authenticateUser([
    UserRole.SCHOOL_ADMIN,
    UserRole.PRINCIPAL,
    UserRole.TEACHER,
  ]),
  classController.getClassesByAcademicYear
);

/**
 * @swagger
 * /api/v1/classes/{id}:
 *   get:
 *     summary: Get class by ID
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Class details
 *       404:
 *         description: Class not found
 */
classRouter.get(
  "/:id",
  authenticateUser([
    UserRole.SCHOOL_ADMIN,
    UserRole.PRINCIPAL,
    UserRole.TEACHER,
  ]),
  classController.getClassesByFilter
);

/**
 * @swagger
 * /api/v1/classes/{id}:
 *   patch:
 *     summary: Update class
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
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
 *             $ref: '#/components/schemas/ClassUpdate'
 *     responses:
 *       200:
 *         description: Updated successfully
 */
classRouter.patch(
  "/:id",
  authenticateUser([UserRole.SCHOOL_ADMIN, UserRole.PRINCIPAL]),
  validate(updateClassSchema),
  classController.updateClass
);

/**
 * @swagger
 * /api/v1/classes/{id}:
 *   delete:
 *     summary: Delete class
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Deleted successfully
 */
classRouter.delete(
  "/:id",
  authenticateUser([UserRole.SCHOOL_ADMIN, UserRole.PRINCIPAL]),
  classController.deleteClass
);

/**
 * @swagger
 * /api/v1/classes:
 *   delete:
 *     summary: Delete all classes (restricted)
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: All classes deleted
 */
classRouter.delete(
  "/",
  authenticateUser([UserRole.SCHOOL_ADMIN, UserRole.PRINCIPAL]),
  classController.deleteAllClasses
);

export { classRouter };