
// server/src/utils/normalizeSchoolId.ts
import { Types } from "mongoose";
import { ISchool } from "../types"; 
import { AppError } from "./AppError"; 

/**
 * Normalize various school representations to a Types.ObjectId.
 * 
 * @param school - string id, ObjectId, or ISchool object
 * @returns Types.ObjectId
 * @throws AppError if invalid
 */
export function normalizeSchoolId(
  school: Types.ObjectId | ISchool | string
): Types.ObjectId {
  if (typeof school === "string") {
    return new Types.ObjectId(school);
  }
  if (school instanceof Types.ObjectId) {
    return school;
  }
  if (school && school._id) {
    return school._id;
  }
  throw new AppError("Invalid school object: missing _id", 400);
}
