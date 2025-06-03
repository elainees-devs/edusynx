//src/repositories/exam.repository.ts
import { ExamModel } from "../models/exam.model";
import { IExam } from "../types/school/school-activity.types";

export class ExamRepository {
  async createExam(data: Partial<IExam>): Promise<IExam> {
    const exam = new ExamModel(data);
    return await exam.save();
  }

  async findExamById(id: string): Promise<IExam | null> {
    return await ExamModel.findById(id)
      .populate("school", "name")
      .populate("classRef", "name")
      .populate("subject", "name")
      .exec();
  }

  async findAllExams(): Promise<IExam[]> {
    return await ExamModel.find()
      .populate("school", "name")
      .populate("classRef", "name")
      .populate("subject", "name")
      .exec();
  }

  async updateExamById(id: string, updates: Partial<IExam>): Promise<IExam | null> {
    return await ExamModel.findByIdAndUpdate(id, updates, { new: true }).exec();
  }

  async deleteExamById(id: string): Promise<IExam | null> {
    return await ExamModel.findByIdAndDelete(id).exec();
  }

  async deleteAllExams(): Promise<void> {
    await ExamModel.deleteMany({}).exec();
  }
}
