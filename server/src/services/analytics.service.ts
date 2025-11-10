// server/src/services/analytics.service.ts

import { Types } from "mongoose";
import { IPerformanceSummary } from "../types/analytics/analytics.types";
import { normalizeId } from "../utils";
// import ExamResultModel from "../models/ExamResult"; // Uncomment when you have the model

export const computePerformanceSummary = async (
  school: string | Types.ObjectId | any, // accepts ISchool too
  classRef: string | Types.ObjectId | any,
  term: string
): Promise<IPerformanceSummary> => {
  const schoolId = normalizeId(school);
  const classId = normalizeId(classRef);

  // In the future, fetch and compute using Mongoose aggregation
  // const results = await ExamResultModel.aggregate([
  //   { $match: { school: schoolObjectId, classRef: classObjectId, term } },
  //   {
  //     $group: {
  //       _id: "$student",
  //       average: { $avg: "$marks" },
  //     },
  //   },
  // ]);

  // Placeholder logic for now
  const averageScore = 75.3;
  const topPerformers: IPerformanceSummary["topPerformers"] = [];
  const weakestSubjects: IPerformanceSummary["weakestSubjects"] = [];

  return {
    school: schoolId,
    classRef: classId,
    term,
    averageScore,
    topPerformers,
    weakestSubjects,
  };
};

