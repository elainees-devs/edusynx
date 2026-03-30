import mongoose, { Schema, Document, Types } from "mongoose";
import {
  IAssessment,
  ICompetency,
  ILearningOutcome,
  IStrand,
  ISubStrand,
} from "../types";

const AssessmentSchema = new Schema<IAssessment>({
  title: { type: String, required: true },
  description: String,
  type: { type: String, enum: ["formative", "summative"], required: true },
  criteria: [String],
});

const LearningOutcomeSchema = new Schema<ILearningOutcome>({
  code: { type: String, required: true },
  description: { type: String, required: true },
  assessments: [AssessmentSchema],
});

const SubStrandSchema = new Schema<ISubStrand>({
  code: { type: String, required: true },
  title: { type: String, required: true },
  description: String,
  strandId: { type: Schema.Types.ObjectId, ref: "Strand", required: true },
  schoolId: { type: String, required: true },
  order: Number,
  isActive: { type: Boolean, default: true },
});

const StrandSchema = new Schema<IStrand>({
  code: { type: String, required: true },
  title: { type: String, required: true },
  description: String,
});

const CompetencySchema = new Schema<ICompetency>({
  code: { type: String, required: true },
  title: { type: String, required: true },
  description: String,
});

export const AssessmentModel = mongoose.model<IAssessment>(
  "Assessment",
  AssessmentSchema,
);
export const LearningOutcomeModel = mongoose.model<ILearningOutcome>(
  "LearningOutcome",
  LearningOutcomeSchema,
);
export const SubStrandModel = mongoose.model<ISubStrand>(
  "SubStrand",
  SubStrandSchema,
);
export const StrandModel = mongoose.model<IStrand>("Strand", StrandSchema);
export const CompetencyModel = mongoose.model<ICompetency>(
  "Competency",
  CompetencySchema,
);
