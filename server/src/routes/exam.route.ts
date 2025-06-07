// src/routes/exam.route.ts
// src/routes/exam.route.ts
import { Router } from "express";
import { ExamController } from "../controllers";

const examRouter = Router();
const examController = new ExamController();

examRouter.post("/", examController.createExam);
examRouter.get("/", examController.getAllExams);
examRouter.get("/:id", examController.getExamById);
examRouter.put("/:id", examController.updateExam);
examRouter.delete("/:id", examController.deleteExam);
examRouter.delete("/", examController.deleteAllExams);

export { examRouter };


