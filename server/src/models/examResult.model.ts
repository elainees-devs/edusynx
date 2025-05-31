//src/models/examResult.model.ts
import { Schema, model, Types } from 'mongoose';
import { IExamResult } from '../types/school/school-activity.types'; 

const examResultSchema = new Schema<IExamResult>(
  {
    school: { type: Schema.Types.ObjectId, ref: 'School', required: true },
    exam: { type: Schema.Types.ObjectId, ref: 'Exam', required: true },
    student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    subject: { type: Schema.Types.ObjectId, ref: 'Subject', required: true },
    marks: { type: Number, required: true },
    grade: { type: String, required: true },
    comments: { type: String },
  },
  {
    timestamps: true,
  }
);

export const ExamResult = model<IExamResult>('ExamResult', examResultSchema);
