// CBC Types for EduSynx

import { Types } from "mongoose";
import { BaseDocument } from "./common/base.types";

export interface IAssessment extends BaseDocument {
  title: string;
  description?: string;
  type: 'formative' | 'summative';
  criteria?: string[];
}

export interface ILearningOutcome extends BaseDocument {
  code: string;
  description: string;
  assessments?: IAssessment[];
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
  _id?: string;
  code: string;
  title: string;
  description?: string;
}

export interface ICompetency extends BaseDocument {
  code: string;
  title: string;
  description?: string;
}

