// server/src/repositories/academics/teacher-subject.ts
import { Types } from "mongoose";
import { TeacherSubjectModel } from "../../models";
import { ITeacherSubject } from "../../types";
import { AppError, normalizeId } from "../../utils";
import { PaginationOptions } from "../../shared/pagination";

type TeacherSubjectFilter = Partial<
  Pick<ITeacherSubject, "school" | "teacherId" | "subjectId" | "classId" | "streamId">
>;

export class TeacherSubjectRepository {
  /**
   * Base query with populations
   */
  private baseQuery(filter: TeacherSubjectFilter = {}) {
    return TeacherSubjectModel.find(filter)
      .populate("teacherId", "firstName lastName")
      .populate("subjectId", "subjectName")
      .populate("classId", "clasName")
      .populate("streamId", "streamName")
      .populate("school", "name");
  }

  /**
 * 1. Assign multiple subjects, classes, streams to a teacher
 */
async assignSubjectToTeacher(
  data: ITeacherSubject
): Promise<ITeacherSubject> {
  try {
    // Normalize IDs, support arrays
    const processed = {
      ...data,
      school: normalizeId(data.school),
      teacherId: normalizeId(data.teacherId),
      subjectId: Array.isArray(data.subjectId)
        ? data.subjectId.map((s) => normalizeId(s))
        : [normalizeId(data.subjectId)],
      classId: Array.isArray(data.classId)
        ? data.classId.map((c) => normalizeId(c))
        : [normalizeId(data.classId)],
      streamId: data.streamId
        ? Array.isArray(data.streamId)
          ? data.streamId.map((s) => normalizeId(s))
          : [normalizeId(data.streamId)]
        : [],
    };

    // Check if teacher already has an assignment in this school
    const existing = await TeacherSubjectModel.findOne({
      teacherId: processed.teacherId,
      school: processed.school,
    });

    if (existing) {
      // Update existing assignment by merging arrays
      const existingSubjects = Array.isArray(existing.subjectId) ? existing.subjectId : [existing.subjectId];
      const existingClasses = Array.isArray(existing.classId) ? existing.classId : [existing.classId];
      const existingStreams = Array.isArray(existing.streamId) ? existing.streamId : [existing.streamId];
      
      existing.subjectId = Array.from(new Set([...existingSubjects, ...processed.subjectId])) as any;
      existing.classId = Array.from(new Set([...existingClasses, ...processed.classId])) as any;
      existing.streamId = Array.from(new Set([...existingStreams, ...processed.streamId])) as any;
      return await existing.save();
    }

    // Create new assignment
    const created = new TeacherSubjectModel(processed);
    return await created.save();
  } catch (error) {
    throw new AppError(
      `Failed to assign subjects/classes/streams to teacher: ${(error as Error).message}`,
      500
    );
  }
}


  /**
   * 2. Get all assignments for a teacher
   */
  async getSubjectsByTeacher(teacherId: string): Promise<ITeacherSubject[]> {
    try {
      return await this.baseQuery({
        teacherId: normalizeId(teacherId),
      }).exec();
    } catch (error) {
      throw new AppError(
        `Failed to fetch subjects for teacher ${teacherId}: ${(error as Error).message}`,
        500
      );
    }
  }

  /**
   * 3. Get all teacher-subject assignments (optional filter + pagination)
   */
  async getTeacherSubjects(
    filter: TeacherSubjectFilter = {},
    options?: PaginationOptions
  ): Promise<ITeacherSubject[]> {
    try {
      const { skip = 0, limit = 10 } = options || {};
      let query = this.baseQuery(filter).skip(skip);
      if (limit > 0) query = query.limit(limit);
      return await query.exec();
    } catch (error) {
      throw new AppError(
        `Failed to fetch teacher-subject assignments: ${(error as Error).message}`,
        500
      );
    }
  }

  /**
   * 4. Get assignment by ID
   */
  async getTeacherSubjectById(id: string): Promise<ITeacherSubject | null> {
    try {
      return await TeacherSubjectModel.findById(new Types.ObjectId(id))
        .populate("teacherId", "firstName lastName")
        .populate("subjectId", "subjectName")
        .populate("classId", "clasName")
        .populate("streamId", "streamName")
        .populate("school", "name")
        .exec();
    } catch (error) {
      throw new AppError(
        `Failed to fetch teacher-subject ${id}: ${(error as Error).message}`,
        500
      );
    }
  }

