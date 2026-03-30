import mongoose, { Schema, Document, Types } from "mongoose";
import {
  IAssessment,
  ICompetency,
  ILearningOutcome,
  IStrand,
  ISubStrand,
  IAssessmentTemplate,
  IStudentAssessment,
} from "../types";

const AssessmentSchema = new Schema<IAssessment>(
  {
    title: { type: String, required: true },
    description: String,
    type: { type: String, enum: ["formative", "summative"], required: true },
    criteria: [String],
  },
  { timestamps: true },
);

const LearningOutcomeSchema = new Schema<ILearningOutcome>(
  {
    subStrandId: {
      type: Schema.Types.ObjectId,
      ref: "SubStrand",
      required: true,
    },
    code: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true },
);

const SubStrandSchema = new Schema<ISubStrand>(
  {
    code: { type: String, required: true },
    title: { type: String, required: true },
    description: String,
    strandId: { type: Schema.Types.ObjectId, ref: "Strand", required: true },
    schoolId: { type: String, required: true },
    order: Number,
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const StrandSchema = new Schema<IStrand>(
  {
    code: { type: String, required: true },
    title: { type: String, required: true },
    description: String,
  },
  { timestamps: true },
);

const CompetencySchema = new Schema<ICompetency>(
  {
    code: { type: String, required: true },
    title: { type: String, required: true },
    description: String,
  },
  { timestamps: true },
);

const AssessmentTemplateSchema = new Schema<IAssessmentTemplate>(
  {
    learningOutcomeId: { type: Schema.Types.ObjectId, ref: "LearningOutcome", required: true },
    title: { type: String, required: true },
    type: { type: String, enum: ["formative", "summative"], required: true },
    criteria: [String],
  },
  { timestamps: true },
);  

export const StudentAssessmentSchema = new Schema<IStudentAssessment>(
  {
    studentId: { type: Schema.Types.ObjectId, ref: "Student", required: true },
    subjectId: { type: Schema.Types.ObjectId, ref: "Subject", required: true },
    competencyId: { type: Schema.Types.ObjectId, ref: "Competency", required: true },
    strandId: { type: Schema.Types.ObjectId, ref: "Strand", required: true },
    subStrandId: { type: Schema.Types.ObjectId, ref: "SubStrand", required: true },
    learningOutcomeId: { type: Schema.Types.ObjectId, ref: "LearningOutcome", required: true },
    rating: { type: String, enum: ['BE', 'AE', 'ME', 'EE'], required: true },
    term: { type: String, required: true },
    year: { type: Number, required: true },
    teacherId: { type: Schema.Types.ObjectId, ref: "Teacher" },
  },
  { timestamps: true },
);
export const StudentAssessmentModel = mongoose.model<IStudentAssessment>(
  "StudentAssessment",
  StudentAssessmentSchema,
);

export const AssessmentModel = mongoose.model<IAssessment>(
  "Assessment",
  AssessmentSchema,
);
export const LearningOutcomeModel = mongoose.model<ILearningOutcome>(
  "LearningOutcome",
  LearningOutcomeSchema,
);

export const AssessmentTemplateModel = mongoose.model<IAssessmentTemplate>(
  "AssessmentTemplate",
  AssessmentTemplateSchema,
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

