// server/src/routes/subject.route.ts
import { Router } from "express";
import { SubjectController } from "../controllers";
import { validate } from "../middlewares/validate";
import {
  createSubjectSchema,
  updateSubjectSchema,
} from "../validation/subject.schema";

const subjectRouter = Router();
const subjectController = new SubjectController();

/**
 * @swagger
 * tags:
 *   name: Subjects
 *   description: Manage academic subjects in the school
 */

/**
 * @swagger
 * /api/subjects:
 *   post:
 *     summary: Create a new subject
 *     tags: [Subjects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SubjectCreate'
 *     responses:
 *       201:
 *         description: Subject created successfully
 *       400:
 *         description: Validation error
 */
subjectRouter.post(
  "/",
  validate(createSubjectSchema),
  subjectController.createSubject
);

/**
 * @swagger
 * /api/subjects/school/{schoolId}:
 *   get:
 *     summary: Get all subjects for a specific school
 *     tags: [Subjects]
 *     parameters:
 *       - in: path
 *         name: schoolId
 *         required: true
 *         schema:
 *           type: string
 *         description: School ID
 *     responses:
 *       200:
 *         description: List of subjects for the school
 */
subjectRouter.get("/school/:schoolId", subjectController.getSubjectsBySchool);

/**
 * @swagger
 * /api/subjects/{id}:
 *   get:
 *     summary: Get a subject by ID
 *     tags: [Subjects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Subject ID
 *     responses:
 *       200:
 *         description: Subject found
 *       404:
 *         description: Subject not found
 */
subjectRouter.get("/:id", subjectController.getSubjectById);

/**
 * @swagger
 * /api/subjects/{id}:
 *   put:
 *     summary: Update a subject by ID
 *     tags: [Subjects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Subject ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SubjectUpdate'
 *     responses:
 *       200:
 *         description: Subject updated
 *       400:
 *         description: Validation error
 *       404:
 *         description: Subject not found
 */
subjectRouter.put(
  "/:id",
  validate(updateSubjectSchema),
  subjectController.updateSubject
);

/**
 * @swagger
 * /api/subjects/{id}:
 *   delete:
 *     summary: Delete a subject by ID
 *     tags: [Subjects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Subject ID
 *     responses:
 *       204:
 *         description: Subject deleted
 *       404:
 *         description: Subject not found
 */
subjectRouter.delete("/:id", subjectController.deleteSubject);

export { subjectRouter };
