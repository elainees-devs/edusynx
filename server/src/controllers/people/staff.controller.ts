import { StaffRepository } from "../../repositories";
import { AppError, handleAsync } from "../../utils";

const staffRepo = new StaffRepository();

export class StaffController {
  createStaff = handleAsync(async (req, res) => {
    const staff = await staffRepo.createStaff(req.body);
    res.status(201).json(staff);
  });

  getStaffById = handleAsync<{ id: string }>(async (req, res) => {
    const staff = await staffRepo.getStaffById(req.params.id);
    if (!staff) throw new AppError("Staff not found", 404);
    res.json(staff);
  });

  getAllStaff = handleAsync(async (req, res) => {
    const schoolId = req.query.schoolId as string;
    if (!schoolId) throw new AppError("schoolId query parameter is required", 400);

    const { role, department, isActive, search, page, limit } = req.query as any;
    const result = await staffRepo.getAllStaff(schoolId, {
      role,
      department,
      isActive: isActive === "true" ? true : isActive === "false" ? false : undefined,
      search,
      page: page ? parseInt(page) : undefined,
      limit: limit ? parseInt(limit) : undefined,
    });
    res.json(result);
  });

  updateStaff = handleAsync<{ id: string }>(async (req, res) => {
    const staff = await staffRepo.updateStaff(req.params.id, req.body);
    if (!staff) throw new AppError("Staff not found", 404);
    res.json(staff);
  });

  deleteStaff = handleAsync<{ id: string }>(async (req, res) => {
    const staff = await staffRepo.deleteStaff(req.params.id);
    if (!staff) throw new AppError("Staff not found", 404);
    res.status(204).send();
  });

  toggleActive = handleAsync<{ id: string }>(async (req, res) => {
    const staff = await staffRepo.toggleActive(req.params.id);
    if (!staff) throw new AppError("Staff not found", 404);
    res.json(staff);
  });

  assignDepartment = handleAsync<{ id: string }>(async (req, res) => {
    const staff = await staffRepo.assignDepartment(req.params.id, req.body.departmentId);
    if (!staff) throw new AppError("Staff not found", 404);
    res.json(staff);
  });

  assignPosition = handleAsync<{ id: string }>(async (req, res) => {
    const staff = await staffRepo.assignPosition(req.params.id, req.body.position);
    if (!staff) throw new AppError("Staff not found", 404);
    res.json(staff);
  });

  countStaff = handleAsync(async (req, res) => {
    const schoolId = req.query.schoolId as string;
    if (!schoolId) throw new AppError("schoolId query parameter is required", 400);
    const count = await staffRepo.countStaff(schoolId);
    res.json({ count });
  });
}
