//server/src/repositories/class.repository.t
import { CreateClassDTO } from "../../dto";
import { ClassModel } from "../../models";
import { IClass } from "../../types";

export class ClassRepository {
  async createClass(classData: CreateClassDTO): Promise<IClass> {
    const classInstance = new ClassModel(classData);
    return await classInstance.save();
  }

  async getClassById(classId: string): Promise<IClass | null> {
    return await ClassModel.findById(classId).populate("school");
  }

  /**
   * Get all classes with optional pagination
   * @param options { skip?: number; limit?: number }
   */
  async getAllClasses(options?: { skip?: number; limit?: number }): Promise<IClass[]> {
    const { skip = 0, limit = 10 } = options || {};
    return await ClassModel.find()
      .populate("school")
      .populate("stream", "streamName")
      .skip(skip)
      .limit(limit);
  }

  /**
   * Count total number of classes (optionally by filter)
   */
  async countClasses(filter: Record<string, any> = {}): Promise<number> {
    return await ClassModel.countDocuments(filter);
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

  /**
   * Get classes by filter with optional pagination
   * @param filter Mongoose query filter
   * @param options Pagination options
   */
  async getClassesByFilter(
    filter: Record<string, any>,
    options?: { skip?: number; limit?: number }
  ): Promise<IClass[]> {
    const { skip = 0, limit = 10 } = options || {};
    return await ClassModel.find(filter)
      .populate("school")
      .populate("stream", "streamName")
      .skip(skip)
      .limit(limit);
  }

  async getClassesByAcademicYear(academicYear: string): Promise<IClass[]> {
    return await ClassModel.find({ academicYear }).populate("school");
  }
}
