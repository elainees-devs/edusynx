// client/src/types/school/CBCTypes.ts

import type { BaseDocument } from "../common/BaseTypes";

/* =========================
   CORE ENTITIES
========================= */

export interface ICompetency extends BaseDocument {
  _id: string;
  code: string;
  title: string;
  description?: string;
}

export interface IStrand extends BaseDocument {
  _id: string;
  code: string;
  title: string;
  description?: string;
}

export interface ISubStrand extends BaseDocument {
  _id: string;

  school:
    | string
    | {
        _id: string;
        name: string;
      };

  strand:
    | string
    | {
        _id: string;
        title: string;
      };

  code: string;
  title: string;
  description?: string;

  order?: number;
  isActive?: boolean;
}

/* =========================
   LEARNING STRUCTURE
========================= */

export interface ILearningOutcome extends BaseDocument {
  _id: string;

  subStrand:
    | string
    | {
        _id: string;
        title: string;
      };

  code: string;
  description: string;
}

/* =========================
   ASSESSMENTS
========================= */

export type AssessmentType = "formative" | "summative";

export interface IAssessment extends BaseDocument {
  _id: string;

  title: string;
  description?: string;
  type: AssessmentType;

  criteria?: string[];
}

export interface IAssessmentTemplate {
  _id?: string;

  learningOutcome:
    | string
    | {
        _id: string;
        description: string;
      };

  title: string;
  type: AssessmentType;

  criteria?: string[];
}

/* =========================
   STUDENT ASSESSMENT (VERY IMPORTANT)
========================= */

export type CompetencyRating = "BE" | "AE" | "ME" | "EE";

export interface IStudentAssessment extends BaseDocument {
  _id: string;

  student:
    | string
    | {
        _id: string;
        firstName: string;
        lastName: string;
      };

  subject:
    | string
    | {
        _id: string;
        subjectName: string;
      };

  competency:
    | string
    | {
        _id: string;
        title: string;
      };

  strand:
    | string
    | {
        _id: string;
        title: string;
      };

  subStrand:
    | string
    | {
        _id: string;
        title: string;
      };

  learningOutcome:
    | string
    | {
        _id: string;
        description: string;
      };

  rating: CompetencyRating;

  term: string;
  year: number;

  teacher?:
    | string
    | {
        _id: string;
        firstName: string;
        lastName: string;
      };
}