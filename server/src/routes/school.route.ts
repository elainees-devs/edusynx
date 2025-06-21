// src/routes/school.route.ts
import { Router } from "express";
import { validate } from "../middlewares/validate";
import {
  createSchoolSchema,
  updateSchoolSchema,
} from "../validation/school.schema";
import { SchoolController } from "../controllers";

const schoolRouter = Router();
const schoolController = new SchoolController();

schoolRouter.post(
  "/",
  validate(createSchoolSchema),
  schoolController.createSchool
);
schoolRouter.get("/:id", schoolController.getSchoolById);
schoolRouter.get("/", schoolController.getAllSchools);
schoolRouter.put(
  "/:id",
  validate(updateSchoolSchema),
  schoolController.updateSchool
);
schoolRouter.patch("/schools/:id/activate", schoolController.activateSchool);
schoolRouter.delete("/:id", schoolController.deleteSchoolById);
schoolRouter.delete("/", schoolController.deleteAllSchools);

export {schoolRouter}
