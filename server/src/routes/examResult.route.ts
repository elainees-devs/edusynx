// server/src/routes/examResult.route.ts
import { Router } from "express";
import { ExamResultController } from "../controllers/academics/examResult.controller";
import { authenticateUser } from "../middlewares/auth";
import { validate } from "../middlewares/validate";
import { createExamResultSchema  } from "../validation/examResult.schema";

const examResultRouter = Router();
const resultController = new ExamResultController();

// Use authentication for all result routes
examResultRouter.use(authenticateUser());

// exam result entry
examResultRouter.post("/exam-results", validate(createExamResultSchema), resultController.enterBulkResults);

// Get results for an exam
examResultRouter.get("/exam/:examId", resultController.getResultsByExam);

// Approve results
examResultRouter.patch("/exam/:examId/approve", resultController.approveResults);

// Get results for a student
examResultRouter.get("/student/:studentId", resultController.getStudentResults);

export { examResultRouter };
