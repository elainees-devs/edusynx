// server/controllers/allocation.controller.ts
import { Types } from "mongoose";
import { ISchoolAllocation } from "../types";
import { AppError, handleAsync } from "../utils";
import { SchoolAllocationSchema } from "../validation/allocation.schema";
import { AllocationRepository } from "../repositories";

const allocationRepo = new AllocationRepository();

export class AllocationController {
  createAllocation = handleAsync(async (req, res) => {
    const parsed = SchoolAllocationSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new AppError("Validation failed", 400, parsed.error.format());
    }

    const data = parsed.data;
    const transformedData: Partial<ISchoolAllocation> = {
      school: new Types.ObjectId(data.school),
      classes: data.classes.map(cls => ({
        className: cls.className,
        classTeacher: cls.classTeacher ? new Types.ObjectId(cls.classTeacher) : undefined,
        subjects: cls.subjects.map(sub => ({
          subjectName: sub.subjectName,
          teachers: sub.teachers.map(tid => new Types.ObjectId(tid)),
          headOfSubject: sub.headOfSubject ? new Types.ObjectId(sub.headOfSubject) : undefined
        }))
      })),
      headsOfSubjects: Object.fromEntries(
        Object.entries(data.headsOfSubjects).map(([subject, teacherId]) => [
          subject,
          new Types.ObjectId(teacherId)
        ])
      )
    };

    const newAllocation = await allocationRepo.createAllocation(transformedData);
    res.status(201).json(newAllocation);
  });

  getAllocationBySchoolId = handleAsync<{ schoolId: string }>(async (req, res) => {
    const { schoolId } = req.params;
    const allocation = await allocationRepo.findBySchoolId(schoolId);
    if (!allocation) throw new AppError("Allocation not found", 404);
    res.json(allocation);
  });

  updateAllocationBySchoolId = handleAsync<{ schoolId: string }>(async (req, res) => {
    const parsed = SchoolAllocationSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new AppError("Validation failed", 400, parsed.error.format());
    }

    const data = parsed.data;
    const transformedData: Partial<ISchoolAllocation> = {
      school: new Types.ObjectId(data.school),
      classes: data.classes.map(cls => ({
        className: cls.className,
        classTeacher: cls.classTeacher ? new Types.ObjectId(cls.classTeacher) : undefined,
        subjects: cls.subjects.map(sub => ({
          subjectName: sub.subjectName,
          teachers: sub.teachers.map(tid => new Types.ObjectId(tid)),
          headOfSubject: sub.headOfSubject ? new Types.ObjectId(sub.headOfSubject) : undefined
        }))
      })),
      headsOfSubjects: Object.fromEntries(
        Object.entries(data.headsOfSubjects).map(([subject, teacherId]) => [
          subject,
          new Types.ObjectId(teacherId)
        ])
      )
    };

    const updated = await allocationRepo.updateBySchoolId(req.params.schoolId, transformedData);
    if (!updated) throw new AppError("Allocation not found", 404);
    res.json(updated);
  });

  deleteAllocationBySchoolId = handleAsync<{ schoolId: string }>(async (req, res) => {
    const deleted = await allocationRepo.deleteBySchoolId(req.params.schoolId);
    if (!deleted) throw new AppError("Allocation not found", 404);
    res.status(204).send();
  });

  getAllAllocations = handleAsync(async (_req, res) => {
    const allocations = await allocationRepo.getAllAllocations?.();
    res.json(allocations);
  });
}