  /**
   * 5. Update teacher-subject assignment
   */
  async updateTeacherSubject(
    id: string,
    updates: Partial<ITeacherSubject>
  ): Promise<ITeacherSubject | null> {
    try {
      if (updates.school) updates.school = normalizeId(updates.school) as any;
      if (updates.teacherId) updates.teacherId = normalizeId(updates.teacherId) as any;
      if (updates.subjectId) updates.subjectId = Array.isArray(updates.subjectId) ? updates.subjectId.map(normalizeId) : normalizeId(updates.subjectId) as any;
      if (updates.classId) updates.classId = Array.isArray(updates.classId) ? updates.classId.map(normalizeId) : normalizeId(updates.classId) as any;
      if (updates.streamId) updates.streamId = Array.isArray(updates.streamId) ? updates.streamId.map(normalizeId) : normalizeId(updates.streamId) as any;

      return await TeacherSubjectModel.findByIdAndUpdate(
        new Types.ObjectId(id),
        updates,
        { new: true }
      )
        .populate("teacherId", "firstName lastName")
        .populate("subjectId", "subjectName")
        .populate("classId", "clasName")
        .populate("streamId", "streamName")
        .populate("school", "name")
        .exec();
    } catch (error) {
      throw new AppError(
        `Failed to update teacher-subject ${id}: ${(error as Error).message}`,
        500
      );
    }
  }

  /**
   * 6. Remove a specific subject from a teacher
   */
  async removeSubjectFromTeacher(
    teacherId: string,
    subjectId: string
  ): Promise<boolean> {
    try {
      const result = await TeacherSubjectModel.updateOne(
        { teacherId: normalizeId(teacherId) },
        { $pull: { subjectIds: normalizeId(subjectId) } }
      );
      return result.modifiedCount > 0;
    } catch (error) {
      throw new AppError(
        `Failed to remove subject assignment: ${(error as Error).message}`,
        500
      );
    }
  }

  /**
   * 7. Count total subjects per teacher
   */
  async countSubjectsPerTeacher(): Promise<
    { teacherId: string; totalSubjects: number }[]
  > {
    try {
      return await TeacherSubjectModel.aggregate([
        { $project: { teacherId: 1, totalSubjects: { $size: "$subjectId" } } }
      ]);
    } catch (error) {
      throw new AppError(
        `Failed to count subjects per teacher: ${(error as Error).message}`,
        500
      );
    }
  }

  /**
   * 8. Get teachers teaching a specific subject
   */
  async getTeachersBySubject(subjectId: string): Promise<ITeacherSubject[]> {
    try {
      return await this.baseQuery({
        subjectId: normalizeId(subjectId),
      }).exec();
    } catch (error) {
      throw new AppError(
        `Failed to fetch teachers for subject ${subjectId}: ${(error as Error).message}`,
        500
      );
    }
  }

  /**
   * 9. Get teachers + subjects for a school
   */
  async getTeachersAndSubjectsBySchool(schoolId: string): Promise<ITeacherSubject[]> {
    try {
      return await this.baseQuery({
        school: normalizeId(schoolId),
      }).exec();
    } catch (error) {
      throw new AppError(
        `Failed to fetch teacher–subject list for school ${schoolId}: ${(error as Error).message}`,
        500
      );
    }
  }

  /**
   * 10. Delete teacher-subject assignment by ID
   */
  async deleteTeacherSubject(id: string): Promise<ITeacherSubject | null> {
    try {
      return await TeacherSubjectModel.findByIdAndDelete(new Types.ObjectId(id))
        .populate("teacherId", "firstName lastName")
        .populate("subjectId", "subjectName")
        .populate("classId", "clasName")
        .populate("streamId", "streamName")
        .populate("school", "name")
        .exec();
    } catch (error) {
      throw new AppError(
        `Failed to delete teacher-subject ${id}: ${(error as Error).message}`,
        500
      );
    }
  }
}
