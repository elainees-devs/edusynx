// CBC Types for EduSynx

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
  code: string;
  title: string;
  description?: string;
  learningOutcomes?: ILearningOutcome[];
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

