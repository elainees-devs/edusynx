// src/controllers/school.controller.ts
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

  getAllSchools = handleAsync(async (_req, res) => {
    const schools = await this.schoolRepo.findAllSchools();
    res.json(schools);
  });

  getSchoolById = handleAsync<{ id: string }>(async (req, res) => {
    const school = await this.schoolRepo.findSchoolById(req.params.id);
    if (!school) throw new AppError("School not found", 404);
    res.json(school);
  });

  updateSchool = handleAsync<{ id: string }, any, Partial<any>>(
    async (req, res) => {
      const updated = await this.schoolRepo.updateSchoolById(req.params.id, req.body);
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
}
