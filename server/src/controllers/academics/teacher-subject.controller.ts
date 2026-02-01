// server/src/controllers/academics/teacher-subject.controller.ts
import { Request, Response } from "express";
import { handleAsync } from "../../utils/handleAsync";
import { AppError } from "../../utils/AppError";
import { PaginationOptions } from "../../shared/pagination";
import { TeacherSubjectRepository } from "../../repositories";

const teacherSubjectRepo = new TeacherSubjectRepository();

export class TeacherSubjectController {
  /**
   * Assign subjects, classes, and streams to a teacher
   * POST /teacher-subjects
   */
  assignSubjects = handleAsync(async (req: Request, res: Response) => {
    const assignment = await teacherSubjectRepo.assignSubjectToTeacher(req.body);
    res.status(201).json(assignment);
  });

  /**
   * Get all assignments for a teacher
   * GET /teacher-subjects/teacher/:teacherId
   */
  getSubjectsByTeacher = handleAsync<{ teacherId: string }>(async (req, res) => {
    const assignments = await teacherSubjectRepo.getSubjectsByTeacher(req.params.teacherId);
    res.json(assignments);
  });

  /**
   * Get all teacher-subject assignments (with optional filter + pagination)
   * GET /teacher-subjects?page=1&limit=10&school=xxx&teacherId=yyy
   */
  getTeacherSubjects = handleAsync(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const filter: Record<string, any> = {};
    if (req.query.school) filter.school = req.query.school;
    if (req.query.teacherId) filter.teacherId = req.query.teacherId;
    if (req.query.subjectId) filter.subjectId = req.query.subjectId;
    if (req.query.classId) filter.classId = req.query.classId;
    if (req.query.streamId) filter.streamId = req.query.streamId;

    const [data, total] = await Promise.all([
      teacherSubjectRepo.getTeacherSubjects(filter, { skip, limit } as PaginationOptions),
      teacherSubjectRepo.getTeacherSubjects(filter).then((arr) => arr.length),
    ]);

    res.json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data,
    });
  });

  /**
   * Get teacher-subject assignment by ID
   * GET /teacher-subjects/:id
   */
  getTeacherSubjectById = handleAsync<{ id: string }>(async (req, res) => {
    const assignment = await teacherSubjectRepo.getTeacherSubjectById(req.params.id);
    if (!assignment) throw new AppError("Assignment not found", 404);
    res.json(assignment);
  });

  /**
   * Update teacher-subject assignment
   * PATCH /teacher-subjects/:id
   */
  updateTeacherSubject = handleAsync<{ id: string }, any, Partial<any>>(async (req, res) => {
    const updated = await teacherSubjectRepo.updateTeacherSubject(req.params.id, req.body);
    if (!updated) throw new AppError("Assignment not found", 404);
    res.json(updated);
  });

  /**
   * Remove a specific subject from a teacher
   * DELETE /teacher-subjects/:teacherId/subject/:subjectId
   */
  removeSubjectFromTeacher = handleAsync<{ teacherId: string; subjectId: string }>(async (req, res) => {
    const success = await teacherSubjectRepo.removeSubjectFromTeacher(
      req.params.teacherId,
      req.params.subjectId
    );
    if (!success) throw new AppError("No assignment removed", 404);
    res.status(204).send();
  });

  /**
   * Count subjects per teacher
   * GET /teacher-subjects/count
   */
  countSubjectsPerTeacher = handleAsync(async (_req, res) => {
    const counts = await teacherSubjectRepo.countSubjectsPerTeacher();
    res.json(counts);
  });

  /**
   * Get teachers teaching a specific subject
   * GET /teacher-subjects/subject/:subjectId
   */
  getTeachersBySubject = handleAsync<{ subjectId: string }>(async (req, res) => {
    const teachers = await teacherSubjectRepo.getTeachersBySubject(req.params.subjectId);
    res.json(teachers);
  });

  /**
   * Get all teachers and their subjects for a school
   * GET /teacher-subjects/school/:schoolId
   */
  getTeachersAndSubjectsBySchool = handleAsync<{ schoolId: string }>(async (req, res) => {
    const list = await teacherSubjectRepo.getTeachersAndSubjectsBySchool(req.params.schoolId);
    res.json(list);
  });

  /**
   * Delete teacher-subject assignment by ID
   * DELETE /teacher-subjects/:id
   */
  deleteTeacherSubject = handleAsync<{ id: string }>(async (req, res) => {
    const deleted = await teacherSubjectRepo.deleteTeacherSubject(req.params.id);
    if (!deleted) throw new AppError("Assignment not found", 404);
    res.status(204).send();
  });
}
