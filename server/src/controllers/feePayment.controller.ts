// src/controllers/feePayment.controller.ts
import { FeePaymentRepository } from "../repositories/feePayment.repository";
import { AppError } from "../utils/AppError";
import { handleAsync } from "../utils/handleAsync";

const feePaymentRepo = new FeePaymentRepository();

export class FeePaymentController {
  createFeePaymentSummary = handleAsync(async (req, res) => {
    const summary = await feePaymentRepo.createFeePaymentSummary(req.body);
    res.status(201).json(summary);
  });

  getAllFeePaymentSummaries = handleAsync(async (_req, res) => {
    const summaries = await feePaymentRepo.getAllFeePaymentSummaries();
    res.json(summaries);
  });

  getFeePaymentSummaryById = handleAsync<{ id: string }>(async (req, res) => {
    const summary = await feePaymentRepo.getFeePaymentSummaryById(req.params.id);
    if (!summary) throw new AppError("Fee payment summary not found", 404);
    res.json(summary);
  });

  getFeePaymentSummariesByStudent = handleAsync<{ studentId: string }>(async (req, res) => {
    const summaries = await feePaymentRepo.getFeePaymentSummariesByStudent(req.params.studentId);
    res.json(summaries);
  });

  updateFeePaymentSummary = handleAsync<{ id: string }, any, Partial<any>>(async (req, res) => {
    const updated = await feePaymentRepo.updateFeePaymentSummary(req.params.id, req.body);
    if (!updated) throw new AppError("Fee payment summary not found", 404);
    res.json(updated);
  });

  deleteFeePaymentSummary = handleAsync<{ id: string }>(async (req, res) => {
    const deleted = await feePaymentRepo.deleteFeePaymentSummary(req.params.id);
    if (!deleted) throw new AppError("Fee payment summary not found", 404);
    res.status(204).send();
  });

  calculateTotalFeesPaidByStudent = handleAsync<{ studentId: string }>(async (req, res) => {
    const total = await feePaymentRepo.calculateTotalFeesPaidByStudent(req.params.studentId);
    res.json({ studentId: req.params.studentId, totalPaid: total });
  });

  calculateTotalFeesPaidByAllStudents = handleAsync(async (_req, res) => {
    const total = await feePaymentRepo.calculateTotalFeesPaidByAllStudents();
    res.json({ totalPaid: total });
  });

  addPaymentToSummary = handleAsync(async (req, res) => {
    await feePaymentRepo.addPaymentToSummary(req.body);
    res.status(200).json({ message: "Payment added successfully" });
  });
}
