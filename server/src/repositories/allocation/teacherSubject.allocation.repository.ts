import { Types } from "mongoose";
import { TeacherSubjectAllocation } from "../../types";
import { SchoolAllocationModel } from "../../models/allocation.model";

export class TeacherSubjectAllocationRepository {
	// Add a new teacher-subject allocation to a school
	async addAllocation(schoolId: string | Types.ObjectId, allocation: TeacherSubjectAllocation) {
		return await SchoolAllocationModel.findOneAndUpdate(
			{ school: schoolId },
			{ $push: { teacherSubjectAllocations: allocation } },
			{ new: true }
		);
	}

	// Get all teacher-subject allocations for a school
	async getAllocationsBySchool(schoolId: string | Types.ObjectId) {
		const school = await SchoolAllocationModel.findOne({ school: schoolId });
		return school ? school.teacherSubjectAllocations : [];
	}

	// Update a specific teacher-subject allocation by index
	async updateAllocationByIndex(schoolId: string | Types.ObjectId, index: number, update: Partial<TeacherSubjectAllocation>) {
		const school = await SchoolAllocationModel.findOne({ school: schoolId });
		if (!school || !school.teacherSubjectAllocations || !school.teacherSubjectAllocations[index]) return null;
		Object.assign(school.teacherSubjectAllocations[index], update);
		await school.save();
		return school.teacherSubjectAllocations[index];
	}

	// Remove a teacher-subject allocation by index
	async removeAllocationByIndex(schoolId: string | Types.ObjectId, index: number) {
		const school = await SchoolAllocationModel.findOne({ school: schoolId });
		if (!school || !school.teacherSubjectAllocations || !school.teacherSubjectAllocations[index]) return null;
		const removed = school.teacherSubjectAllocations.splice(index, 1);
		await school.save();
		return removed[0];
	}
}
