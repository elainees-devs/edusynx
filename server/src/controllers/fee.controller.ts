// src/controllers/fee.controller.ts
import { Request, Response, NextFunction } from "express";
import { FeeRepository } from "../repositories/fee.repository";
import { AppError } from "../utils/AppError";
import { handleAsync } from "../utils/handleAsync";

const feeRepo = new FeeRepository();

export const createFee = handleAsync(async (req: Request, res: Response) => {
  const newFee = await feeRepo.createFee(req.body);
  res.status(201).json(newFee);
});

export const getFeesBySchool = handleAsync<{ schoolId: string }>(async (req, res) => {
  const { schoolId } = req.params;
  if (!schoolId) throw new AppError("schoolId parameter is required", 400);

  const fees = await feeRepo.getFeesBySchool(schoolId);
  res.json(fees);
});

export const getFeeById = handleAsync<{ id: string }>(async (req, res) => {
  const fee = await feeRepo.getFeeById(req.params.id);
  if (!fee) throw new AppError("Fee not found", 404);
  res.json(fee);
});

export const updateFee = handleAsync<{ id: string }>(async (req, res) => {
  const updatedFee = await feeRepo.updateFee(req.params.id, req.body);
  if (!updatedFee) throw new AppError("Fee not found", 404);
  res.json(updatedFee);
});

export const deleteFee = handleAsync<{ id: string }>(async (req, res) => {
  const deletedFee = await feeRepo.deleteFee(req.params.id);
  if (!deletedFee) throw new AppError("Fee not found", 404);
  res.status(204).send();
});
