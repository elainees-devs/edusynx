// src/routes/exam.route.ts
import { Router } from "express";
import { ExamController } from "../controllers";
import { createExamSchema, updateExamSchema } from "../validation/exam.schema";
import { validate } from "../middlewares/validate";

const examRouter = Router();
const examController = new ExamController();

examRouter.post("/",validate(createExamSchema),examController.createExam);
examRouter.get("/", examController.getAllExams);
examRouter.get("/:id", examController.getExamById);
examRouter.put("/:id",validate(updateExamSchema),examController.updateExam);
examRouter.delete("/:id", examController.deleteExam);
examRouter.delete("/", examController.deleteAllExams);

export { examRouter };


