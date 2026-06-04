import { Request, Response } from "express";
import { handleAsync } from "../../utils/handleAsync";
import { AppError } from "../../utils/AppError";
import { PaginationOptions } from "../../shared/pagination";
import { AcademicYearRepository } from "../../repositories";

const academicYearRepo = new AcademicYearRepository();

export class AcademicYearController {
  createAcademicYear = handleAsync(async (req: Request, res: Response) => {
    const doc = await academicYearRepo.createAcademicYear(req.body);
    res.status(201).json(doc);
  });

  getAcademicYearById = handleAsync<{ id: string }>(async (req, res) => {
    const doc = await academicYearRepo.getAcademicYearById(req.params.id);
    if (!doc) throw new AppError("Academic year not found", 404);
    res.json(doc);
  });

  getAcademicYears = handleAsync(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const filter: Record<string, any> = {};
    if (req.query.school) filter.school = String(req.query.school);
    if (req.query.isActive !== undefined) filter.isActive = req.query.isActive === "true";

    const [data, total] = await Promise.all([
      academicYearRepo.getAcademicYears(filter, { skip, limit } as PaginationOptions),
      academicYearRepo.countAcademicYears(filter),
    ]);

    res.json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data,
    });
  });

  getAllAcademicYears = handleAsync(async (_req: Request, res: Response) => {
    const docs = await academicYearRepo.getAllAcademicYears();
    res.json(docs);
  });

  updateAcademicYear = handleAsync<{ id: string }>(async (req, res) => {
    const updated = await academicYearRepo.updateAcademicYearById(
      req.params.id,
      req.body
    );
    if (!updated) throw new AppError("Academic year not found", 404);
    res.json(updated);
  });

  deleteAcademicYear = handleAsync<{ id: string }>(async (req, res) => {
    const deleted = await academicYearRepo.deleteAcademicYearById(req.params.id);
    if (!deleted) throw new AppError("Academic year not found", 404);
    res.status(204).send();
  });

  deleteAllAcademicYears = handleAsync(async (_req: Request, res: Response) => {
    await academicYearRepo.deleteAllAcademicYears();
    res.status(204).send();
  });

  getActiveAcademicYear = handleAsync(async (req: Request, res: Response) => {
    const schoolId = req.query.school as string;
    if (!schoolId) throw new AppError("school query parameter is required", 400);

    const doc = await academicYearRepo.getActiveAcademicYear(schoolId);
    if (!doc) throw new AppError("No active academic year found", 404);
    res.json(doc);
  });
}
