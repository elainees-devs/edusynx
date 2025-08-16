// server/src/models/people/student.model.ts
import { Schema, model} from 'mongoose';
import { Gender, StudentStatus } from '../../types/enum/enum';
import { IStudent } from '../../types';

const studentSchema = new Schema<IStudent>(
  {
    school: { type: Schema.Types.ObjectId, ref: 'School', required: true },
    studentFirstName: { type: String, required: true },
    studentMiddleName: { type: String, required: true },
    studentLastName: { type: String, required: true },
    studentGender: { type: String, enum: Object.values (Gender), required: true },
    dateOfBirth: { type: Date, required: true },
    adm: { type: Number, unique: true},
    admissionDate: { type: Date, required: true },
    previousSchool: { type: String },
    guardian: { type: Schema.Types.ObjectId, ref: 'User'},
    classId: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
    stream: { type: Schema.Types.ObjectId, ref: 'Stream', required: true },
    status: { type: String, enum: Object.values(StudentStatus), required: true },
    studentId: { type: String, unique: true },
    studentPhotoUrl: { type: String },
  },
  {
    timestamps: true,
  }
);

// Individual field index
studentSchema.index({ guardian: 1 });

// Compound index for performance optimization (e.g., class list filters)
studentSchema.index({ school: 1, classId: 1, stream: 1, status: 1 });


export const StudentModel = model<IStudent>('Student', studentSchema);