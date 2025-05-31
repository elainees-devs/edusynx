//src/models/student.model.ts
import { Schema, model, Types } from 'mongoose';
import { IStudent } from '../types/people/student.types';
import { StudentGender, StudentStatus } from '../types/enum/enum';

const studentSchema = new Schema<IStudent>(
  {
    school: { type: Schema.Types.ObjectId, ref: 'School', required: true },
    firstName: { type: String, required: true },
    middleName: { type: String, required: true },
    lastName: { type: String, required: true },
    studentGender: { type: String, enum: Object.values(StudentGender), required: true },
    dateOfBirth: { type: Date, required: true },
    adm: { type: Number, required: true, unique: true },
    admissionDate: { type: Date, required: true },
    previousSchool: { type: String },
    guardian: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    classId: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
    status: { type: String, enum: Object.values(StudentStatus), required: true },
    studentId: { type: String }, 
  },
  {
    timestamps: true,
  }
);

export const Student = model<IStudent>('Student', studentSchema);
