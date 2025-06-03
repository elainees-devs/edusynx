//src/repositories/class.repository.ts
import { CreateClassDTO } from "../dto/entity.dto";
import { Class } from "../models";
import { IClass } from "../types/school/school-core.types";

export class ClassRepository {
  async createClass(classData: CreateClassDTO): Promise<IClass> {
    const classInstance = new Class(classData);
    return await classInstance.save();
  }

  async getClassById(classId: string): Promise<IClass | null> {
    return await Class.findById(classId).populate("school");
  }
  async getAllClasses(): Promise<IClass[]> {
    return await Class.find().populate("school");
  }
  async updateClassById(
    classId: string,
    classData: Partial<CreateClassDTO>
  ): Promise<IClass | null> {
    return await Class.findByIdAndUpdate(classId, classData, {
      new: true,
    }).populate("school");
  }
  async deleteClassById(classId: string): Promise<IClass | null> {
    return await Class.findByIdAndDelete(classId).populate("school");
  }
  async deleteAllClasses(): Promise<void> {
    await Class.deleteMany({});
  }
  async getClassesBySchoolId(schoolId: string): Promise<IClass[]> {
    return await Class.find({ school: schoolId }).populate("school");
  }
  async getClassesByAcademicYear(academicYear: string): Promise<IClass[]> {
    return await Class.find({ academicYear }).populate("school");
  }
}
