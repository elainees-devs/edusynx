// server/src/models/academics/exam.model.ts
import { Schema, model } from "mongoose";
import { ExamType, IExam, Term } from "../../types";

const examSchema = new Schema<IExam>(
  {
    school: { type: Schema.Types.ObjectId, ref: 'School', required: true },
    examName: { type: String, required: true },
    classRef: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
    subject: { type: Schema.Types.ObjectId, ref: 'Subject', required: true },
    examDate: { type: Date, required: true },
    academicYear: { type: String, required: true },
    term: { type: String, enum: Object.values(Term), required: true },
    examType: { type: String, enum: Object.values(ExamType), required: true },
  },
  {
    timestamps: true,
  }
);

// Indexes
examSchema.index({ school: 1, academicYear: 1, term: 1 });
examSchema.index({ classRef: 1, subject: 1, academicYear: 1, term: 1 });
examSchema.index({ school: 1, classRef: 1, subject: 1, examType: 1, academicYear: 1, term: 1 }, { unique: true });

export const ExamModel = model<IExam>('Exam', examSchema);
