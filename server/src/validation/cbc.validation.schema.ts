// server/src/validation/cbc.validation.schema.ts
import { z } from "zod";

export const AssessmentSchema = z.object({
  _id: z.string().optional(),
  title: z.string(),
  description: z.string().optional(),
  type: z.enum(["formative", "summative"]),
  criteria: z.array(z.string()).optional(),
});

export const LearningOutcomeSchema = z.object({
  _id: z.string().optional(),
  code: z.string(),
  description: z.string(),
  assessments: z.array(AssessmentSchema).optional(),
});

export const SubStrandSchema = z.object({
  _id: z.string().optional(),
  code: z.string(),
  title: z.string(),
  description: z.string().optional(),
  learningOutcomes: z.array(LearningOutcomeSchema).optional(),
});

export const StrandSchema = z.object({
  _id: z.string().optional(),
  code: z.string(),
  title: z.string(),
  description: z.string().optional(),
  subStrands: z.array(SubStrandSchema).optional(),
});

export const CompetencySchema = z.object({
  _id: z.string().optional(),
  code: z.string(),
  title: z.string(),
  description: z.string().optional(),
  strands: z.array(StrandSchema).optional(),
});
