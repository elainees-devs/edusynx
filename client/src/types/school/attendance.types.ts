// client/src/types/school/attendance.types.ts
export const AttendanceStatus = {
  PRESENT: "present",
  ABSENT: "absent",
  EXCUSED: "excused",
  LATE: "late",
} as const;

export type AttendanceStatus = typeof AttendanceStatus[keyof typeof AttendanceStatus];

export interface IAttendanceEntry {
  _id?: string;
  studentId: {
    _id: string;
    studentFirstName: string;
    studentLastName: string;
  } | string;
  status: typeof AttendanceStatus[keyof typeof AttendanceStatus];
}

export interface IAttendance {
  _id?: string;
  school: string;
  classRef: string;
  streamId: string;
  schoolYear: string;
  date: string;
  attendance: IAttendanceEntry[];
}