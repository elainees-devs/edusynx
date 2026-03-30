import mongoose, { Schema, Document, Types } from 'mongoose';
import { IAssessment } from '../types';


const AssessmentSchema = new Schema<IAssessment>({
  title: { type: String, required: true },
  description: String,
  type: { type: String, enum: ['formative', 'summative'], required: true },
  criteria: [String],
});

export interface ILearningOutcome extends Document {
  code: string;
  description: string;
  assessments: Types.DocumentArray<IAssessment>;
}

const LearningOutcomeSchema = new Schema<ILearningOutcome>({
  code: { type: String, required: true },
  description: { type: String, required: true },
  assessments: [AssessmentSchema],
});

export interface ISubStrand extends Document {
  code: string;
  title: string;
  description?: string;
  learningOutcomes: Types.DocumentArray<ILearningOutcome>;
}

const SubStrandSchema = new Schema<ISubStrand>({
  code: { type: String, required: true },
  title: { type: String, required: true },
  description: String,
  learningOutcomes: [LearningOutcomeSchema],
});

export interface IStrand extends Document {
  code: string;
  title: string;
  description?: string;
  subStrands: Types.DocumentArray<ISubStrand>;
}

const StrandSchema = new Schema<IStrand>({
  code: { type: String, required: true },
  title: { type: String, required: true },
  description: String,
  subStrands: [SubStrandSchema],
});

export interface ICompetency extends Document {
  code: string;
  title: string;
  description?: string;
  strands: Types.DocumentArray<IStrand>;
}

const CompetencySchema = new Schema<ICompetency>({
  code: { type: String, required: true },
  title: { type: String, required: true },
  description: String,
});

export const AssessmentModel = mongoose.model<IAssessment>('Assessment', AssessmentSchema);
export const LearningOutcomeModel = mongoose.model<ILearningOutcome>('LearningOutcome', LearningOutcomeSchema);
export const SubStrandModel = mongoose.model<ISubStrand>('SubStrand', SubStrandSchema);
export const StrandModel = mongoose.model<IStrand>('Strand', StrandSchema);
export const CompetencyModel = mongoose.model<ICompetency>('Competency', CompetencySchema);
