// client/src/types/school/attendance.types.ts
export type AttendanceStatus = "present" | "absent" | "excused" | "late";


export interface IStudentAttendance {
  studentId: string;             // MongoDB ObjectId of the student
  name?: string;                 // Optional: student name for display
  status: AttendanceStatus;      // Current attendance status
  updatedAt?: string;            // ISO timestamp of last update
  notes?: string;                // Optional: any remarks about this student's attendance

}

export interface IAttendance {
    _id?: string;                  // MongoDB ObjectId of the attendance record
    school: string;                // MongoDB ObjectId of the school
    classRef: string;              // MongoDB ObjectId of the class
    schoolYear: string;            // Academic year (e.g., "2023-2024")
    date: string;                  // ISO date string for the attendance date
    records: IStudentAttendance[]; // Array of student attendance records
    createdAt?: string;            // ISO timestamp of record creation
    updatedAt?: string;            // ISO timestamp of last update
    }