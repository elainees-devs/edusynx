// server/src/repositories/people/guardian.repository.ts
import mongoose from "mongoose";
import { GuardianModel, StudentModel } from "../../models";
import { UserRole } from "../../types";
import { generateFamilyNumber } from "../../utils";

export class GuardianRepository {
// 1. Method to generate or reuse family number and create a guardian
async generateFamilyNumberAndCreateGuardian(reqBody: any) {
  const {
    firstName,
    middleName,
    lastName,
    email,
    secondaryEmail,
    primaryPhoneNumber,
    secondaryPhoneNumber,
    nationality,
    adm,     
    school,
  } = reqBody;

  // Verify that the student exists and belongs to the same school
  const student = await StudentModel.findOne({ adm, school });
  if (!student) {
    throw new Error(
      `No student found with admission number ${adm} in this school`
    );
  }

  // Check if there is already a guardian linked to this student
  let existingGuardian = await GuardianModel.findOne({
    adm: student._id, // store student _id, not admission number
    school,
  });

  let familyNumber: string;
  if (existingGuardian) {
    // Reuse the existing family number
    familyNumber = existingGuardian.familyNumber;
  } else {
    // Generate a new family number
    familyNumber = await generateFamilyNumber(
      new mongoose.Types.ObjectId(school)
    );
  }

  // Create new guardian document
  const guardian = new GuardianModel({
    firstName,
    middleName,
    lastName,
    email,
    secondaryEmail,
    primaryPhoneNumber,
    secondaryPhoneNumber,
    nationality,
    adm: student._id,   // link to student document
    school,
    familyNumber,
    role: UserRole.GUARDIAN,
  });

  await guardian.save();

  // Populate to include student's admission number in response
  return await guardian.populate('adm', 'adm firstName lastName');
}


  // 2. Method to find all guardians
  async findAllGuardians() {
    const guardians = await GuardianModel.find().populate("school");
    return guardians;
  }
}
