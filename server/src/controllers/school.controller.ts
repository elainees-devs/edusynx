// server/src/controllers/school.controller.ts
import mongoose from "mongoose";
import { SchoolRepository } from "../repositories/school.repository";
import { AppError } from "../utils/AppError";
import { handleAsync } from "../utils/handleAsync";

export class SchoolController {
  private schoolRepo: SchoolRepository;

  constructor() {
    this.schoolRepo = new SchoolRepository();
  }

  createSchool = handleAsync<{}, any, any>(async (req, res) => {
    const newSchool = await this.schoolRepo.createSchool(req.body);
    res.status(201).json(newSchool);
  });

  getSchoolById = handleAsync<{ id: string }>(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      throw new AppError("Invalid school ID", 400);
    }

    const school = await this.schoolRepo.findSchoolById(id);
    if (!school) throw new AppError("School not found", 404);
    res.json(school);
  });

  getSchoolByAccessLink = handleAsync<{ accessLink?: string }>(async (req, res) => {
  const accessLink = req.params.accessLink;

  if (!accessLink || typeof accessLink !== "string") {
    throw new AppError("accessLink query parameter is required", 400);
  }

  const school = await this.schoolRepo.findByAccessLink(accessLink);

  if (!school) {
    throw new AppError("School not found", 404);
  }

  res.json(school);
});

  getAllSchools = handleAsync(async (_req, res) => {
    const schools = await this.schoolRepo.findAllSchools();
    res.json(schools);
  });

  updateSchool = handleAsync<{ id: string }, any, Partial<any>>(
    async (req, res) => {
      const updated = await this.schoolRepo.updateSchoolById(
        req.params.id,
        req.body
      );
      if (!updated) throw new AppError("School not found", 404);
      res.json(updated);
    }
  );

  deleteSchoolById = handleAsync<{ id: string }>(async (req, res) => {
    const deleted = await this.schoolRepo.deleteSchoolById(req.params.id);
    if (!deleted) throw new AppError("School not found", 404);
    res.status(204).send();
  });

  deleteAllSchools = handleAsync(async (_req, res) => {
    await this.schoolRepo.deleteAllSchools();
    res.status(204).send();
  });
  /**
   * Activate school after verifying payment
   */
  activateSchool = handleAsync<{ id: string }>(async (req, res) => {
    const school = await this.schoolRepo.updateSchoolById(req.params.id, {
      isActive: true,
    });
    if (!school) throw new AppError("School not found", 404);
    res.json({ message: "School activated successfully", school });
  });

  getSchoolBySlug = handleAsync<{ slug: string }>(async (req, res) => {
    const school = await this.schoolRepo.findBySlug(req.params.slug);
    if (!school) throw new AppError("School not found or inactive", 404);
    res.json(school);
  });
}
