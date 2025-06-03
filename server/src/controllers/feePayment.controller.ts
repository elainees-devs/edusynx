// src/controllers/feePayment.controller.ts
import { Request, Response, NextFunction } from "express";
import { FeePaymentRepository } from "../repositories/feePayment.repository";
import { AppError } from "../utils/AppError";

const feePaymentRepo = new FeePaymentRepository();

export const createFeePaymentSummary = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const summary = await feePaymentRepo.createFeePaymentSummary(req.body);
    res.status(201).json(summary);
  } catch (error) {
    next(error);
  }
};

export const getAllFeePaymentSummaries = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const summaries = await feePaymentRepo.getAllFeePaymentSummaries();
    res.json(summaries);
  } catch (error) {
    next(error);
  }
};

export const getFeePaymentSummaryById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const summary = await feePaymentRepo.getFeePaymentSummaryById(req.params.id);
    if (!summary) throw new AppError("Fee payment summary not found", 404);
    res.json(summary);
  } catch (error) {
    next(error);
  }
};

export const getFeePaymentSummariesByStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const summaries = await feePaymentRepo.getFeePaymentSummariesByStudent(req.params.studentId);
    res.json(summaries);
  } catch (error) {
    next(error);
  }
};

export const updateFeePaymentSummary = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updated = await feePaymentRepo.updateFeePaymentSummary(req.params.id, req.body);
    if (!updated) throw new AppError("Fee payment summary not found", 404);
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

export const deleteFeePaymentSummary = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deleted = await feePaymentRepo.deleteFeePaymentSummary(req.params.id);
    if (!deleted) throw new AppError("Fee payment summary not found", 404);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const calculateTotalFeesPaidByStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const total = await feePaymentRepo.calculateTotalFeesPaidByStudent(req.params.studentId);
    res.json({ studentId: req.params.studentId, totalPaid: total });
  } catch (error) {
    next(error);
  }
};

export const calculateTotalFeesPaidByAllStudents = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const total = await feePaymentRepo.calculateTotalFeesPaidByAllStudents();
    res.json({ totalPaid: total });
  } catch (error) {
    next(error);
  }
};

export const addPaymentToSummary = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await feePaymentRepo.addPaymentToSummary(req.body);
    res.status(200).json({ message: "Payment added successfully" });
  } catch (error) {
    next(error);
  }
};
