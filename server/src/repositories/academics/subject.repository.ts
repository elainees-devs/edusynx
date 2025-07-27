// server/src/repositories/academics/subject.repository.ts

import { SubjectModel } from "../../models";
import { ISubject } from "../../types";

export class SubjectRepository {
  async createSubject(subjectData: ISubject): Promise<ISubject> {
    const subject = new SubjectModel(subjectData);
    return await subject.save();
  }

  async getSubjectsBySchool(schoolId: string): Promise<ISubject[]> {
    return await SubjectModel.find({ school: schoolId }).populate('classRef');
  }

  async getSubjectById(subjectId: string): Promise<ISubject | null> {
    return await SubjectModel.findById(subjectId).populate('classRef');
  }

  async updateSubject(subjectId: string, updateData: Partial<ISubject>): Promise<ISubject | null> {
    return await SubjectModel.findByIdAndUpdate(subjectId, updateData, { new: true });
  }

  async deleteSubject(subjectId: string): Promise<ISubject | null> {
    return await SubjectModel.findByIdAndDelete(subjectId);
  }
}   