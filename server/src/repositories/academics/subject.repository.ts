// server/src/repositories/academics/subject.repository.ts

import { Types } from "mongoose";
import { SubjectModel } from "../../models";
import { ISubject } from "../../types";
import { AppError, normalizeId } from "../../utils";
import { PaginationOptions } from "../../shared/pagination";

type SubjectFilter = Partial<
  Pick<ISubject, "school" | "classRef" | "subjectName">
>;

export class SubjectRepository {
  /**
   * Base query helper with class populated
   */
  private baseQuery(filter: SubjectFilter = {}) {
    return SubjectModel.find(filter).populate("classRef", "name");
  }

  /**
   * Create subject
   */
  async createSubject(subjectData: ISubject): Promise<ISubject> {
    try {
      const processedData = {
        ...subjectData,
        school: normalizeId(subjectData.school),
        classRef:
          typeof subjectData.classRef === "string"
            ? new Types.ObjectId(subjectData.classRef)
            : subjectData.classRef._id,
      };

      const subject = new SubjectModel(processedData);
      return await subject.save();
    } catch (error) {
      throw new AppError(
        `Failed to create subject: ${(error as Error).message}`,
        500,
      );
    }
  }

  /**
   * Get subject by ID
   */
  async getSubjectById(subjectId: string): Promise<ISubject | null> {
    try {
      return await SubjectModel.findById(new Types.ObjectId(subjectId))
        .populate("classRef", "name")
        .exec();
    } catch (error) {
      throw new AppError(
        `Failed to get subject ${subjectId}: ${(error as Error).message}`,
        500,
      );
    }
  }

  /**
   * Get subjects with optional filter + pagination
   */
  async getSubjects(
    filter: SubjectFilter = {},
    options?: PaginationOptions,
  ): Promise<ISubject[]> {
    const { skip = 0, limit = 10 } = options || {};
    try {
      let query = this.baseQuery(filter).skip(skip);
      if (limit > 0) query = query.limit(limit);
      return await query.exec();
    } catch (error) {
      throw new AppError(
        `Failed to fetch subjects: ${(error as Error).message}`,
        500,
      );
    }
  }

  /**
   * Get all subjects (no pagination)
   */
  async getAllSubjects(): Promise<ISubject[]> {
    try {
      return await this.baseQuery().exec();
    } catch (error) {
      throw new AppError(
        `Failed to fetch all subjects: ${(error as Error).message}`,
        500,
      );
    }
  }

  /**
   * Get subjects by school
   */
  async getSubjectsBySchool(schoolId: string): Promise<ISubject[]> {
    try {
      return await this.baseQuery({
        school: normalizeId(schoolId),
      }).exec();
    } catch (error) {
      throw new AppError(
        `Failed to fetch subjects for school ${schoolId}: ${
          (error as Error).message
        }`,
        500,
      );
    }
  }

  /**
   * Get subjects by class
   */
  async getSubjectsByClass(classId: string): Promise<ISubject[]> {
    try {
      return await this.baseQuery({
        classRef: normalizeId(classId),
      }).exec();
    } catch (error) {
      throw new AppError(
        `Failed to fetch subjects for class ${classId}: ${
          (error as Error).message
        }`,
        500,
      );
    }
  }

  /**
   * Count subjects (optional filter)
   */
  async countSubjects(filter: SubjectFilter = {}): Promise<number> {
    try {
      return await SubjectModel.countDocuments(filter).exec();
    } catch (error) {
      throw new AppError(
        `Failed to count subjects: ${(error as Error).message}`,
        500,
      );
    }
  }

  /**
   * Update subject by ID
   */
  async updateSubject(
  subjectId: string,
  updates: Partial<ISubject>,
): Promise<ISubject | null> {
  try {
    if (updates.school) {
      updates.school = normalizeId(updates.school) as any;
    }

    if (updates.classRef) {
      updates.classRef = normalizeId(updates.classRef) as any;
    }

    return await SubjectModel.findByIdAndUpdate(
      new Types.ObjectId(subjectId),
      updates,
      { new: true }
    )
      .populate("classRef", "name")
      .exec();
  } catch (error) {
    throw new AppError(
      `Failed to update subject ${subjectId}: ${(error as Error).message}`,
      500
    );
  }
}


  
  /**
   * Delete subject by ID
   */
  async deleteSubject(subjectId: string): Promise<ISubject | null> {
    try {
      return await SubjectModel.findByIdAndDelete(new Types.ObjectId(subjectId))
        .populate("classRef", "name")
        .exec();
    } catch (error) {
      throw new AppError(
        `Failed to delete subject ${subjectId}: ${(error as Error).message}`,
        500,
      );
    }
  }

  /**
   * Delete all subjects
   */
  async deleteAllSubjects(): Promise<{ deletedCount?: number }> {
    try {
      return await SubjectModel.deleteMany({}).exec();
    } catch (error) {
      throw new AppError(
        `Failed to delete all subjects: ${(error as Error).message}`,
        500,
      );
    }
  }
}
