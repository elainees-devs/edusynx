// server/src/repositories/school-core/school.repository.ts
import { FRONTEND_BASE_URL } from "../../config/config";
import { CreateSchoolDTO } from "../../dto";
import { SchoolModel } from "../../models";
import { ISchool } from "../../types";
import { slugify } from "../../utils/slugify";


export class SchoolRepository {
  async createSchool(schoolData: CreateSchoolDTO): Promise<ISchool> {
    const slug = slugify(schoolData.name);
    const accessUrl = `${FRONTEND_BASE_URL}/${slug}/signup`;
    const school = new SchoolModel({
      ...schoolData,
      slug,
      accessUrl: accessUrl 
    });
    console.log(accessUrl)
    return await school.save();
  }

  async updateSchoolById(
    id: string,
    updates: Partial<ISchool>
  ): Promise<ISchool | null> {
    return await SchoolModel.findByIdAndUpdate(id, updates, { new: true }).exec();
  }

  async findSchoolById(id: string): Promise<ISchool | null> {
    return await SchoolModel.findById(id).exec();
  }

  async findByAccessLink(accessLink: string) {
  return await SchoolModel.findOne({ accessLink });
}


  async findAllSchools(): Promise<ISchool[]> {
    return await SchoolModel.find().exec();
  }
  
  async deleteSchoolById(id: string): Promise<ISchool | null> {
    return await SchoolModel.findByIdAndDelete(id).exec();
  }

  async deleteAllSchools(): Promise<void> {
    await SchoolModel.deleteMany({}).exec();
  }

  async findBySlug(slug: string): Promise<ISchool | null> {
    return await SchoolModel.findOne({ slug, isActive: true }).exec();
  }

  async getSlugById(id: string): Promise<string | null> {
    const school = await SchoolModel.findById(id).select("slug").exec();
    return school?.slug || null;
  }

  async findMany({ skip = 0, limit = 10 }) {
  return SchoolModel.find().skip(skip).limit(limit);
}

async countAll() {
  return SchoolModel.countDocuments();
}

}
