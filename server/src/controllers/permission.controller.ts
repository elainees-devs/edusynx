// src/controllers/permission.controller.ts
import { PermissionRepository } from "../repositories/permission.repository";
import { AppError } from "../utils/AppError";
import { Types } from "mongoose";
import { handleAsync } from "../utils/handleAsync";

const permissionRepo = new PermissionRepository();

export const createPermission = handleAsync(async (req, res) => {
  const permission = await permissionRepo.create(req.body);
  res.status(201).json(permission);
});

export const getPermissionById = handleAsync(async (req, res) => {
  const permission = await permissionRepo.findById(req.params.id);
  if (!permission) throw new AppError("Permission not found", 404);
  res.json(permission);
});

export const getAllPermissions = handleAsync(async (req, res) => {
  const permissions = await permissionRepo.findAll(req.query);
  res.json(permissions);
});

export const updatePermission = handleAsync(async (req, res) => {
  const updated = await permissionRepo.updateById(req.params.id, req.body);
  if (!updated) throw new AppError("Permission not found", 404);
  res.json(updated);
});

export const deletePermission = handleAsync(async (req, res) => {
  const deleted = await permissionRepo.deleteById(req.params.id);
  if (!deleted) throw new AppError("Permission not found", 404);
  res.status(204).send();
});

export const getPermissionsByRole = handleAsync(async (req, res) => {
  const permissions = await permissionRepo.findByRole(req.params.role);
  res.json(permissions);
});

export const getPermissionsBySchool = handleAsync(async (req, res) => {
  const schoolId = new Types.ObjectId(req.params.schoolId);
  const permissions = await permissionRepo.findBySchool(schoolId);
  res.json(permissions);
});
