// server/types/analytics/analytics.types.ts
import { Types } from "mongoose";
import { ISchool } from "../school/school-core.types";
import { IClass } from "../school/school-core.types";
import { IStudent } from "../people/student.types";
import { IFinancialReport } from "../finance/finance.types";
import { ISubject } from "../school/academic.types";

export interface IPerformanceSummary {
  school: Types.ObjectId | ISchool;
  classRef: Types.ObjectId | IClass;
  term: string;
  averageScore: number;
  topPerformers: Array<{
    student: Types.ObjectId | IStudent;
    average: number;
  }>;
  weakestSubjects: Array<{
    subject: Types.ObjectId | ISubject;
    averageScore: number;
  }>;
}

export interface IFinancialAnalytics {
  school: Types.ObjectId | ISchool;
  term: string;
  totalFeesExpected: number;
  totalFeesCollected: number;
  totalExpenses: number;
  collectionRate: number; // %
  expenseBreakdown: Record<string, number>; // e.g. { salaries: 40000, utilities: 10000 }
  trendData?: { month: string; revenue: number; expenses: number }[];
  referenceReports?: Types.ObjectId[] | IFinancialReport[];
}
