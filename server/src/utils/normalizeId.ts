// server/src/utils/normalizeId.ts

import { Types } from "mongoose";
import {
  IBaseUser,
  IClass,
  ISchool,
  IStream,
  ISubject,
} from "../types";
import { AppError } from "./AppError";

/**
 * Normalize various representations to a MongoDB ObjectId.
 */
export function normalizeId(
  value:
    | Types.ObjectId
    | ISchool
    | IBaseUser
    | ISubject
    | IClass
    | IStream
    | string
    | null
    | undefined
): Types.ObjectId {
  if (!value) {
    throw new AppError("ID is required", 400);
  }

  // String ObjectId
  if (typeof value === "string") {
    if (!Types.ObjectId.isValid(value)) {
      throw new AppError("Invalid ObjectId", 400);
    }

    return new Types.ObjectId(value);
  }

  // Already an ObjectId
  if (value instanceof Types.ObjectId) {
    return value;
  }

  // Populated document or interface with _id
  if ("_id" in value && value._id) {
    return normalizeId(value._id);
  }

  throw new AppError("Invalid object: missing _id", 400);
}