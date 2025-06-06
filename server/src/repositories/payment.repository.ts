//src/repositories/payment.repository.ts
import { PaymentModel } from "../models/payment.model";
import { IPayment } from "../types/finance/finance.types";
import { Types } from "mongoose";

export class PaymentRepository {
  async create(paymentData: Partial<IPayment>): Promise<IPayment> {
    const payment = new PaymentModel(paymentData);
    return payment.save();
  }

  async findById(id: string): Promise<IPayment | null> {
    return PaymentModel.findById(id)
      .populate("student")
      .populate("fee")
      .populate("invoice")
      .populate("school")
      .populate("verifiedBy")
      .exec();
  }

  async findAll(filter: Partial<IPayment> = {}): Promise<IPayment[]> {
    return PaymentModel.find(filter)
      .populate("student")
      .populate("fee")
      .populate("invoice")
      .populate("school")
      .populate("verifiedBy")
      .exec();
  }

  async updateById(
    id: string,
    updateData: Partial<IPayment>
  ): Promise<IPayment | null> {
    return PaymentModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  async deleteById(id: string): Promise<IPayment | null> {
    return PaymentModel.findByIdAndDelete(id).exec();
  }

  async findByStudent(studentId: Types.ObjectId): Promise<IPayment[]> {
    return PaymentModel.find({ student: studentId }).exec();
  }

  async findByInvoice(invoiceId: Types.ObjectId): Promise<IPayment[]> {
    return PaymentModel.find({ invoice: invoiceId }).exec();
  }
}
