// src/repositories/feePayment.repository.ts
import { FeePaymentSummaryModel } from "../models/feePayment.model";
import { IFeePaymentSummary } from "../types/finance/finance.types";
import mongoose from "mongoose";

export class FeePaymentRepository {
  async createFeePaymentSummary(data: IFeePaymentSummary): Promise<IFeePaymentSummary> {
    const summary = new FeePaymentSummaryModel(data);
    return await summary.save();
  }

  async getAllFeePaymentSummaries(): Promise<IFeePaymentSummary[]> {
    return await FeePaymentSummaryModel.find()
      .populate("student")
      .populate("fee")
      .populate("payments");
  }

  async getFeePaymentSummaryById(id: string): Promise<IFeePaymentSummary | null> {
    return await FeePaymentSummaryModel.findById(id)
      .populate("student")
      .populate("fee")
      .populate("payments");
  }

  async getFeePaymentSummariesByStudent(studentId: string): Promise<IFeePaymentSummary[]> {
    return await FeePaymentSummaryModel.find({ student: studentId })
      .populate("fee")
      .populate("payments");
  }

  async updateFeePaymentSummary(id: string, updateData: Partial<IFeePaymentSummary>): Promise<IFeePaymentSummary | null> {
    return await FeePaymentSummaryModel.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteFeePaymentSummary(id: string): Promise<IFeePaymentSummary | null> {
    return await FeePaymentSummaryModel.findByIdAndDelete(id);
  }

  // Calculate total amount paid by a specific student
  async calculateTotalFeesPaidByStudent(studentId: string): Promise<number> {
    const result = await FeePaymentSummaryModel.aggregate([
      { $match: { student: new mongoose.Types.ObjectId(studentId) } },
      {
        $group: {
          _id: "$student",
          totalPaid: { $sum: "$totalPaid" },
        },
      },
    ]);

    return result[0]?.totalPaid || 0;
  }

  // Calculate total amount paid by all students
  async calculateTotalFeesPaidByAllStudents(): Promise<number> {
    const result = await FeePaymentSummaryModel.aggregate([
      {
        $group: {
          _id: null,
          totalPaid: { $sum: "$totalPaid" },
        },
      },
    ]);

    return result[0]?.totalPaid || 0;
  }
}
