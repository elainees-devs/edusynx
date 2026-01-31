// server/src/repositories/class.repository.ts
import { CreateClassDTO } from "../../dto";
import { ClassModel } from "../../models";
import { PaginationOptions } from "../../shared/pagination";
import { IClass } from "../../types";
import { AppError } from "../../utils";

type ClassFilter = Partial<
  Pick<IClass, "academicYear" | "school" | "clasName">
>;

export class ClassRepository {
  /**
   * Helper to create a base query with school populated
   */
  private baseQuery(filter: ClassFilter = {}) {
    return ClassModel.find(filter).populate("school");
  }

  /**
   * Create a new class
   */
  async createClass(classData: CreateClassDTO): Promise<IClass> {
    try {
      const classInstance = new ClassModel(classData);
      return await classInstance.save();
    } catch (error) {
      throw new AppError(`Failed to create class: ${error}`, 500);
    }
  }

  /**
   * Get class by ID
   */
  async getClassById(classId: string): Promise<IClass | null> {
    try {
      return await ClassModel.findById(classId).populate("school");
    } catch (error) {
      throw new AppError(
        `Failed to get class with id ${classId}: ${error}`,
        500,
      );
    }
  }

  /**
   * Get classes with optional filter and pagination
   */
  async getClasses(
    filter: ClassFilter = {},
    options?: PaginationOptions,
  ): Promise<IClass[]> {
    const { skip = 0, limit = 10 } = options || {};
    let query = this.baseQuery(filter).skip(skip);
    if (limit > 0) query = query.limit(limit);
    return await query;
  }

  /**
   * Get all classes without pagination
   */
  async getAllClasses(): Promise<IClass[]> {
    return await this.baseQuery();
  }

  /**
   * Count total number of classes (optionally by filter)
   */
  async countClasses(filter: ClassFilter = {}): Promise<number> {
    return await ClassModel.countDocuments(filter);
  }

  /**
   * Update class by ID
   */
  async updateClassById(
    classId: string,
    classData: Partial<CreateClassDTO>,
  ): Promise<IClass | null> {
    try {
      return await ClassModel.findByIdAndUpdate(classId, classData, {
        new: true,
      }).populate("school");
    } catch (error) {
      throw new AppError(`Failed to update class ${classId}: ${error}`, 500);
    }
  }

  /**
   * Delete class by ID
   */
  async deleteClassById(classId: string): Promise<IClass | null> {
    try {
      return await ClassModel.findByIdAndDelete(classId).populate("school");
    } catch (error) {
      throw new AppError(`Failed to delete class ${classId}: ${error}`, 500);
    }
  }

  /**
   * Delete all classes
   */
  async deleteAllClasses(): Promise<{ deletedCount?: number }> {
    return await ClassModel.deleteMany({});
  }

  /**
   * Get classes by academic year
   */
  async getClassesByAcademicYear(academicYear: string): Promise<IClass[]> {
    return await this.baseQuery({ academicYear });
  }
}
