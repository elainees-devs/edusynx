//src/repositories/invoice.repository.ts
import mongoose from "mongoose";
import { IInvoice } from "../types/finance/finance.types";
import { CounterModel, InvoiceModel } from "../models";
import { CreateInvoiceDTO } from "../dto/entity.dto";


export class InvoiceRepository {
  // Helper to resolve ObjectId from string or object
  private getSchoolId(
    school:
      | mongoose.Types.ObjectId
      | string
      | { _id: mongoose.Types.ObjectId | string }
  ): mongoose.Types.ObjectId {
    if (typeof school === "string") {
      return new mongoose.Types.ObjectId(school);
    }

    if (school instanceof mongoose.Types.ObjectId) {
      return school;
    }

    return new mongoose.Types.ObjectId(school._id);
  }

  async createInvoice(invoiceData: CreateInvoiceDTO): Promise<IInvoice> {
    const schoolId = this.getSchoolId(invoiceData.school);
    const invoiceNumber = await this.generateInvoiceNumber(schoolId);

    const invoice = new InvoiceModel({
      ...invoiceData,
      school: schoolId,
      invoiceNumber,
    });

    return await invoice.save();
  }

  // Atomic counter-based invoice number generator
  private async generateInvoiceNumber(
    schoolId: mongoose.Types.ObjectId
  ): Promise<string> {
    const counter = await CounterModel.findOneAndUpdate(
      { schoolId },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    const nextNumber = counter.seq;
    return `INV-${schoolId.toString().slice(-4)}-${nextNumber
      .toString()
      .padStart(5, "0")}`;
  }

  async getInvoiceById(invoiceId: string): Promise<IInvoice | null> {
    return await InvoiceModel.findById(invoiceId);
  }

  async updateInvoice(
    invoiceId: string,
    updateData: CreateInvoiceDTO
  ): Promise<IInvoice | null> {
    const schoolId = this.getSchoolId(updateData.school);
    return await InvoiceModel.findByIdAndUpdate(
      invoiceId,
      { ...updateData, school: schoolId },
      { new: true }
    );
  }

  async deleteInvoice(invoiceId: string): Promise<IInvoice | null> {
    return await InvoiceModel.findByIdAndDelete(invoiceId);
  }

  async getAllInvoices(filter: Partial<IInvoice> = {}): Promise<IInvoice[]> {
    return await InvoiceModel.find(filter);
  }

  async deleteAllInvoices(): Promise<void> {
    await InvoiceModel.deleteMany({});
  }
}
