//server/src/routes/class.route.ts
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
 * /api/classes:
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
 * /api/classes:
 *   get:
 *     summary: Get all classes
 *     tags: [Classes]
 *     responses:
 *       200:
 *         description: List of all classes
 */
classRouter.get("/", classController.getAllClasses);

/**
 * @swagger
 * /api/classes/school/{schoolId}:
 *   get:
 *     summary: Get classes by school ID
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: schoolId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the school
 *     responses:
 *       200:
 *         description: Classes found for the given school
 */
classRouter.get("/school/:schoolId", classController.getClassesBySchoolId);

/**
 * @swagger
 * /api/classes/year/{academicYear}:
 *   get:
 *     summary: Get classes by academic year
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: academicYear
 *         required: true
 *         schema:
 *           type: string
 *         description: Academic year (e.g. 2024)
 *     responses:
 *       200:
 *         description: Classes found for the given year
 */
classRouter.get("/year/:academicYear", classController.getClassesByAcademicYear);

/**
 * @swagger
 * /api/classes/{id}:
 *   get:
 *     summary: Get a class by ID
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
 */
classRouter.get("/:id", classController.getClassById);

/**
 * @swagger
 * /api/classes/{id}:
 *   put:
 *     summary: Update a class by ID
 *     tags: [Classes]
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
 *         description: Class updated successfully
 */
classRouter.put("/:id", validate(updateClassSchema), classController.updateClass);

/**
 * @swagger
 * /api/classes/{id}:
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
 */
classRouter.delete("/:id", classController.deleteClass);

/**
 * @swagger
 * /api/classes:
 *   delete:
 *     summary: Delete all classes
 *     tags: [Classes]
 *     responses:
 *       204:
 *         description: All classes deleted
 */
classRouter.delete("/", classController.deleteAllClasses);

export { classRouter };
