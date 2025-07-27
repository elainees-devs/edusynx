// server/src/repositories/academics/examResult.repository.ts
import { ExamResultModel } from "../../models/academics/examResult.model";
import { IExamResult } from "../../types";


export class ExamResultRepository {
  async createExamResult(data: Partial<IExamResult>): Promise<IExamResult> {
    const result = new ExamResultModel(data);
    return await result.save();
  }

  async findResultsByStudent(studentId: string): Promise<IExamResult[]> {
    return await ExamResultModel.find({ student: studentId })
      .populate("exam")
      .populate("subject")
      .exec();
  }

  async findResultsByExam(examId: string): Promise<IExamResult[]> {
    return await ExamResultModel.find({ exam: examId })
      .populate("student")
      .populate("subject")
      .exec();
  }

  async updateExamResult(resultId: string, updates: Partial<IExamResult>): Promise<IExamResult | null> {
    return await ExamResultModel.findByIdAndUpdate(resultId, updates, { new: true }).exec();
  }

  async deleteExamResult(resultId: string): Promise<IExamResult | null> {
    return await ExamResultModel.findByIdAndDelete(resultId).exec();
  }

  //Total and Mean Marks by Student for a Given Exam
  async getStudentExamStats(studentId: string, examId: string): Promise<{ totalMarks: number, meanMarks: number }> {
    const results = await ExamResultModel.find({ student: studentId, exam: examId }).exec();

    const totalMarks = results.reduce((sum, result) => sum + result.marks, 0);
    const meanMarks = results.length > 0 ? totalMarks / results.length : 0;

    return { totalMarks, meanMarks };
  }
}
