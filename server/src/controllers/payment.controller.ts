// src/controllers/payment.controller.ts
import { PaymentRepository } from "../repositories/payment.repository";
import { AppError } from "../utils/AppError";
import { Types } from "mongoose";
import { handleAsync } from "../utils/handleAsync";

const paymentRepo = new PaymentRepository();

export const createPayment = handleAsync(async (req, res) => {
  const payment = await paymentRepo.create(req.body);
  res.status(201).json(payment);
});

export const getPaymentById = handleAsync(async (req, res) => {
  const payment = await paymentRepo.findById(req.params.id);
  if (!payment) throw new AppError("Payment not found", 404);
  res.json(payment);
});

export const getAllPayments = handleAsync(async (req, res) => {
  const payments = await paymentRepo.findAll(req.query);
  res.json(payments);
});

export const updatePayment = handleAsync(async (req, res) => {
  const updated = await paymentRepo.updateById(req.params.id, req.body);
  if (!updated) throw new AppError("Payment not found", 404);
  res.json(updated);
});

export const deletePayment = handleAsync(async (req, res) => {
  const deleted = await paymentRepo.deleteById(req.params.id);
  if (!deleted) throw new AppError("Payment not found", 404);
  res.status(204).send();
});

export const getPaymentsByStudent = handleAsync(async (req, res) => {
  const studentId = new Types.ObjectId(req.params.studentId);
  const payments = await paymentRepo.findByStudent(studentId);
  res.json(payments);
});

export const getPaymentsByInvoice = handleAsync(async (req, res) => {
  const invoiceId = new Types.ObjectId(req.params.invoiceId);
  const payments = await paymentRepo.findByInvoice(invoiceId);
  res.json(payments);
});
