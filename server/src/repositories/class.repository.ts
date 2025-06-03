//src/repositories/class.repository.ts
import { CreateClassDTO } from "../dto/entity.dto";
import { ClassModel } from "../models";
import { IClass } from "../types/school/school-core.types";

export class ClassRepository {
  async createClass(classData: CreateClassDTO): Promise<IClass> {
    const classInstance = new ClassModel(classData);
    return await classInstance.save();
  }

  async getClassById(classId: string): Promise<IClass | null> {
    return await ClassModel.findById(classId).populate("school");
  }
  async getAllClasses(): Promise<IClass[]> {
    return await ClassModel.find().populate("school");
  }
  async updateClassById(
    classId: string,
    classData: Partial<CreateClassDTO>
  ): Promise<IClass | null> {
    return await ClassModel.findByIdAndUpdate(classId, classData, {
      new: true,
    }).populate("school");
  }
  async deleteClassById(classId: string): Promise<IClass | null> {
    return await ClassModel.findByIdAndDelete(classId).populate("school");
  }
  async deleteAllClasses(): Promise<void> {
    await ClassModel.deleteMany({});
  }
  async getClassesBySchoolId(schoolId: string): Promise<IClass[]> {
    return await ClassModel.find({ school: schoolId }).populate("school");
  }
  async getClassesByAcademicYear(academicYear: string): Promise<IClass[]> {
    return await ClassModel.find({ academicYear }).populate("school");
  }
}
