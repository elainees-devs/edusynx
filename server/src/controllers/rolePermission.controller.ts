//src/controllers/rolePermission.controller.ts
import { Request, Response, NextFunction } from "express";
import { RolePermissionRepository } from "../repositories/rolePermission.repository";
import { AppError } from "../utils/AppError";
import { Types } from "mongoose";

export const createRolePermission = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const rolePermission = await RolePermissionRepository.create(req.body);
    res.status(201).json(rolePermission);
  } catch (error) {
    next(error);
  }
};

export const getRolePermissionById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const rolePermission = await RolePermissionRepository.findById(req.params.id);
    if (!rolePermission) throw new AppError("Role permission not found", 404);
    res.json(rolePermission);
  } catch (error) {
    next(error);
  }
};

export const getAllRolePermissions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const rolePermissions = await RolePermissionRepository.findAll(req.query);
    res.json(rolePermissions);
  } catch (error) {
    next(error);
  }
};

export const updateRolePermission = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updated = await RolePermissionRepository.updateById(req.params.id, req.body);
    if (!updated) throw new AppError("Role permission not found", 404);
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

export const deleteRolePermission = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deleted = await RolePermissionRepository.deleteById(req.params.id);
    if (!deleted) throw new AppError("Role permission not found", 404);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const getRolePermissionsByRoleId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const roleId = new Types.ObjectId(req.params.roleId);
    const rolePermissions = await RolePermissionRepository.findByRoleId(roleId);
    res.json(rolePermissions);
  } catch (error) {
    next(error);
  }
};

export const getRolePermissionsByPermissionId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const permissionId = new Types.ObjectId(req.params.permissionId);
    const rolePermissions = await RolePermissionRepository.findByPermissionId(permissionId);
    res.json(rolePermissions);
  } catch (error) {
    next(error);
  }
};

export const getRolePermissionsBySchool = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const schoolId = new Types.ObjectId(req.params.schoolId);
    const rolePermissions = await RolePermissionRepository.findBySchool(schoolId);
    res.json(rolePermissions);
  } catch (error) {
    next(error);
  }
};
