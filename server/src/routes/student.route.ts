// server/src/routes/student.route.ts
import { Router } from "express";
import { StudentController } from "../controllers";
import { createStudentSchema, updateStudentSchema } from "../validation/student.schema";
import { validate } from "../middlewares/validate";
import multer from "multer";

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
 *     summary: Upload students via CSV or Excel file
 *     tags: [Students]
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
 *                 description: CSV or Excel file containing students
 *     responses:
 *       201:
 *         description: Students successfully uploaded
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 students:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Student'
 *       400:
 *         description: No file uploaded
 *       500:
 *         description: Server error
 */
studentRouter.post("/upload", upload.single("file"), studentController.uploadStudentsData);


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
 * @openapi
 * /api/v1/students/{id}/assign-guardian:
 *   patch:
 *     summary: Assign a guardian and generate an admission number for a student
 *     tags:
 *       - Students
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the student to assign guardian and generate admission number
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               guardianId:
 *                 type: string
 *                 description: ID of the guardian to assign to the student
 *             required:
 *               - guardianId
 *     responses:
 *       200:
 *         description: Guardian assigned and admission number generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Guardian assigned and admission number generated successfully
 *                 student:
 *                   $ref: '#/components/schemas/Student'
 *       400:
 *         description: Bad request (e.g., missing guardian ID or invalid data)
 *       404:
 *         description: Student or guardian not found
 *       500:
 *         description: Internal server error
 */
studentRouter.patch(
  "/:id/assign-guardian",
  studentController.generateAdmissionAndCreateStudent
);


/**
 * @swagger
 * /api/v1/students/generate-admission:
 *   post:
 *     summary: Generate admission number and register student
 *     tags: [Students]
 *     responses:
 *       201:
 *         description: Admission generated and student registered
 */
studentRouter.post("/generate-admission", studentController.generateAdmissionAndCreateStudent);

/**
 * @swagger
 * /api/v1/students/active:
 *   get:
 *     summary: Retrieve all students with active status
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: List of active students
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Student'
 *       500:
 *         description: Server error
 */
studentRouter.get("/active", studentController.getActiveStudents);




/**
 * @swagger
 * /api/v1/students/student/{id}:
 *   get:
 *     summary: Get student name by ID
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Student ID
 *     responses:
 *       200:
 *         description: Student name
 */



studentRouter.get("/student/guardian/:id", studentController.getStudentWithGuardianById);

/**
 * @swagger
 * /api/v1/students:
 *   get:
 *     summary: Get all students
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: List of all students
 */
studentRouter.get("/students", studentController.getAllStudents);

/**
 * @swagger
 * /api/v1/students/class/{className}:
 *   get:
 *     summary: Get students by class name
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: className
 *         required: true
 *         schema:
 *           type: string
 *         description: Class name
 *     responses:
 *       200:
 *         description: Students in the class
 */
studentRouter.get("/students/class/:className", studentController.getStudentsByClassName);

/**
 * @swagger
 * /api/v1/students/names:
 *   get:
 *     summary: Get names of all students
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: List of student names
 */
studentRouter.get("/students/names", studentController.getAllStudentNames);

/**
 * @swagger
 * /api/v1/students/count/{id}:
 *   get:
 *     summary: Count students by school or class ID
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Class or school ID
 *     responses:
 *       200:
 *         description: Number of students
 */
studentRouter.get("/students/count/:id", studentController.countStudents);

/**
 * @swagger
 * /api/v1/students/student/update/{id}:
 *   put:
 *     summary: Update student by ID
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Student ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StudentUpdate'
 *     responses:
 *       200:
 *         description: Student updated
 */
studentRouter.put("/update/:id", validate(updateStudentSchema), studentController.updateStudentById);

/**
 * @swagger
 * /api/v1/students/student/{id}:
 *   delete:
 *     summary: Delete student by ID
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Student ID
 *     responses:
 *       204:
 *         description: Student deleted
 */
studentRouter.delete("/:id", studentController.deleteStudentById);

/**
 * @swagger
 * /api/v1/students:
 *   delete:
 *     summary: Delete all students
 *     tags: [Students]
 *     responses:
 *       204:
 *         description: All students deleted
 */
studentRouter.delete("/students", studentController.deleteAllStudents);

export { studentRouter };

