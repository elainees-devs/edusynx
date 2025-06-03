//src/controllers/permission.controller.ts
import { Request, Response, NextFunction } from "express";
import { PermissionRepository } from "../repositories/permission.repository";
import { AppError } from "../utils/AppError";
import { Types } from "mongoose";

export const createPermission = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const permission = await PermissionRepository.create(req.body);
    res.status(201).json(permission);
  } catch (error) {
    next(error);
  }
};

export const getPermissionById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const permission = await PermissionRepository.findById(req.params.id);
    if (!permission) throw new AppError("Permission not found", 404);
    res.json(permission);
  } catch (error) {
    next(error);
  }
};

export const getAllPermissions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const permissions = await PermissionRepository.findAll(req.query);
    res.json(permissions);
  } catch (error) {
    next(error);
  }
};

export const updatePermission = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updated = await PermissionRepository.updateById(req.params.id, req.body);
    if (!updated) throw new AppError("Permission not found", 404);
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

export const deletePermission = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deleted = await PermissionRepository.deleteById(req.params.id);
    if (!deleted) throw new AppError("Permission not found", 404);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const getPermissionsByRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const permissions = await PermissionRepository.findByRole(req.params.role);
    res.json(permissions);
  } catch (error) {
    next(error);
  }
};

export const getPermissionsBySchool = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const schoolId = new Types.ObjectId(req.params.schoolId);
    const permissions = await PermissionRepository.findBySchool(schoolId);
    res.json(permissions);
  } catch (error) {
    next(error);
  }
};
