//src/models/attendance.model.ts
import { Schema, model, Types } from 'mongoose';
import { IAttendance } from '../types/school/school-activity.types'; 
import { AttendanceStatus } from '../types';

const attendanceSchema = new Schema<IAttendance>(
  {
    school: { type: Schema.Types.ObjectId, ref: 'School', required: true },
    classRef: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
    schoolYear: { type: String, required: true },
    date: { type: Date, required: true },
    attendance: [
      {
        studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
        status: { type: String, enum: Object.values(AttendanceStatus), required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Attendance = model<IAttendance>('Attendance', attendanceSchema);
