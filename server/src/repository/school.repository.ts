//src/repository/school.repository.ts
import { CreateSchoolDTO } from "../dto/entity.dto";
import School from "../models/school.model";
import { ISchool } from "../types";

export class SchoolRepository {
  async createSchool(schoolData: CreateSchoolDTO): Promise<ISchool> {
    const school = new School(schoolData);
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
}
