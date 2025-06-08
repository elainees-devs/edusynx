// src/controllers/permission.controller.ts
import { PermissionRepository } from "../repositories/permission.repository";
import { AppError } from "../utils/AppError";
import { Types } from "mongoose";
import { handleAsync } from "../utils/handleAsync";

export class PermissionController {
  private permissionRepo = new PermissionRepository();

  createPermission = handleAsync(async (req, res) => {
    const permission = await this.permissionRepo.create(req.body);
    res.status(201).json(permission);
  });

  getPermissionById = handleAsync(async (req, res) => {
    const permission = await this.permissionRepo.findById(req.params.id);
    if (!permission) throw new AppError("Permission not found", 404);
    res.json(permission);
  });

  getAllPermissions = handleAsync(async (req, res) => {
    const permissions = await this.permissionRepo.findAll(req.query);
    res.json(permissions);
  });

  updatePermission = handleAsync(async (req, res) => {
    const updated = await this.permissionRepo.updateById(req.params.id, req.body);
    if (!updated) throw new AppError("Permission not found", 404);
    res.json(updated);
  });

  deletePermission = handleAsync(async (req, res) => {
    const deleted = await this.permissionRepo.deleteById(req.params.id);
    if (!deleted) throw new AppError("Permission not found", 404);
    res.status(204).send();
  });

  getPermissionsByRole = handleAsync(async (req, res) => {
    const permissions = await this.permissionRepo.findByRole(req.params.role);
    res.json(permissions);
  });

  getPermissionsBySchool = handleAsync(async (req, res) => {
    const schoolId = new Types.ObjectId(req.params.schoolId);
    const permissions = await this.permissionRepo.findBySchool(schoolId);
    res.json(permissions);
  });
}
