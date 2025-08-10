// server/src/utils/generateAdmissionNumber.ts
import mongoose from "mongoose";
import { StudentModel } from "../models";

export async function generateAdmissionNumber(
  schoolId: mongoose.Types.ObjectId
) {
  const students = await StudentModel.find(
    { school: schoolId },
    { adm: 1 }
  ).lean();

  const admissionNumbers = students
    .map(student => student.adm)
    .filter((adm): adm is number => adm != null);

  return admissionNumbers.length > 0
    ? Math.max(...admissionNumbers) + 1
    : 500;
}
