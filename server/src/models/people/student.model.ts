// server/src/models/people/student.model.ts
import { Schema, model} from 'mongoose';
import { StudentGender, StudentStatus } from '../../types/enum/enum';
import { IStudent } from '../../types';

const studentSchema = new Schema<IStudent>(
  {
    school: { type: Schema.Types.ObjectId, ref: 'School', required: true },
    studentFirstName: { type: String, required: true },
    studentMiddleName: { type: String, required: true },
    studentLastName: { type: String, required: true },
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

export const StudentModel = model<IStudent>('Student', studentSchema);