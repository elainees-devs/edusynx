// server/repositories/allocation.repository.ts
import { Types } from "mongoose";
import { ISchoolAllocation } from "../types";
import { SchoolAllocationModel } from "../models/allocation.model";

export class AllocationRepository {
  createAllocation = async (allocation: Partial<ISchoolAllocation>) => {
    return await SchoolAllocationModel.create(allocation);
  };

  findBySchoolId = async (schoolId: string | Types.ObjectId) => {
    return await SchoolAllocationModel.findOne({ school: schoolId })
      .populate("classes.classTeacher")
      .populate("classes.subjects.teachers")
      .populate("classes.subjects.headOfSubject")
      .populate("headsOfSubjects");
  };

  updateBySchoolId = async (schoolId: string | Types.ObjectId, update: Partial<ISchoolAllocation>) => {
    return await SchoolAllocationModel.findOneAndUpdate(
      { school: schoolId },
      update,
      { new: true }
    );
  };

  deleteBySchoolId = async (schoolId: string | Types.ObjectId) => {
    return await SchoolAllocationModel.findOneAndDelete({ school: schoolId });
  };

  getAllAllocations = async () => {
    return await SchoolAllocationModel.find()
      .populate("classes.classTeacher")
      .populate("classes.subjects.teachers")
      .populate("classes.subjects.headOfSubject")
      .populate("headsOfSubjects");
  };
}
