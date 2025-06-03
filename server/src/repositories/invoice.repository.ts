//src/repositories/invoice.repository.ts
import { IInvoice } from '../types/finance/finance.types';
import { InvoiceModel } from '../models/invoice.model';
import { CreateInvoiceDTO } from '../dto/entity.dto';
        

export class InvoiceRepository {
    async createInvoice(invoiceData: CreateInvoiceDTO): Promise<IInvoice> {
        const invoice = new InvoiceModel(invoiceData);
        return await invoice.save();
    }
    async getInvoiceById(invoiceId: string): Promise<IInvoice | null> {         
        return await InvoiceModel.findById(invoiceId)
            .populate('student')
            .populate('school')
            .populate('classId')
            .populate('items.fee')
            .populate('paymentHistory');
    }
    async updateInvoice(invoiceId: string, updateData: CreateInvoiceDTO): Promise<IInvoice | null> {
        return await InvoiceModel.findByIdAndUpdate(invoiceId, updateData, { new: true })
            .populate('student')
            .populate('school')
            .populate('classId')
            .populate('items.fee')
            .populate('paymentHistory');
    }
    async deleteInvoice(invoiceId: string): Promise<IInvoice | null> {
        return await InvoiceModel.findByIdAndDelete(invoiceId)
            .populate('student')
            .populate('school')
            .populate('classId')
            .populate('items.fee')
            .populate('paymentHistory');
    }
    async getAllInvoices(): Promise<IInvoice[]> {
        return await InvoiceModel.find()
            .populate('student')
            .populate('school')
            .populate('classId')
            .populate('items.fee')
            .populate('paymentHistory');
    }

    async deleteAllInvoices(): Promise<void> {
        await InvoiceModel.deleteMany({});
    }
}