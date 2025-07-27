// server/src/repositories/academics/fee.repository.ts
import { Types } from "mongoose";       
import { IFee } from "../../types";
import { FeeModel } from "../../models";

export class FeeRepository {
  async createFee(feeData: IFee): Promise<IFee> {
    const fee = new FeeModel(feeData);
    return await fee.save();
  }

  async getFeesBySchool(schoolId: string): Promise<IFee[]> {
    return await FeeModel.find({ school: new Types.ObjectId(schoolId) })
      .populate('classId')
      .exec();
  }

  async getFeeById(feeId: string): Promise<IFee | null> {
    return await FeeModel.findById(feeId)
      .populate('classId')
      .exec();
  }

  async updateFee(feeId: string, updateData: Partial<IFee>): Promise<IFee | null> {
    return await FeeModel.findByIdAndUpdate(feeId, updateData, { new: true })
      .populate('classId')
      .exec();
  }

  async deleteFee(feeId: string): Promise<IFee | null> {
    return await FeeModel.findByIdAndDelete(feeId).exec();
  }
}