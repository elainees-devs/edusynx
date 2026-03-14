// server/src/repositories/school-core/school.repository.ts
import { FRONTEND_BASE_URL } from "../../config/config";
import { CreateSchoolDTO } from "../../dto";
import { SchoolModel } from "../../models";
import { ISchool } from "../../types";
import { slugify } from "../../utils/slugify";

export class SchoolRepository {
  async createSchool(schoolData: CreateSchoolDTO): Promise<ISchool> {
    const slug = slugify(schoolData.name);
    const accessUrl = `${FRONTEND_BASE_URL}/${slug}/signup`.toLowerCase();

    // 1. Prepare the nested subscription object
    let finalSubscription = undefined;

    if (schoolData.subscription) {
      const startDate = new Date();
      const endDate = new Date(startDate);
      // Ensure duration is treated as a number
      const months = Number(schoolData.subscription.duration) || 1;
      endDate.setMonth(endDate.getMonth() + months);

      finalSubscription = {
        planId: schoolData.subscription.planId,
        duration: months,
        startDate,
        endDate,
        isActive: true,
      };
    }

    // 2. Create the model, explicitly mapping fields to avoid double-nesting
    const school = new SchoolModel({
      name: schoolData.name,
      address: schoolData.address,
      phoneNumber: schoolData.phoneNumber,
      email: schoolData.email,
      website: schoolData.website,
      establishedYear: schoolData.establishedYear,
      logoUrl: schoolData.logoUrl,
      schoolCode: schoolData.schoolCode,
      role: schoolData.role || "principal",
      slug,
      accessUrl,
      subscription: finalSubscription, // Directly assign the prepared subscription object
    });

    console.log("Saving school with subscription:", finalSubscription);
    return await school.save();
  }

  async updateSchoolById(
    id: string,
    updates: Partial<ISchool>,
  ): Promise<ISchool | null> {
    return await SchoolModel.findByIdAndUpdate(id, updates, {
      new: true,
    }).exec();
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
