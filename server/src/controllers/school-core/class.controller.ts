// server/src/controllers/school-core/class.controller.ts
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

  getAllClasses = handleAsync(async (_req, res) => {
    const classes = await classRepo.getAllClasses();
    res.json(classes);
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

getClassesByFilter = handleAsync<{ schoolId: string }>(async (req, res) => {
  const { schoolId } = req.params;
  const { academicYear } = req.query;

  if (!schoolId) throw new AppError("schoolId parameter is required", 400);

  const filter: Record<string, any> = { school: schoolId };
  if (academicYear) {
    filter.academicYear = academicYear;
  }

  const classes = await classRepo.getClassesByFilter(filter);
  res.json(classes);
});



  getClassesByAcademicYear = handleAsync(async (req, res) => {
    const { academicYear } = req.query;
    if (!academicYear) throw new AppError("academicYear query parameter is required", 400);

    const classes = await classRepo.getClassesByAcademicYear(academicYear as string);
    res.json(classes);
  });
}
