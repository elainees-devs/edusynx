// server/src/utils/resolveClassId.ts
import { ClassModel } from "../models";
import mongoose from "mongoose";

export async function resolveClassId(
  grade: string | number,
  stream: string,
  schoolId: string
) {
  const classDoc = await ClassModel.findOne({
    grade: String(grade),
    stream: stream.toLowerCase().trim(),
    school: new mongoose.Types.ObjectId(schoolId),
  });

  if (!classDoc) {
    throw new Error(`Class not found for Grade ${grade} ${stream}`);
  }

  return classDoc._id;
}
