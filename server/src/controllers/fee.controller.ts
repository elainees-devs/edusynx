// src/controllers/fee.controller.ts
import { Request, Response, NextFunction } from "express";
import { FeeRepository } from "../repositories/fee.repository";
import { AppError } from "../utils/AppError";

const feeRepo = new FeeRepository();

export const createFee = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newFee = await feeRepo.createFee(req.body);
    res.status(201).json(newFee);
  } catch (error) {
    next(error);
  }
};

export const getFeesBySchool = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { schoolId } = req.params;
    if (!schoolId) throw new AppError("schoolId parameter is required", 400);

    const fees = await feeRepo.getFeesBySchool(schoolId);
    res.json(fees);
  } catch (error) {
    next(error);
  }
};

export const getFeeById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const fee = await feeRepo.getFeeById(req.params.id);
    if (!fee) throw new AppError("Fee not found", 404);
    res.json(fee);
  } catch (error) {
    next(error);
  }
};

export const updateFee = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedFee = await feeRepo.updateFee(req.params.id, req.body);
    if (!updatedFee) throw new AppError("Fee not found", 404);
    res.json(updatedFee);
  } catch (error) {
    next(error);
  }
};

export const deleteFee = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deletedFee = await feeRepo.deleteFee(req.params.id);
    if (!deletedFee) throw new AppError("Fee not found", 404);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
