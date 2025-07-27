// server/src/controllers/finance/payment.controller.ts
import { AppError } from "../../utils/AppError";
import { Types } from "mongoose";
import { handleAsync } from "../../utils/handleAsync";
import { PaymentRepository } from "../../repositories";

export class PaymentController {
  private paymentRepo = new PaymentRepository();

  createPayment = handleAsync(async (req, res) => {
    const payment = await this.paymentRepo.create(req.body);
    res.status(201).json(payment);
  });

  getPaymentById = handleAsync(async (req, res) => {
    const payment = await this.paymentRepo.findById(req.params.id);
    if (!payment) throw new AppError("Payment not found", 404);
    res.json(payment);
  });

  getAllPayments = handleAsync(async (req, res) => {
    const payments = await this.paymentRepo.findAll(req.query);
    res.json(payments);
  });

  updatePayment = handleAsync(async (req, res) => {
    const updated = await this.paymentRepo.updateById(req.params.id, req.body);
    if (!updated) throw new AppError("Payment not found", 404);
    res.json(updated);
  });

  deletePayment = handleAsync(async (req, res) => {
    const deleted = await this.paymentRepo.deleteById(req.params.id);
    if (!deleted) throw new AppError("Payment not found", 404);
    res.status(204).send();
  });

  getPaymentsByStudent = handleAsync(async (req, res) => {
    const studentId = new Types.ObjectId(req.params.studentId);
    const payments = await this.paymentRepo.findByStudent(studentId);
    res.json(payments);
  });

  getPaymentsByInvoice = handleAsync(async (req, res) => {
    const invoiceId = new Types.ObjectId(req.params.invoiceId);
    const payments = await this.paymentRepo.findByInvoice(invoiceId);
    res.json(payments);
  });
}
