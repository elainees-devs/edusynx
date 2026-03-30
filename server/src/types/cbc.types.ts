// CBC Types for EduSynx

import { Types } from "mongoose";

export interface IAssessment {
  _id?: string;
  title: string;
  description?: string;
  type: 'formative' | 'summative';
  criteria?: string[];
}

export interface ILearningOutcome {
  _id?: string;
  code: string;
  description: string;
  assessments?: IAssessment[];
}

export interface ISubStrand {
  _id?: string;
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

export interface ICompetency {
  _id?: string;
  code: string;
  title: string;
  description?: string;
}

