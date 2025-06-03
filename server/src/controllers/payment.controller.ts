//src/controllers/payment.controller.ts
import { Request, Response, NextFunction } from "express";
import { PaymentRepository } from "../repositories/payment.repository";
import { AppError } from "../utils/AppError";
import { Types } from "mongoose";

export const createPayment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payment = await PaymentRepository.create(req.body);
    res.status(201).json(payment);
  } catch (error) {
    next(error);
  }
};

export const getPaymentById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payment = await PaymentRepository.findById(req.params.id);
    if (!payment) throw new AppError("Payment not found", 404);
    res.json(payment);
  } catch (error) {
    next(error);
  }
};

export const getAllPayments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payments = await PaymentRepository.findAll(req.query);
    res.json(payments);
  } catch (error) {
    next(error);
  }
};

export const updatePayment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updated = await PaymentRepository.updateById(req.params.id, req.body);
    if (!updated) throw new AppError("Payment not found", 404);
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

export const deletePayment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deleted = await PaymentRepository.deleteById(req.params.id);
    if (!deleted) throw new AppError("Payment not found", 404);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const getPaymentsByStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const studentId = new Types.ObjectId(req.params.studentId);
    const payments = await PaymentRepository.findByStudent(studentId);
    res.json(payments);
  } catch (error) {
    next(error);
  }
};

export const getPaymentsByInvoice = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const invoiceId = new Types.ObjectId(req.params.invoiceId);
    const payments = await PaymentRepository.findByInvoice(invoiceId);
    res.json(payments);
  } catch (error) {
    next(error);
  }
};
