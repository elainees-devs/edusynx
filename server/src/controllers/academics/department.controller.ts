// server/src/controllers/academics/department.controller.ts
import { DepartmentRepository } from "../../repositories";
import { AppError, handleAsync } from "../../utils";

const departmentRepo = new DepartmentRepository();
export class DepartmentController {
  createDepartment = handleAsync(async (req, res) => {
    const newDepartment = await departmentRepo.createDepartment(req.body);
    res.status(201).json(newDepartment);
  });

  getDepartmentById = handleAsync<{ id: string }>(async (require, res) => {
    const foundDepartment = await departmentRepo.getDepartmentById(
      require.params.id
    );
    if (!foundDepartment) throw new AppError("Department not found", 404);
    res.json(foundDepartment);
  });

  getAllDepartments = handleAsync(async (req, res) => {
    const departments = await departmentRepo.getAllDepartments();
    res.json(departments);
  });

  updateDepartment = handleAsync<{ id: string }, any, Partial<any>>(
    async (req, res) => {
      const updatedDepartment = await departmentRepo.updateDepartment(
        req.params.id,
        req.body
      );
      if (!updatedDepartment) throw new AppError("Class not found", 404);
      res.json(updatedDepartment);
    }
  );

  deleteDepartment = handleAsync<{ id: string }>(async (req, res) => {
    const deletedDepartment = await departmentRepo.deleteDepartment(
      req.params.id
    );
    if (!deletedDepartment) throw new AppError("Class not found", 404);
    res.status(204).send();
  });

  deleteAllDepartments = handleAsync(async (_req, res) => {
    await departmentRepo.deleteAllDepartments();
    res.status(204).send();
  });
}
