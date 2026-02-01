// server/src/routes/teacher-subject.route.ts
import { Router } from "express";
import { TeacherSubjectController } from "../controllers";
import { validate } from "../middlewares/validate";
import { createTeacherSubjectSchema, updateTeacherSubjectSchema } from "../validation/teacherSubject.schema";

const teacherSubjectRouter = Router();
const teacherSubjectController = new TeacherSubjectController();

/**
 * @swagger
 * /api/v1/teacher-subjects:
 *   post:
 *     summary: Assign a teacher to subjects/classes/streams
 *     tags:
 *       - TeacherSubjects
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TeacherSubjectCreate'
 *     responses:
 *       201:
 *         description: Teacher assigned successfully
 *       400:
 *         description: Validation error
 */
teacherSubjectRouter.post(
  "/",
  validate(createTeacherSubjectSchema),
  teacherSubjectController.assignSubjects
);

/**
 * @swagger
 * /api/v1/teacher-subjects:
 *   get:
 *     summary: Get paginated list of teacher-subject assignments
 *     tags:
 *       - TeacherSubjects
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
 *         name: teacherId
 *         schema:
 *           type: string
 *       - in: query
 *         name: subjectId
 *         schema:
 *           type: string
 *       - in: query
 *         name: classId
 *         schema:
 *           type: string
 *       - in: query
 *         name: streamId
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Paginated list of assignments
 */
teacherSubjectRouter.get("/", teacherSubjectController.getTeacherSubjects);

/**
 * @swagger
 * /api/v1/teacher-subjects/all:
 *   get:
 *     summary: Get all teacher-subject assignments
 *     tags:
 *       - TeacherSubjects
 *     responses:
 *       200:
 *         description: List of all assignments
 */
teacherSubjectRouter.get("/all", teacherSubjectController.getTeacherSubjects);

/**
 * @swagger
 * /api/v1/teacher-subjects/school/{schoolId}:
 *   get:
 *     summary: Get all teacher-subject assignments for a school
 *     tags:
 *       - TeacherSubjects
 *     parameters:
 *       - in: path
 *         name: schoolId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of assignments for the school
 */
teacherSubjectRouter.get(
  "/school/:schoolId",
  teacherSubjectController.getTeachersAndSubjectsBySchool
);

/**
 * @swagger
 * /api/v1/teacher-subjects/{id}:
 *   get:
 *     summary: Get a teacher-subject assignment by ID
 *     tags:
 *       - TeacherSubjects
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Assignment found
 *       404:
 *         description: Assignment not found
 */
teacherSubjectRouter.get("/:id", teacherSubjectController.getTeacherSubjectById);

/**
 * @swagger
 * /api/v1/teacher-subjects/{id}:
 *   patch:
 *     summary: Update a teacher-subject assignment by ID
 *     tags:
 *       - TeacherSubjects
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
 *             $ref: '#/components/schemas/TeacherSubjectUpdate'
 *     responses:
 *       200:
 *         description: Assignment updated successfully
 *       404:
 *         description: Assignment not found
 */
teacherSubjectRouter.patch(
  "/:id",
  validate(updateTeacherSubjectSchema),
  teacherSubjectController.updateTeacherSubject
);

/**
 * @swagger
 * /api/v1/teacher-subjects/{id}:
 *   delete:
 *     summary: Delete a teacher-subject assignment by ID
 *     tags:
 *       - TeacherSubjects
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Assignment deleted successfully
 *       404:
 *         description: Assignment not found
 */
teacherSubjectRouter.delete("/:id", teacherSubjectController.deleteTeacherSubject);

export { teacherSubjectRouter };
