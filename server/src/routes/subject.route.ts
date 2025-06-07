// src/routes/subject.route.ts
import { Router } from "express";
import { SubjectController } from "../controllers";
import { validate } from "../middlewares/validate";
import {
  createSubjectSchema,
  updateSubjectSchema,
} from "../validation/subject.schema";

const subjectRouter = Router();
const subjectController = new SubjectController();

subjectRouter.post(
  "/",
  validate(createSubjectSchema),
  subjectController.createSubject
);
subjectRouter.get("/school/:schoolId", subjectController.getSubjectsBySchool);
subjectRouter.get("/:id", subjectController.getSubjectById);
subjectRouter.put(
  "/:id",
  validate(updateSubjectSchema),
  subjectController.updateSubject
);
subjectRouter.delete("/:id", subjectController.deleteSubject);

export { subjectRouter };
