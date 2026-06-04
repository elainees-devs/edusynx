// server/src/repositories/people/guardian.repository.ts
import mongoose, { FilterQuery } from "mongoose";
import { GuardianModel, StudentModel } from "../../models";
import { IGuardian, UserRole } from "../../types";
import { generateFamilyNumber } from "../../utils";
import { PaginationOptions } from "../../shared/pagination";

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
    const studentDoc = await StudentModel.findOne({ adm, school });
    if (!studentDoc) {
      throw new Error(
        `No student found with admission number ${adm} in this school`,
      );
    }

    // Check if there is already a guardian linked to this student
    let existingGuardian = await GuardianModel.findOne({
      student: studentDoc._id, // 'student' field is ObjectId ref
      school,
    });

    // Determine family number
    let familyNumber: string;
    if (existingGuardian) {
      // Reuse the existing family number
      familyNumber = existingGuardian.familyNumber!;
    } else {
      // Generate a new family number
      familyNumber = await generateFamilyNumber(
        new mongoose.Types.ObjectId(school),
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
      student: studentDoc._id, // link to student document
      school,
      familyNumber,
      role: UserRole.GUARDIAN,
    });

    await guardian.save();

    // 5️Populate to include student's admission number and name
    await guardian.populate({
      path: "student", // populate the 'student' field
      select: "adm studentFirstName studentLastName",
    });

    return guardian;
  }

  // 2. Method to find all guardians
  async findAllGuardians() {
    const guardians = await GuardianModel.find().populate("school");
    return guardians;
  }

  async updateGuardianById(id: string, data: Partial<IGuardian>) {
    return GuardianModel.findByIdAndUpdate(id, data, { new: true }).populate({
      path: "student",
      select: "adm",
    });
  }

  // ===============================
  // SEARCH GUARDIANS
  // ===============================
  async searchGuardians(
    filters: Record<string, any>,
    options: PaginationOptions
  ) {
    const query: FilterQuery<IGuardian> = {};

    if (filters.search) {
      query.$text = { $search: filters.search };
    }
    if (filters.schoolId) query.school = filters.schoolId;

    const { skip = 0, limit = 10 } = options;

    const [guardians, total] = await Promise.all([
      GuardianModel.find(query)
        .populate("school")
        .skip(skip)
        .limit(limit)
        .sort(
          filters.search
            ? { score: { $meta: "textScore" } }
            : { lastName: 1 }
        ),
      GuardianModel.countDocuments(query),
    ]);

    return { data: guardians, total };
  }
}
