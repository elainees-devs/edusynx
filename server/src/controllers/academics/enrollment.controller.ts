import { Request, Response } from "express";
import { handleAsync } from "../../utils/handleAsync";
import { AppError } from "../../utils/AppError";
import { PaginationOptions } from "../../shared/pagination";
import { EnrollmentRepository } from "../../repositories";

const enrollmentRepo = new EnrollmentRepository();

export class EnrollmentController {
  createEnrollment = handleAsync(async (req: Request, res: Response) => {
    const doc = await enrollmentRepo.createEnrollment(req.body);
    res.status(201).json(doc);
  });

  getEnrollmentById = handleAsync<{ id: string }>(async (req, res) => {
    const doc = await enrollmentRepo.getEnrollmentById(req.params.id);
    if (!doc) throw new AppError("Enrollment not found", 404);
    res.json(doc);
  });

  getEnrollments = handleAsync(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const filter: Record<string, any> = {};
    if (req.query.school) filter.school = String(req.query.school);
    if (req.query.student) filter.student = String(req.query.student);
    if (req.query.clas) filter.clas = String(req.query.clas);
    if (req.query.stream) filter.stream = String(req.query.stream);
    if (req.query.academicYear) filter.academicYear = String(req.query.academicYear);
    if (req.query.status) filter.status = String(req.query.status);
    if (req.query.enrollmentType) filter.enrollmentType = String(req.query.enrollmentType);

    const [data, total] = await Promise.all([
      enrollmentRepo.getEnrollments(filter, { skip, limit } as PaginationOptions),
      enrollmentRepo.countEnrollments(filter),
    ]);

    res.json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data,
    });
  });

  getAllEnrollments = handleAsync(async (_req: Request, res: Response) => {
    const docs = await enrollmentRepo.getAllEnrollments();
    res.json(docs);
  });

  updateEnrollment = handleAsync<{ id: string }>(async (req, res) => {
    const updated = await enrollmentRepo.updateEnrollmentById(
      req.params.id,
      req.body
    );
    if (!updated) throw new AppError("Enrollment not found", 404);
    res.json(updated);
  });

  deleteEnrollment = handleAsync<{ id: string }>(async (req, res) => {
    const deleted = await enrollmentRepo.deleteEnrollmentById(req.params.id);
    if (!deleted) throw new AppError("Enrollment not found", 404);
    res.status(204).send();
  });

  deleteAllEnrollments = handleAsync(async (_req: Request, res: Response) => {
    await enrollmentRepo.deleteAllEnrollments();
    res.status(204).send();
  });

  getEnrollmentsByStudent = handleAsync(async (req: Request, res: Response) => {
    const studentId = req.query.studentId as string;
    if (!studentId) throw new AppError("studentId query parameter is required", 400);

    const docs = await enrollmentRepo.getEnrollmentsByStudent(studentId);
    res.json(docs);
  });

  getEnrollmentsByAcademicYear = handleAsync(async (req: Request, res: Response) => {
    const academicYearId = req.query.academicYearId as string;
    if (!academicYearId) throw new AppError("academicYearId query parameter is required", 400);

    const docs = await enrollmentRepo.getEnrollmentsByAcademicYear(academicYearId);
    res.json(docs);
  });
}
