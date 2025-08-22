// server/src/routes/class.teacher.route.ts
import { Router } from "express";
import { ClassTeacherController } from "../controllers";
import { validate } from "../middlewares/validate";
import { createClassTeacherSchema } from "../validation/class.teacher.schema";

const classTeacherRoute = Router();
const classTeacherController = new ClassTeacherController();

/**
 * @swagger
 * tags:
 *   name: ClassTeachers
 *   description: Endpoints for managing class teachers
 */

/**
 * @swagger
 * /class-teachers:
 *   post:
 *     summary: Add a new class teacher
 *     tags: [ClassTeachers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClassTeacher'
 *     responses:
 *       201:
 *         description: Class teacher created successfully
 *       400:
 *         description: Invalid input
 */
classTeacherRoute.post(
  "/assign",
  validate(createClassTeacherSchema),
  classTeacherController.addClassTeacher
);

/**
 * @swagger
 * /class-teachers/{id}:
 *   get:
 *     summary: Get a class teacher by ID
 *     tags: [ClassTeachers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Class teacher ID
 *     responses:
 *       200:
 *         description: Class teacher retrieved successfully
 *       404:
 *         description: Class teacher not found
 */
classTeacherRoute.get("/:id", classTeacherController.getClassTeacherById);

/**
 * @swagger
 * /class-teachers:
 *   get:
 *     summary: Get all class teachers
 *     tags: [ClassTeachers]
 *     responses:
 *       200:
 *         description: List of class teachers
 */
classTeacherRoute.get("/", classTeacherController.getAllClassTeachers);

/**
 * @swagger
 * /class-teachers/{id}:
 *   delete:
 *     summary: Delete a class teacher by ID
 *     tags: [ClassTeachers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Class teacher ID
 *     responses:
 *       204:
 *         description: Class teacher deleted successfully
 *       404:
 *         description: Class teacher not found
 */
classTeacherRoute.delete("/:id", classTeacherController.deleteClassTeacher);

/**
 * @swagger
 * /class-teachers:
 *   delete:
 *     summary: Delete all class teachers
 *     tags: [ClassTeachers]
 *     responses:
 *       204:
 *         description: All class teachers deleted successfully
 */
classTeacherRoute.delete("/", classTeacherController.deleteAllClassTeachers);



export { classTeacherRoute };
