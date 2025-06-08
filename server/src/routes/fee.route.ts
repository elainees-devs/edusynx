// src/routes/fee.route.ts
import { Router } from "express";
import { FeeController } from "../controllers/fee.controller";
import { createFeeSchema, updateFeeSchema } from "../validation/fee.schema";
import { validate } from "../middlewares/validate";

const feeRouter = Router();
const feeController = new FeeController();

feeRouter.post("/",validate(createFeeSchema),feeController.createFee);
feeRouter.get("/school/:schoolId", feeController.getFeesBySchool);
feeRouter.get("/:id", feeController.getFeeById);
feeRouter.put("/:id",validate(updateFeeSchema), feeController.updateFee);
feeRouter.delete("/:id", feeController.deleteFee);

export {feeRouter};
