//src/models/exam.model.ts
import { Schema, model} from "mongoose";
import { IExam} from "../types/school/school-activity.types"; 
import { ExamType, Term } from "../types";

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

export const Exam = model<IExam>('Exam', examSchema);