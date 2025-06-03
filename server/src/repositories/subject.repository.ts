//src/repositories/subject.repository.ts
import { ISubject } from "../types/school/school-core.types";
import { SubjectModel } from "../models/subject.model";

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