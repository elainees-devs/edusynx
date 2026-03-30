import { IAssessment, ILearningOutcome, ISubStrand, IStrand, ICompetency } from "../types/cbc.types";

export type CreateAssessmentDTO = Omit<IAssessment, "_id" | "createdAt" | "updatedAt" | "created_at" | "updated_at">;
export type CreateLearningOutcomeDTO = Omit<ILearningOutcome, "_id" | "createdAt" | "updatedAt" | "created_at" | "updated_at">;
export type CreateSubStrandDTO = Omit<ISubStrand, "_id" | "createdAt" | "updatedAt" | "created_at" | "updated_at">;
export type CreateStrandDTO = Omit<IStrand, "_id" | "createdAt" | "updatedAt" | "created_at" | "updated_at">;
export type CreateCompetencyDTO = Omit<ICompetency, "_id" | "createdAt" | "updatedAt" | "created_at" | "updated_at">;
export type CreateAssessmentTemplateDTO = Omit<IAssessment, "_id" | "createdAt" | "updatedAt" | "created_at" | "updated_at">;


