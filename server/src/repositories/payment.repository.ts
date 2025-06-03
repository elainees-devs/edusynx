//src/repositories/payment.repository.ts
import { PaymentModel } from '../models/payment.model';
import { IPayment } from '../types/finance/finance.types';
import { Types } from 'mongoose';

export class PaymentRepository {
    static async create(paymentData: Partial<IPayment>): Promise<IPayment> {
        const payment = new PaymentModel(paymentData);
        return payment.save();
    }

    static async findById(id: string): Promise<IPayment | null> {
        return PaymentModel.findById(id)
            .populate('student')
            .populate('fee')
            .populate('invoice')
            .populate('school')
            .populate('verifiedBy')
            .exec();
    }

    static async findAll(filter: Partial<IPayment> = {}): Promise<IPayment[]> {
        return PaymentModel.find(filter)
            .populate('student')
            .populate('fee')
            .populate('invoice')
            .populate('school')
            .populate('verifiedBy')
            .exec();
    }

    static async updateById(id: string, updateData: Partial<IPayment>): Promise<IPayment | null> {
        return PaymentModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
    }

    static async deleteById(id: string): Promise<IPayment | null> {
        return PaymentModel.findByIdAndDelete(id).exec();
    }

    static async findByStudent(studentId: Types.ObjectId): Promise<IPayment[]> {
        return PaymentModel.find({ student: studentId }).exec();
    }

    static async findByInvoice(invoiceId: Types.ObjectId): Promise<IPayment[]> {
        return PaymentModel.find({ invoice: invoiceId }).exec();
    }
}
