// server/src/controllers.academics/class.teacher.controller.ts
import { ClassTeacherRepository } from "../../repositories";
import { AppError, handleAsync } from "../../utils";

const classTeacherRepo = new ClassTeacherRepository();
export class ClassTeacherController {
  // 1. Add class teacher
  addClassTeacher = handleAsync(async (req, res) => {
    const classTeacher = await classTeacherRepo.addClassTeacher(req.body);
    res.status(201).json(classTeacher);
  });

  // 2. Get class teacher by Id
  getClassTeacherById = handleAsync<{ id: string }>(async (req, res) => {
      const classTeacher = await classTeacherRepo.getClassTeacherById(req.params.id);
      if (!classTeacher) throw new AppError("Class Teacher not found", 404);
      res.json(classTeacher);
    });

  // 3. Get all class teachers
  getAllClassTeachers = handleAsync(async (_req, res) => {
    const classTeachers = await classTeacherRepo.getAllClassTeachers();
    res.json(classTeachers);
  });

  // 4. Update class teacher by Id
  updateClassTeacher = handleAsync<{ id: string }, any, Partial<any>>(
    async (req, res) => {
      const updatedClassTeacher = await classTeacherRepo.updateClassTeacher(
        req.params.id,
        req.body
      );
      if (!updatedClassTeacher)
        throw new AppError("Class Teacher not found", 404);
      res.json(updatedClassTeacher);
    }
  );

  // 5. Delete class teacher by Id
  deleteClassTeacher = handleAsync<{ id: string }>(async (req, res) => {
    const deletedClassTeacher = await classTeacherRepo.deleteClassTeacher(
      req.params.id
    );
    if (!deletedClassTeacher)
      throw new AppError("Class Teacher not found", 404);
    res.status(204).send();
  });

  // 6. Delete all class teachers
  deleteAllClassTeachers = handleAsync(async (_req, res) => {
    await classTeacherRepo.deleteAllClassTeachers();
    res.status(204).send();
  });

  // 7. Count total students in each class
  countTotalStudentsPerClass = handleAsync(async (_req, res) => {
    const totals = await classTeacherRepo.countTotalStudentsPerClass();
    res.json(totals);
  });


}