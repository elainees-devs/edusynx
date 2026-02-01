
// server/src/utils/normalizeId.ts
import { Types } from "mongoose";
import { IBaseUser, IClass, ISchool, IStream, ISubject } from "../types"; 
import { AppError } from "./AppError"; 

/**
 * Normalize various school representations to a Types.ObjectId.
 * 
 * @param school - string id, ObjectId, or ISchool object
 * @returns Types.ObjectId
 * @throws AppError if invalid
 */
export function normalizeId(
  school: Types.ObjectId | ISchool |IBaseUser|ISubject| IClass|IStream|string
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
