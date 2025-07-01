// server/src/routes/school.route.ts
import { Router } from "express";
import { validate } from "../middlewares/validate";
import {
  createSchoolSchema,
  updateSchoolSchema,
} from "../validation/school.schema";
import { SchoolController } from "../controllers";
import { validateObjectId } from "../middlewares/validateObjectId";

const schoolRouter = Router();
const schoolController = new SchoolController();

// Specific routes first
schoolRouter.post(
  "/register",
  validate(createSchoolSchema),
  schoolController.createSchool
);
schoolRouter.get("/", schoolController.getAllSchools);

schoolRouter.patch(":id/activate", schoolController.activateSchool);

schoolRouter.put(
  "/:id",
  validate(updateSchoolSchema),
  schoolController.updateSchool
);
schoolRouter.delete("/:id", schoolController.deleteSchoolById);
schoolRouter.delete("/", schoolController.deleteAllSchools);

// Dynamic route last
schoolRouter.get("/:id", validateObjectId("id"), schoolController.getSchoolById);

export { schoolRouter };
