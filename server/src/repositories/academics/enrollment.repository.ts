import { Types } from "mongoose";
import { EnrollmentModel } from "../../models";
import { IEnrollment } from "../../types";
import { AppError } from "../../utils";
import { CreateEnrollmentDTO } from "../../dto";
import { PaginationOptions } from "../../shared/pagination";

type EnrollmentFilter = Partial<
  Pick<IEnrollment, "school" | "student" | "clas" | "stream" | "academicYear" | "status" | "enrollmentType">
>;

export class EnrollmentRepository {
  private baseQuery(filter: EnrollmentFilter = {}) {
    return EnrollmentModel.find(filter)
      .populate("student", "studentFirstName studentLastName adm")
      .populate("clas", "clasName")
      .populate("stream", "streamName")
      .populate("academicYear", "name");
  }

  async createEnrollment(data: CreateEnrollmentDTO): Promise<IEnrollment> {
    try {
      const doc = new EnrollmentModel(data);
      return await doc.save();
    } catch (error) {
      throw new AppError(
        `Failed to create enrollment: ${(error as Error).message}`,
        500
      );
    }
  }

  async getEnrollmentById(id: string): Promise<IEnrollment | null> {
    try {
      return await EnrollmentModel.findById(new Types.ObjectId(id))
        .populate("student", "studentFirstName studentLastName adm")
        .populate("clas", "clasName")
        .populate("stream", "streamName")
        .populate("academicYear", "name");
    } catch (error) {
      throw new AppError(
        `Failed to get enrollment ${id}: ${(error as Error).message}`,
        500
      );
    }
  }

  async getEnrollments(
    filter: EnrollmentFilter = {},
    options?: PaginationOptions
  ): Promise<IEnrollment[]> {
    const { skip = 0, limit = 10 } = options || {};
    let query = this.baseQuery(filter).sort({ enrollmentDate: -1 }).skip(skip);
    if (limit > 0) query = query.limit(limit);
    return await query.exec();
  }

  async getAllEnrollments(): Promise<IEnrollment[]> {
    return await this.baseQuery().sort({ enrollmentDate: -1 }).exec();
  }

  async countEnrollments(filter: EnrollmentFilter = {}): Promise<number> {
    return await EnrollmentModel.countDocuments(filter).exec();
  }

  async updateEnrollmentById(
    id: string,
    updates: Partial<CreateEnrollmentDTO>
  ): Promise<IEnrollment | null> {
    try {
      return await EnrollmentModel.findByIdAndUpdate(
        new Types.ObjectId(id),
        updates,
        { new: true }
      )
        .populate("student", "studentFirstName studentLastName adm")
        .populate("clas", "clasName")
        .populate("stream", "streamName")
        .populate("academicYear", "name")
        .exec();
    } catch (error) {
      throw new AppError(
        `Failed to update enrollment ${id}: ${(error as Error).message}`,
        500
      );
    }
  }

  async deleteEnrollmentById(id: string): Promise<IEnrollment | null> {
    try {
      return await EnrollmentModel.findByIdAndDelete(new Types.ObjectId(id))
        .populate("student", "studentFirstName studentLastName adm")
        .populate("clas", "clasName")
        .populate("stream", "streamName")
        .populate("academicYear", "name")
        .exec();
    } catch (error) {
      throw new AppError(
        `Failed to delete enrollment ${id}: ${(error as Error).message}`,
        500
      );
    }
  }

  async deleteAllEnrollments(): Promise<{ deletedCount?: number }> {
    try {
      return await EnrollmentModel.deleteMany({}).exec();
    } catch (error) {
      throw new AppError(
        `Failed to delete all enrollments: ${(error as Error).message}`,
        500
      );
    }
  }

  async getEnrollmentsByStudent(studentId: string): Promise<IEnrollment[]> {
    try {
      return await EnrollmentModel.find({
        student: new Types.ObjectId(studentId),
      })
        .populate("clas", "clasName")
        .populate("stream", "streamName")
        .populate("academicYear", "name")
        .sort({ enrollmentDate: -1 })
        .exec();
    } catch (error) {
      throw new AppError(
        `Failed to get enrollments for student ${studentId}: ${(error as Error).message}`,
        500
      );
    }
  }

  async getEnrollmentsByAcademicYear(academicYearId: string): Promise<IEnrollment[]> {
    try {
      return await EnrollmentModel.find({
        academicYear: new Types.ObjectId(academicYearId),
      })
        .populate("student", "studentFirstName studentLastName adm")
        .populate("clas", "clasName")
        .populate("stream", "streamName")
        .sort({ enrollmentDate: -1 })
        .exec();
    } catch (error) {
      throw new AppError(
        `Failed to get enrollments for academic year ${academicYearId}: ${(error as Error).message}`,
        500
      );
    }
  }
}
