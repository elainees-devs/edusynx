import { Router } from "express";
import {
	createCompetencySchema,
	updateCompetencySchema,
	createStrandSchema,
	updateStrandSchema,
	createSubStrandSchema,
	updateSubStrandSchema,
	createLearningOutcomeSchema,
	updateLearningOutcomeSchema,
	createAssessmentSchema,
	updateAssessmentSchema,
} from "../validation";
import { CBCController } from "../controllers/academics/cbc.controller";
import { validate } from "../middlewares/validate";

const cbcRouter = Router();
const cbcController = new CBCController();

// --- Competency Routes ---
cbcRouter.post("/competencies", validate(createCompetencySchema), cbcController.createCompetency);
cbcRouter.get("/competencies", cbcController.getCompetencies);
cbcRouter.get("/competencies/:id", cbcController.getCompetencyById);
cbcRouter.patch("/competencies/:id", validate(updateCompetencySchema), cbcController.updateCompetency);
cbcRouter.delete("/competencies/:id", cbcController.deleteCompetency);

// --- Strand Routes ---
cbcRouter.post("/strands", validate(createStrandSchema), cbcController.createStrand);
cbcRouter.get("/strands/:id", cbcController.getStrandById);
cbcRouter.patch("/strands/:id", validate(updateStrandSchema), cbcController.updateStrand);
cbcRouter.delete("/strands/:id", cbcController.deleteStrand);

// --- SubStrand Routes ---
cbcRouter.post("/substrands", validate(createSubStrandSchema), cbcController.createSubStrand);
cbcRouter.get("/substrands/:id", cbcController.getSubStrandById);
cbcRouter.patch("/substrands/:id", validate(updateSubStrandSchema), cbcController.updateSubStrand);
cbcRouter.delete("/substrands/:id", cbcController.deleteSubStrand);

// --- Learning Outcome Routes ---
cbcRouter.post("/learning-outcomes", validate(createLearningOutcomeSchema), cbcController.createLearningOutcome);
cbcRouter.get("/learning-outcomes/:id", cbcController.getLearningOutcomeById);
cbcRouter.patch("/learning-outcomes/:id", validate(updateLearningOutcomeSchema), cbcController.updateLearningOutcome);
cbcRouter.delete("/learning-outcomes/:id", cbcController.deleteLearningOutcome);

// --- Assessment Routes ---

cbcRouter.post("/assessments", validate(createAssessmentSchema), cbcController.createAssessment);
cbcRouter.get("/assessments/:id", cbcController.getAssessmentById);
cbcRouter.patch("/assessments/:id", validate(updateAssessmentSchema), cbcController.updateAssessment);
cbcRouter.delete("/assessments/:id", cbcController.deleteAssessment);

export { cbcRouter };
