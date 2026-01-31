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
 * /api/v1/subjects:
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
subjectRouter.post("/", validate(createSubjectSchema), subjectController.createSubject);

/**
 * @swagger
 * /api/v1/subjects:
 *   get:
 *     summary: Get paginated list of subjects
 *     tags: [Subjects]
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
 *     responses:
 *       200:
 *         description: Paginated list of subjects
 */
subjectRouter.get("/", subjectController.getSubjects);

/**
 * @swagger
 * /api/v1/subjects/all:
 *   get:
 *     summary: Get all subjects without pagination
 *     tags: [Subjects]
 *     responses:
 *       200:
 *         description: List of all subjects
 */
subjectRouter.get("/all", subjectController.getAllSubjects);

/**
 * @swagger
 * /api/v1/subjects/school/{schoolId}:
 *   get:
 *     summary: Get all subjects for a specific school
 *     tags: [Subjects]
 *     parameters:
 *       - in: path
 *         name: schoolId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of subjects for the school
 */
subjectRouter.get("/school/:schoolId", subjectController.getSubjectsBySchool);

/**
 * @swagger
 * /api/v1/subjects/{id}:
 *   get:
 *     summary: Get a subject by ID
 *     tags: [Subjects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Subject found
 *       404:
 *         description: Subject not found
 */
subjectRouter.get("/:id", subjectController.getSubjectById);

/**
 * @swagger
 * /api/v1/subjects/{id}:
 *   patch:
 *     summary: Update a subject by ID
 *     tags: [Subjects]
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
 *             $ref: '#/components/schemas/SubjectUpdate'
 *     responses:
 *       200:
 *         description: Subject updated
 *       404:
 *         description: Subject not found
 */
subjectRouter.patch(
  "/:id",
  validate(updateSubjectSchema),
  subjectController.updateSubject
);

/**
 * @swagger
 * /api/v1/subjects/{id}:
 *   delete:
 *     summary: Delete a subject by ID
 *     tags: [Subjects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Subject deleted
 *       404:
 *         description: Subject not found
 */
subjectRouter.delete("/:id", subjectController.deleteSubject);

/**
 * @swagger
 * /api/v1/subjects:
 *   delete:
 *     summary: Delete all subjects
 *     tags: [Subjects]
 *     responses:
 *       204:
 *         description: All subjects deleted
 */
subjectRouter.delete("/", subjectController.deleteAllSubjects);

export { subjectRouter };
