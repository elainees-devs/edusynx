// server/src/controllers/class.controller.ts
import { Request, Response } from "express";
import { handleAsync } from "../../utils/handleAsync";
import { AppError } from "../../utils/AppError";
import { PaginationOptions } from "../../shared/pagination";
import { ClassRepository } from "../../repositories";
import { normalizeId } from "../../utils";
import { UserRole } from "../../types";

const classRepo = new ClassRepository();

export class ClassController {

/**
 * Create a new class
 * POST /classes
 */
createClass = handleAsync(async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    throw new AppError("Unauthorized", 401);
  }

  let schoolId;

  // SUPER ADMIN: must provide school explicitly
  if (user.role === UserRole.SUPER_ADMIN) {
    if (!req.body.school) {
      throw new AppError("School is required for Super Admin", 400);
    }

    schoolId = normalizeId(req.body.school);
  } 
  // ALL OTHER ROLES: must have school in their profile
  else {
    if (!("school" in user) || !user.school) {
      throw new AppError("User has no school assigned", 400);
    }

    schoolId = normalizeId(user.school);
  }

  // prevent spoofing
  const { school, ...classData } = req.body;

  const newClass = await classRepo.createClass({
    ...classData,
    school: schoolId,
  });

  res.status(201).json(newClass);
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
