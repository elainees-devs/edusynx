//src/routes/student.route.ts
import { Router } from "express";
import { StudentController } from "../controllers";
import { createStudentSchema, updateStudentSchema } from "../validation/student.schema";
import { validate } from "../middlewares/validate";

const studentRouter = Router();
const studentController = new StudentController();


studentRouter.post("/", validate(createStudentSchema), studentController.createStudent);
studentRouter.post("/generate-admission",studentController.generateAdmissionAndCreateStudent);
studentRouter.get("/student/:id", studentController.getStudentNameById);
studentRouter.get("/student/guardian/:id", studentController.getStudentWithGuardianById);
studentRouter.get("/students", studentController.getAllStudents);
studentRouter.get("/students/class/:className", studentController.getStudentsByClassName);
studentRouter.get("/students/names", studentController.getAllStudentNames);
studentRouter.get("/students/count/:id", studentController.countStudents);
studentRouter.put("/student/update/:id", validate(updateStudentSchema),studentController.updateStudentById
);
studentRouter.delete("/student/:id", studentController.deleteStudentById);
studentRouter.delete("/students", studentController.deleteAllStudents);

export {studentRouter};
