// server/src/routes/exam.route.ts
import { Router } from "express";
import { ExamController } from "../controllers";
import { createExamSchema, updateExamSchema } from "../validation/exam.schema";
import { validate } from "../middlewares/validate";

const examRouter = Router();
const examController = new ExamController();

/**
 * @swagger
 * tags:
 *   name: Exams
 *   description: Exam management endpoints
 */

/**
 * @swagger
 * /api/exams:
 *   post:
 *     summary: Create a new exam
 *     tags: [Exams]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ExamCreate'
 *     responses:
 *       201:
 *         description: Exam created successfully
 *       400:
 *         description: Validation error
 */
examRouter.post("/", validate(createExamSchema), examController.createExam);

/**
 * @swagger
 * /api/exams:
 *   get:
 *     summary: Get all exams
 *     tags: [Exams]
 *     responses:
 *       200:
 *         description: A list of exams
 */
examRouter.get("/", examController.getAllExams);

/**
 * @swagger
 * /api/exams/{id}:
 *   get:
 *     summary: Get a specific exam by ID
 *     tags: [Exams]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the exam
 *     responses:
 *       200:
 *         description: Exam found
 *       404:
 *         description: Exam not found
 */
examRouter.get("/:id", examController.getExamById);

/**
 * @swagger
 * /api/exams/{id}:
 *   put:
 *     summary: Update an exam by ID
 *     tags: [Exams]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the exam to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ExamUpdate'
 *     responses:
 *       200:
 *         description: Exam updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Exam not found
 */
examRouter.put("/:id", validate(updateExamSchema), examController.updateExam);

/**
 * @swagger
 * /api/exams/{id}:
 *   delete:
 *     summary: Delete an exam by ID
 *     tags: [Exams]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the exam to delete
 *     responses:
 *       204:
 *         description: Exam deleted successfully
 */
examRouter.delete("/:id", examController.deleteExam);

/**
 * @swagger
 * /api/exams:
 *   delete:
 *     summary: Delete all exams
 *     tags: [Exams]
 *     responses:
 *       204:
 *         description: All exams deleted
 */
examRouter.delete("/", examController.deleteAllExams);

export { examRouter };



