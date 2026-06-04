// server/src/routes/examResult.route.ts
import { Router } from "express";
import { ExamResultController } from "../controllers/academics/examResult.controller";
import { authenticateUser } from "../middlewares/auth";
import { validate } from "../middlewares/validate";
import { bulkExamResultSchema } from "../validation/examResult.schema";

const examResulAtRouter = Router();
const resultController = new ExamResultController();

// Use authentication for all result routes
examResultRouter.use(authenticateUser());

// Bulk entry
examResultRouter.post("/bulk", validate(bulkExamResultSchema), resultController.enterBulkResults);

// Get results for an exam
examResultRouter.get("/exam/:examId", resultController.getResultsByExam);

// Approve results
examResultRouter.patch("/exam/:examId/approve", resultController.approveResults);

// Get results for a student
examResultRouter.get("/student/:studentId", resultController.getStudentResults);

export { examResultRouter };
