// server/src/routes/class.route.ts
import { Router } from "express";
import { createClassSchema, updateClassSchema } from "../validation/class.schema";
import { ClassController } from "../controllers";
import { validate } from "../middlewares/validate";

const classRouter = Router();
const classController = new ClassController();

/**
 * @swagger
 * tags:
 *   name: Classes
 *   description: API endpoints for managing school classes
 */

/**
 * @swagger
 * /api/v1/classes:
 *   post:
 *     summary: Create a new class
 *     tags: [Classes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClassCreate'
 *     responses:
 *       201:
 *         description: Class created successfully
 *       400:
 *         description: Validation error
 */
classRouter.post("/", validate(createClassSchema), classController.createClass);

/**
 * @swagger
 * /api/v1/classes:
 *   get:
 *     summary: Get paginated list of classes
 *     tags: [Classes]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of classes per page
 *     responses:
 *       200:
 *         description: Paginated list of classes
 */
classRouter.get("/", classController.getClasses);

/**
 * @swagger
 * /api/v1/classes/all:
 *   get:
 *     summary: Get all classes without pagination
 *     tags: [Classes]
 *     responses:
 *       200:
 *         description: List of all classes
 */
classRouter.get("/all", classController.getAllClasses);

/**
 * @swagger
 * /api/v1/classes/school/{schoolId}:
 *   get:
 *     summary: Get classes by school ID (optional academicYear)
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: schoolId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the school
 *       - in: query
 *         name: academicYear
 *         schema:
 *           type: string
 *         description: Optional academic year filter
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
 *         description: List of classes for the given school and academic year
 */
classRouter.get("/school/:schoolId", classController.getClassesByFilter);

/**
 * @swagger
 * /api/v1/classes/year/{academicYear}:
 *   get:
 *     summary: Get classes by academic year
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: academicYear
 *         required: true
 *         schema:
 *           type: string
 *         description: Academic year (e.g., 2024)
 *     responses:
 *       200:
 *         description: List of classes for the given year
 */
classRouter.get("/year/:academicYear", classController.getClassesByAcademicYear);

/**
 * @swagger
 * /api/v1/classes/{id}:
 *   get:
 *     summary: Get class by ID
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the class
 *     responses:
 *       200:
 *         description: Class details
 *       404:
 *         description: Class not found
 */
classRouter.get("/:id", classController.getClassById);

/**
 * @swagger
 * /api/v1/classes/{id}:
 *   patch:
 *     summary: Update a class by ID (partial update)
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the class
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClassUpdate'
 *     responses:
 *       200:
 *         description: Class updated successfully
 *       404:
 *         description: Class not found
 */
classRouter.patch("/:id", validate(updateClassSchema), classController.updateClass);

/**
 * @swagger
 * /api/v1/classes/{id}:
 *   delete:
 *     summary: Delete a class by ID
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Class deleted successfully
 *       404:
 *         description: Class not found
 */
classRouter.delete("/:id", classController.deleteClass);

/**
 * @swagger
 * /api/v1/classes:
 *   delete:
 *     summary: Delete all classes
 *     tags: [Classes]
 *     responses:
 *       204:
 *         description: All classes deleted successfully
 */
classRouter.delete("/", classController.deleteAllClasses);

export { classRouter };
