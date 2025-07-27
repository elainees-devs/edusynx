// server/src/models/academics/attendance.model.ts
import { Schema, model} from 'mongoose';
import { AttendanceStatus, IAttendance } from '../../types';

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
//Indexes
attendanceSchema.index({ classRef: 1, date: 1 }); // For daily class queries
attendanceSchema.index({ school: 1 });            // For school-wide queries
attendanceSchema.index({ schoolYear: 1 });        // Optional: year-based reporting

export const AttendanceModel = model<IAttendance>('Attendance', attendanceSchema);
