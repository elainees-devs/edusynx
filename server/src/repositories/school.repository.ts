// server/src/repositories/school.repository.ts
import { CreateSchoolDTO } from "../dto/entity.dto";
import School from "../models/school.model";
import { ISchool } from "../types";
import { slugify } from "../utils/slugify";

export class SchoolRepository {
  async createSchool(schoolData: CreateSchoolDTO): Promise<ISchool> {
    const slug = slugify(schoolData.name)
    const school = new School({
      ...schoolData,
    slug});
    return await school.save();
  }

  async updateSchoolById(
    id: string,
    updates: Partial<ISchool>
  ): Promise<ISchool | null> {
    return await School.findByIdAndUpdate(id, updates, { new: true }).exec();
  }

  async findSchoolById(id: string): Promise<ISchool | null> {
    return await School.findById(id).exec();
  }

  async findAllSchools(): Promise<ISchool[]> {
    return await School.find().exec();
  }

  async deleteSchoolById(id: string): Promise<ISchool | null> {
    return await School.findByIdAndDelete(id).exec();
  }

  async deleteAllSchools(): Promise<void> {
    await School.deleteMany({}).exec();
  }

  async findBySlug(slug: string): Promise<ISchool | null> {
    return await School.findOne({ slug, isActive: true }).exec();
  }
}
