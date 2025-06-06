// src/controllers/rolePermission.controller.ts
import { RolePermissionRepository } from "../repositories/rolePermission.repository";
import { AppError } from "../utils/AppError";
import { Types } from "mongoose";
import { handleAsync } from "../utils/handleAsync";

const rolePermissionRepo = new RolePermissionRepository();

export const createRolePermission = handleAsync(async (req, res) => {
  const rolePermission = await rolePermissionRepo.create(req.body);
  res.status(201).json(rolePermission);
});

export const getRolePermissionById = handleAsync(async (req, res) => {
  const rolePermission = await rolePermissionRepo.findById(req.params.id);
  if (!rolePermission) throw new AppError("Role permission not found", 404);
  res.json(rolePermission);
});

export const getAllRolePermissions = handleAsync(async (req, res) => {
  const rolePermissions = await rolePermissionRepo.findAll(req.query);
  res.json(rolePermissions);
});

export const updateRolePermission = handleAsync(async (req, res) => {
  const updated = await rolePermissionRepo.updateById(req.params.id, req.body);
  if (!updated) throw new AppError("Role permission not found", 404);
  res.json(updated);
});

export const deleteRolePermission = handleAsync(async (req, res) => {
  const deleted = await rolePermissionRepo.deleteById(req.params.id);
  if (!deleted) throw new AppError("Role permission not found", 404);
  res.status(204).send();
});

export const getRolePermissionsByRoleId = handleAsync(async (req, res) => {
  const roleId = new Types.ObjectId(req.params.roleId);
  const rolePermissions = await rolePermissionRepo.findByRoleId(roleId);
  res.json(rolePermissions);
});

export const getRolePermissionsByPermissionId = handleAsync(async (req, res) => {
  const permissionId = new Types.ObjectId(req.params.permissionId);
  const rolePermissions = await rolePermissionRepo.findByPermissionId(permissionId);
  res.json(rolePermissions);
});

export const getRolePermissionsBySchool = handleAsync(async (req, res) => {
  const schoolId = new Types.ObjectId(req.params.schoolId);
  const rolePermissions = await rolePermissionRepo.findBySchool(schoolId);
  res.json(rolePermissions);
});
