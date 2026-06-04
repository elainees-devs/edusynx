import { Types } from "mongoose";
import { AcademicYearModel } from "../../models";
import { IAcademicYear } from "../../types";
import { AppError } from "../../utils";
import { CreateAcademicYearDTO } from "../../dto";
import { PaginationOptions } from "../../shared/pagination";

type AcademicYearFilter = Partial<
  Pick<IAcademicYear, "school" | "name" | "isActive">
>;

export class AcademicYearRepository {
  private baseQuery(filter: AcademicYearFilter = {}) {
    return AcademicYearModel.find(filter).populate("school", "name");
  }

  async createAcademicYear(data: CreateAcademicYearDTO): Promise<IAcademicYear> {
    try {
      if (data.isActive) {
        await AcademicYearModel.updateMany(
          { school: data.school, isActive: true },
          { isActive: false }
        );
      }
      const doc = new AcademicYearModel(data);
      return await doc.save();
    } catch (error) {
      throw new AppError(
        `Failed to create academic year: ${(error as Error).message}`,
        500
      );
    }
  }

  async getAcademicYearById(id: string): Promise<IAcademicYear | null> {
    try {
      return await AcademicYearModel.findById(new Types.ObjectId(id))
        .populate("school", "name");
    } catch (error) {
      throw new AppError(
        `Failed to get academic year ${id}: ${(error as Error).message}`,
        500
      );
    }
  }

  async getAcademicYears(
    filter: AcademicYearFilter = {},
    options?: PaginationOptions
  ): Promise<IAcademicYear[]> {
    const { skip = 0, limit = 10 } = options || {};
    let query = this.baseQuery(filter).sort({ startDate: -1 }).skip(skip);
    if (limit > 0) query = query.limit(limit);
    return await query.exec();
  }

  async getAllAcademicYears(): Promise<IAcademicYear[]> {
    return await this.baseQuery().sort({ startDate: -1 }).exec();
  }

  async countAcademicYears(filter: AcademicYearFilter = {}): Promise<number> {
    return await AcademicYearModel.countDocuments(filter).exec();
  }

  async updateAcademicYearById(
    id: string,
    updates: Partial<CreateAcademicYearDTO>
  ): Promise<IAcademicYear | null> {
    try {
      if (updates.isActive) {
        const existing = await AcademicYearModel.findById(id);
        if (existing) {
          await AcademicYearModel.updateMany(
            { school: existing.school, _id: { $ne: id }, isActive: true },
            { isActive: false }
          );
        }
      }
      return await AcademicYearModel.findByIdAndUpdate(
        new Types.ObjectId(id),
        updates,
        { new: true }
      )
        .populate("school", "name")
        .exec();
    } catch (error) {
      throw new AppError(
        `Failed to update academic year ${id}: ${(error as Error).message}`,
        500
      );
    }
  }

  async deleteAcademicYearById(id: string): Promise<IAcademicYear | null> {
    try {
      return await AcademicYearModel.findByIdAndDelete(
        new Types.ObjectId(id)
      )
        .populate("school", "name")
        .exec();
    } catch (error) {
      throw new AppError(
        `Failed to delete academic year ${id}: ${(error as Error).message}`,
        500
      );
    }
  }

  async deleteAllAcademicYears(): Promise<{ deletedCount?: number }> {
    try {
      return await AcademicYearModel.deleteMany({}).exec();
    } catch (error) {
      throw new AppError(
        `Failed to delete all academic years: ${(error as Error).message}`,
        500
      );
    }
  }

  async getActiveAcademicYear(schoolId: string): Promise<IAcademicYear | null> {
    try {
      return await AcademicYearModel.findOne({
        school: new Types.ObjectId(schoolId),
        isActive: true,
      })
        .populate("school", "name")
        .exec();
    } catch (error) {
      throw new AppError(
        `Failed to get active academic year: ${(error as Error).message}`,
        500
      );
    }
  }
}
