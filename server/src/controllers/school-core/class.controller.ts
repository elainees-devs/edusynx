// server/src/controllers/class.controller.ts
import { Request, Response } from "express";
import { handleAsync } from "../../utils/handleAsync";
import { AppError } from "../../utils/AppError";
import { PaginationOptions } from "../../shared/pagination";
import { ClassRepository } from "../../repositories";

const classRepo = new ClassRepository();

export class ClassController {
  /**
   * Create a new class
   * POST /classes
   */
  createClass = handleAsync(async (req: Request, res: Response) => {
    const newClass = await classRepo.createClass(req.body);
    res.status(201).json(newClass);
  });

  /**
   * Get class by ID
   * GET /classes/:id
   */
  getClassById = handleAsync<{ id: string }>(async (req, res) => {
    const foundClass = await classRepo.getClassById(req.params.id);
    if (!foundClass) throw new AppError("Class not found", 404);
    res.json(foundClass);
  });

  /**
   * Get paginated classes
   * GET /classes?page=1&limit=10
   */
  getClasses = handleAsync(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const [classes, total] = await Promise.all([
      classRepo.getClasses({}, { skip, limit } as PaginationOptions),
      classRepo.countClasses(),
    ]);

    res.json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data: classes,
    });
  });

  /**
   * Get all classes without pagination
   * GET /classes/all
   */
  getAllClasses = handleAsync(async (_req: Request, res: Response) => {
    const classes = await classRepo.getAllClasses();
    res.json(classes);
  });

  /**
   * Update class by ID
   * PUT /classes/:id
   */
  updateClass = handleAsync<{ id: string }, any, Partial<any>>(async (req, res) => {
    const updatedClass = await classRepo.updateClassById(req.params.id, req.body);
    if (!updatedClass) throw new AppError("Class not found", 404);
    res.json(updatedClass);
  });

  /**
   * Delete class by ID
   * DELETE /classes/:id
   */
  deleteClass = handleAsync<{ id: string }>(async (req, res) => {
    const deletedClass = await classRepo.deleteClassById(req.params.id);
    if (!deletedClass) throw new AppError("Class not found", 404);
    res.status(204).send();
  });

  /**
   * Delete all classes
   * DELETE /classes
   */
  deleteAllClasses = handleAsync(async (_req: Request, res: Response) => {
    await classRepo.deleteAllClasses();
    res.status(204).send();
  });

  /**
   * Get classes by school and optional academicYear with pagination
   * GET /classes/filter/:schoolId?academicYear=2025&page=1&limit=10
   */
  getClassesByFilter = handleAsync<{ schoolId: string }>(async (req, res) => {
    const { schoolId } = req.params;
    if (!schoolId) throw new AppError("schoolId parameter is required", 400);

    const { academicYear, page = "1", limit = "10" } = req.query;

    const filter: Record<string, any> = { school: schoolId };
    if (academicYear) filter.academicYear = academicYear;

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    const [classes, total] = await Promise.all([
      classRepo.getClasses(filter, { skip, limit: limitNum } as PaginationOptions),
      classRepo.countClasses(filter),
    ]);

    res.json({
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum),
      data: classes,
    });
  });

  /**
   * Get classes by academic year
   * GET /classes/by-year?academicYear=2025
   */
  getClassesByAcademicYear = handleAsync(async (req: Request, res: Response) => {
    const { academicYear } = req.query;
    if (!academicYear) throw new AppError("academicYear query parameter is required", 400);

    const classes = await classRepo.getClassesByAcademicYear(academicYear as string);
    res.json(classes);
  });
}
