// CBC Types for EduSynx

import { Types } from "mongoose";
import { BaseDocument } from "./common/base.types";

export interface IAssessment extends BaseDocument {
  title: string;
  description?: string;
  type: "formative" | "summative";
  criteria?: string[];
}

export interface ILearningOutcome extends BaseDocument {
  subStrandId: Types.ObjectId | string;
  code: string;
  description: string;
}

export interface IAssessmentTemplate {
  learningOutcomeId: string;
  title: string;
  type: "formative" | "summative";
  criteria?: string[];
}

export interface ISubStrand extends BaseDocument {
  schoolId: Types.ObjectId | string;
  strandId: Types.ObjectId | string;

  code: string;
  title: string;
  description?: string;

  order?: number;
  isActive?: boolean;
}

export interface IStrand {
  code: string;
  title: string;
  description?: string;
}

export interface ICompetency extends BaseDocument {
  code: string;
  title: string;
  description?: string;
}
