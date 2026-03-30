// server/src/validation/cbc.validation.schema.ts
import { z } from "zod";
import { objectId } from "./util";

export const createAssessmentSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  type: z.enum(["formative", "summative"]),
  criteria: z.array(z.string()).optional(),
});

export const updateAssessmentSchema = createAssessmentSchema.partial();

export const createLearningOutcomeSchema = z.object({
  code: z.string().min(1),
  description: z.string().min(1),
  assessments: z.array(createAssessmentSchema).optional(),
});

export const updateLearningOutcomeSchema = createLearningOutcomeSchema.partial();

export const createSubStrandSchema = z.object({
  code: z.string().min(1),
  title: z.string().min(1),
  description: z.string().optional(),
  learningOutcomes: z.array(createLearningOutcomeSchema).optional(),
});

export const updateSubStrandSchema = createSubStrandSchema.partial();

export const createStrandSchema = z.object({
  code: z.string().min(1),
  title: z.string().min(1),
  description: z.string().optional(),
  subStrands: z.array(createSubStrandSchema).optional(),
});

export const updateStrandSchema = createStrandSchema.partial();

export const createCompetencySchema = z.object({
  code: z.string().min(1),
  title: z.string().min(1),
  description: z.string().optional(),
});

export const updateCompetencySchema = createCompetencySchema.partial();

export const createAssessmentTemplateSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  type: z.enum(["formative", "summative"]),
  criteria: z.array(z.string()).optional(),
});
export const updateAssessmentTemplateSchema = createAssessmentTemplateSchema.partial();

export const createStudentAssessmentSchema = z.object({
  studentId: objectId,
  assessmentTemplateId: objectId,
  dateTaken: z.date(),
  score: z.number().min(0).max(100),
  feedback: z.string().optional(),
});
export const updateStudentAssessmentSchema = createStudentAssessmentSchema.partial(); 

