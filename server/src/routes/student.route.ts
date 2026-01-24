// server/src/routes/student.route.ts
import { Router } from "express";
import multer from "multer";
import { StudentController } from "../controllers";
import { createStudentSchema, updateStudentSchema } from "../validation/student.schema";
import { validate } from "../middlewares/validate";
import { UserRole } from "../types";
import { authenticateUser } from "../middlewares/auth";

const studentRouter = Router();
const studentController = new StudentController();
const upload = multer({ storage: multer.memoryStorage() });

/**
 * @swagger
 * tags:
 *   name: Students
 *   description: Manage students in the system
 */

/**
 * @swagger
 * /api/v1/students/upload:
 *   post:
 *     summary: Upload students via CSV or Excel
 *     tags: [Students]
 *     consumes:
 *       - multipart/form-data
 *
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: CSV or Excel file containing student data
 *               schoolId:
 *                 type: string
 *                 description: School ID
 *                 example: 695d29b347d57b0dc35577d3
 *     responses:
 *       201:
 *         description: Students successfully uploaded
 *       400:
 *         description: No file uploaded or school ID missing
 *       401:
 *         description: Unauthorized (invalid token)
 *       403:
 *         description: Access denied for user role
 *       500:
 *         description: Server error
 */
studentRouter.post(
  "/upload",
  authenticateUser([UserRole.SCHOOL_ADMIN, UserRole.PRINCIPAL]), // ✅ allow multiple roles
  upload.single("file"),                                           // ✅ handle CSV/Excel
  studentController.uploadStudentsData                             // ✅ uses req.user.school
);

/**
 * @swagger
 * /api/v1/students:
 *   post:
 *     summary: Create a new student
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StudentCreate'
 *     responses:
 *       201:
 *         description: Student created successfully
 */
studentRouter.post("/", validate(createStudentSchema), studentController.generateAdmissionAndCreateStudent);

/**
 * @swagger
 * /api/v1/students/{id}/assign-guardian:
 *   patch:
 *     summary: Assign a guardian and generate an admission number for a student
 *     tags: [Students]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the student
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               guardianId:
 *                 type: string
 *             required:
 *               - guardianId
 *     responses:
 *       200:
 *         description: Guardian assigned and admission number generated successfully
 */
studentRouter.patch("/:id/assign-guardian", studentController.generateAdmissionAndCreateStudent);

/**
 * @swagger
 * /api/v1/students/:
 *   get:
 *     summary: Retrieve all students
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: List of all students
 */
studentRouter.get("/", studentController.getAllStudents);

/**
 * @swagger
 * /api/v1/students/active:
 *   get:
 *     summary: Retrieve all students with active status
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: List of active students
 */
studentRouter.get("/active", studentController.getActiveStudents);

/**
 * @swagger
 * /api/v1/students/student/guardian/{id}:
 *   get:
 *     summary: Get student along with guardian by ID
 *     tags: [Students]
 */
studentRouter.get("/student/guardian/:id", studentController.getStudentWithGuardianById);



/**
 * @swagger
 * /api/v1/students/names:
 *   get:
 *     summary: Get names of all students
 *     tags: [Students]
 */
studentRouter.get("/students/names", studentController.getAllStudentNames);

/**
 * @swagger
 * /api/v1/students/count/{id}:
 *   get:
 *     summary: Count students by school or class ID
 *     tags: [Students]
 */
studentRouter.get("/count/:id", studentController.countStudents);

/**
 * @swagger
 * /api/v1/students/{id}:
 *   patch:
 *     summary: Update student by ID
 *     tags: [Students]
 */
studentRouter.patch("/:id", validate(updateStudentSchema), studentController.updateStudentById);

/**
 * @swagger
 * /api/v1/students/{id}:
 *   delete:
 *     summary: Delete student by ID
 *     tags: [Students]
 */
studentRouter.delete("/:id", studentController.deleteStudentById);

/**
 * @swagger
 * /api/v1/students:
 *   delete:
 *     summary: Delete all students
 *     tags: [Students]
 */
studentRouter.delete("/", studentController.deleteAllStudents);

export { studentRouter };
