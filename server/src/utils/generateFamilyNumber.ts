// server/src/utils/generateFamilyNumber.ts
import mongoose from "mongoose";
import { GuardianModel } from "../models";

export async function generateFamilyNumber(
  schoolId: mongoose.Types.ObjectId
) {
  const guardians = await GuardianModel.find(
    { school: schoolId, familyNumber: { $regex: /^G\d+$/ } },
    { familyNumber: 1 }
  ).lean();

  // Extract numeric part of each familyNumber and convert to number
  const numbers = guardians
    .map(g => parseInt(g.familyNumber?.substring(1) || "0", 10))
    .filter(num => !isNaN(num));

  const nextNumber = numbers.length > 0
    ? Math.max(...numbers) + 1
    : 1; // start from 1 if none exist

  // Return in format G001, G002, ...
  return `G${String(nextNumber).padStart(3, "0")}`;
}
