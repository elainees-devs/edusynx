// server/src/models/people/student.model.ts
import { Schema, model} from 'mongoose';
import { Gender, StudentStatus } from '../../types/enum/enum';
import { IStudent, IStatusChange } from '../../types';

const statusChangeSchema = new Schema<IStatusChange>(
  {
    action: { type: String, enum: ["admitted", "promoted", "transferred", "graduated"], required: true },
    fromClass: { type: Schema.Types.ObjectId, ref: "Class" },
    toClass: { type: Schema.Types.ObjectId, ref: "Class" },
    fromStream: { type: Schema.Types.ObjectId, ref: "Stream" },
    toStream: { type: Schema.Types.ObjectId, ref: "Stream" },
    academicYear: { type: String },
    reason: { type: String },
    date: { type: Date, default: Date.now },
  },
  { _id: true }
);

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
    guardians: [{ type: Schema.Types.ObjectId, ref: 'User'}],
    classId: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
    stream: { type: Schema.Types.ObjectId, ref: 'Stream', required: true },
    status: { type: String, enum: Object.values(StudentStatus), required: true },
    studentId: { type: String, unique: true },
    studentPhotoUrl: { type: String },
    history: { type: [statusChangeSchema], default: [] },
  },
  {
    timestamps: true,
  }
);

// Individual field index
studentSchema.index({ guardians: 1 });

// Compound index for performance optimization (e.g., class list filters)
studentSchema.index({ school: 1, classId: 1, status: 1 });

// Text index for search
studentSchema.index({
  studentFirstName: "text",
  studentMiddleName: "text",
  studentLastName: "text",
  studentId: "text",
});


export const StudentModel = model<IStudent>('Student', studentSchema);