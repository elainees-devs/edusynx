//src/routes/class.route.ts
import { Router} from "express";
import { createClassSchema, updateClassSchema } from "../validation/class.schema";
import { ClassController } from "../controllers";
import { validate } from "../middlewares/validate";

const classRouter = Router();
const classController = new ClassController();

classRouter.post("/", validate(createClassSchema), classController.createClass)
classRouter.get("/:id", classController.getClassById)
classRouter.get("/", classController.getAllClasses)
classRouter.put("/:id", validate(updateClassSchema), classController.updateClass)
classRouter.delete(":/id", classController.deleteClass)
classRouter.delete("/", classController.deleteAllClasses)

