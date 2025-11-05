import { ClassRepository } from "../../repositories";
import { AppError } from "../../utils/AppError";
import { handleAsync } from "../../utils/handleAsync";

const classRepo = new ClassRepository();

export class ClassController {
  createClass = handleAsync(async (req, res) => {
    const newClass = await classRepo.createClass(req.body);
    res.status(201).json(newClass);
  });

  getClassById = handleAsync<{ id: string }>(async (req, res) => {
    const foundClass = await classRepo.getClassById(req.params.id);
    if (!foundClass) throw new AppError("Class not found", 404);
    res.json(foundClass);
  });

  /**
   * GET /classes?page=1&limit=10
   * Supports pagination with defaults.
   */
  getAllClasses = handleAsync(async (req, res) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const [classes, total] = await Promise.all([
      classRepo.getAllClasses({ skip, limit }),
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

  updateClass = handleAsync<{ id: string }, any, Partial<any>>(async (req, res) => {
    const updatedClass = await classRepo.updateClassById(req.params.id, req.body);
    if (!updatedClass) throw new AppError("Class not found", 404);
    res.json(updatedClass);
  });

  deleteClass = handleAsync<{ id: string }>(async (req, res) => {
    const deletedClass = await classRepo.deleteClassById(req.params.id);
    if (!deletedClass) throw new AppError("Class not found", 404);
    res.status(204).send();
  });

  deleteAllClasses = handleAsync(async (_req, res) => {
    await classRepo.deleteAllClasses();
    res.status(204).send();
  });

  /**
   * GET /classes/filter/:schoolId?academicYear=2025&page=1&limit=10
   */
  getClassesByFilter = handleAsync<{ schoolId: string }>(async (req, res) => {
    const { schoolId } = req.params;
    const { academicYear, page = "1", limit = "10" } = req.query;

    if (!schoolId) throw new AppError("schoolId parameter is required", 400);

    const filter: Record<string, any> = { school: schoolId };
    if (academicYear) filter.academicYear = academicYear;

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    const [classes, total] = await Promise.all([
      classRepo.getClassesByFilter(filter, { skip, limit: limitNum }),
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

  getClassesByAcademicYear = handleAsync(async (req, res) => {
    const { academicYear } = req.query;
    if (!academicYear) throw new AppError("academicYear query parameter is required", 400);

    const classes = await classRepo.getClassesByAcademicYear(academicYear as string);
    res.json(classes);
  });
}
