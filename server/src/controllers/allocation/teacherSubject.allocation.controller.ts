import { Request, Response } from "express";
import { Types } from "mongoose";
import { handleAsync } from "../../utils/handleAsync";
import { AppError } from "../../utils/AppError";
import { TeacherSubjectAllocation } from "../../types";
import { TeacherSubjectAllocationRepository } from "../../repositories/allocation/teacherSubject.allocation.repository";

const teacherSubjectAllocationRepo = new TeacherSubjectAllocationRepository();

export class TeacherSubjectAllocationController {
  // Add a new teacher-subject allocation
  addAllocation = handleAsync(async (req: Request, res: Response) => {
    const schoolId = req.body.schoolId;
    const allocation: TeacherSubjectAllocation = req.body.allocation;
    if (!schoolId || !allocation) {
      throw new AppError("Missing schoolId or allocation", 400);
    }
    // Optionally validate allocation fields here
    const result = await teacherSubjectAllocationRepo.addAllocation(schoolId, allocation);
    res.status(201).json(result);
  });

  // Get all teacher-subject allocations for a school
  getAllocationsBySchool = handleAsync(async (req: Request, res: Response) => {
    const schoolId = req.params.schoolId;
    if (!schoolId) {
      throw new AppError("Missing schoolId", 400);
    }
    const allocations = await teacherSubjectAllocationRepo.getAllocationsBySchool(schoolId);
    res.json(allocations);
  });

  // Update a specific teacher-subject allocation by index
  updateAllocationByIndex = handleAsync(async (req: Request, res: Response) => {
    const schoolId = req.body.schoolId;
    const index = req.body.index;
    const update: Partial<TeacherSubjectAllocation> = req.body.update;
    if (schoolId === undefined || index === undefined || !update) {
      throw new AppError("Missing schoolId, index, or update", 400);
    }
    const updated = await teacherSubjectAllocationRepo.updateAllocationByIndex(schoolId, index, update);
    if (!updated) throw new AppError("Allocation not found", 404);
    res.json(updated);
  });

  // Remove a teacher-subject allocation by index
  removeAllocationByIndex = handleAsync(async (req: Request, res: Response) => {
    const schoolId = req.body.schoolId;
    const index = req.body.index;
    if (schoolId === undefined || index === undefined) {
      throw new AppError("Missing schoolId or index", 400);
    }
    const removed = await teacherSubjectAllocationRepo.removeAllocationByIndex(schoolId, index);
    if (!removed) throw new AppError("Allocation not found", 404);
    res.json(removed);
  });
}
