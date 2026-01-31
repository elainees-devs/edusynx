// server/src/controllers/academics/subject.controller.ts
import { Request, Response } from "express";
import { handleAsync } from "../../utils/handleAsync";
import { AppError } from "../../utils/AppError";
import { PaginationOptions } from "../../shared/pagination";
import { SubjectRepository } from "../../repositories";

const subjectRepo = new SubjectRepository();

export class SubjectController {
  /**
   * Create a new subject
   * POST /subjects
   */
  createSubject = handleAsync(async (req: Request, res: Response) => {
    const newSubject = await subjectRepo.createSubject(req.body);
    res.status(201).json(newSubject);
  });

  /**
   * Get subject by ID
   * GET /subjects/:id
   */
  getSubjectById = handleAsync<{ id: string }>(async (req, res) => {
    const subject = await subjectRepo.getSubjectById(req.params.id);
    if (!subject) throw new AppError("Subject not found", 404);
    res.json(subject);
  });

  /**
   * Get paginated subjects
   * GET /subjects?page=1&limit=10&school=123&classRef=456&subjectName=English
   */
  getSubjects = handleAsync(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const filter: Record<string, any> = {};

    if (req.query.school) filter.school = String(req.query.school);
    if (req.query.classRef) filter.classRef = String(req.query.classRef);
    if (req.query.subjectName) filter.subjectName = String(req.query.subjectName);

    const [subjects, total] = await Promise.all([
      subjectRepo.getSubjects(filter, { skip, limit } as PaginationOptions),
      subjectRepo.countSubjects(filter),
    ]);

    res.json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data: subjects,
    });
  });

  /**
   * Get all subjects without pagination
   * GET /subjects/all
   */
  getAllSubjects = handleAsync(async (_req: Request, res: Response) => {
    const subjects = await subjectRepo.getAllSubjects();
    res.json(subjects);
  });

  /**
   * Get subjects by school
   * GET /subjects/school/:schoolId
   */
  getSubjectsBySchool = handleAsync<{ schoolId: string }>(
    async (req, res) => {
      const subjects = await subjectRepo.getSubjectsBySchool(req.params.schoolId);
      res.json(subjects);
    }
  );

  /**
   * PATCH update subject by ID
   * PATCH /subjects/:id
   */
  updateSubject = handleAsync<
    { id: string },
    any,
    Partial<any>
  >(async (req, res) => {
    const updatedSubject = await subjectRepo.updateSubject(
      req.params.id,
      req.body
    );

    if (!updatedSubject) throw new AppError("Subject not found", 404);
    res.json(updatedSubject);
  });

  /**
   * Delete subject by ID
   * DELETE /subjects/:id
   */
  deleteSubject = handleAsync<{ id: string }>(async (req, res) => {
    const deletedSubject = await subjectRepo.deleteSubject(req.params.id);
    if (!deletedSubject) throw new AppError("Subject not found", 404);
    res.status(204).send();
  });

  /**
   * Delete all subjects
   * DELETE /subjects
   */
  deleteAllSubjects = handleAsync(async (_req: Request, res: Response) => {
    await subjectRepo.deleteAllSubjects();
    res.status(204).send();
  });
}
