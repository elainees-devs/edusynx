// server/src/services/attendance.service.ts

import { IAttendance } from "../types/school/school-activity.types";
import { AttendanceStatus } from "../types/enum/enum";

export interface AttendanceSummary {
  totalStudents: number;
  present: number;
  absent: number;
  late: number;
  excused: number;
  attendanceRate: number;
}

export interface StudentAttendanceSummary {
  studentId: string;
  totalDays: number;
  present: number;
  absent: number;
  late: number;
  excused: number;
  attendanceRate: number;
}

export interface AttendanceTrend {
  date: string;
  attendanceRate: number;
  present: number;
  absent: number;
  late: number;
  excused: number;
}

export class AttendanceService {
  /**
   * Calculate summary for a single attendance record
   */
  calculateAttendanceSummary(
    attendanceRecord: IAttendance
  ): AttendanceSummary {
    const totalStudents = attendanceRecord.attendance.length;

    const present = attendanceRecord.attendance.filter(
      (entry) => entry.status === AttendanceStatus.PRESENT
    ).length;

    const absent = attendanceRecord.attendance.filter(
      (entry) => entry.status === AttendanceStatus.ABSENT
    ).length;

    const late = attendanceRecord.attendance.filter(
      (entry) => entry.status === AttendanceStatus.LATE
    ).length;

    const excused = attendanceRecord.attendance.filter(
      (entry) => entry.status === AttendanceStatus.EXCUSED
    ).length;

    const attendanceRate =
      totalStudents > 0
        ? Number(
            (((present + late) / totalStudents) * 100).toFixed(2)
          )
        : 0;

    return {
      totalStudents,
      present,
      absent,
      late,
      excused,
      attendanceRate,
    };
  }

  /**
   * Aggregate attendance across multiple records
   */
  calculateOverallSummary(
    attendanceRecords: IAttendance[]
  ): AttendanceSummary {
    let totalStudents = 0;
    let present = 0;
    let absent = 0;
    let late = 0;
    let excused = 0;

    attendanceRecords.forEach((record) => {
      record.attendance.forEach((entry) => {
        totalStudents++;

        switch (entry.status) {
          case AttendanceStatus.PRESENT:
            present++;
            break;

          case AttendanceStatus.ABSENT:
            absent++;
            break;

          case AttendanceStatus.LATE:
            late++;
            break;

          case AttendanceStatus.EXCUSED:
            excused++;
            break;
        }
      });
    });

    const attendanceRate =
      totalStudents > 0
        ? Number(
            (((present + late) / totalStudents) * 100).toFixed(2)
          )
        : 0;

    return {
      totalStudents,
      present,
      absent,
      late,
      excused,
      attendanceRate,
    };
  }

  /**
   * Student-specific attendance analytics
   */
  calculateStudentSummary(
    attendanceRecords: IAttendance[],
    studentId: string
  ): StudentAttendanceSummary {
    let totalDays = 0;
    let present = 0;
    let absent = 0;
    let late = 0;
    let excused = 0;

    attendanceRecords.forEach((record) => {
      const attendanceEntry = record.attendance.find(
        (entry) => entry.studentId.toString() === studentId
      );

      if (!attendanceEntry) {
        return;
      }

      totalDays++;

      switch (attendanceEntry.status) {
        case AttendanceStatus.PRESENT:
          present++;
          break;

        case AttendanceStatus.ABSENT:
          absent++;
          break;

        case AttendanceStatus.LATE:
          late++;
          break;

        case AttendanceStatus.EXCUSED:
          excused++;
          break;
      }
    });

    const attendanceRate =
      totalDays > 0
        ? Number(
            (((present + late) / totalDays) * 100).toFixed(2)
          )
        : 0;

    return {
      studentId,
      totalDays,
      present,
      absent,
      late,
      excused,
      attendanceRate,
    };
  }

  /**
   * Daily trend analytics for charts
   */
  calculateTrendData(
    attendanceRecords: IAttendance[]
  ): AttendanceTrend[] {
    return attendanceRecords
      .sort(
        (a, b) =>
          new Date(a.date).getTime() -
          new Date(b.date).getTime()
      )
      .map((record) => {
        const summary =
          this.calculateAttendanceSummary(record);

        return {
          date: new Date(record.date)
            .toISOString()
            .split("T")[0],
          attendanceRate: summary.attendanceRate,
          present: summary.present,
          absent: summary.absent,
          late: summary.late,
          excused: summary.excused,
        };
      });
  }

  /**
   * Identify students below attendance threshold
   */
  getAtRiskStudents(
    attendanceRecords: IAttendance[],
    thresholdPercentage = 75
  ): StudentAttendanceSummary[] {
    const studentMap = new Map<string, IAttendance[]>();

    attendanceRecords.forEach((record) => {
      record.attendance.forEach((entry) => {
        const studentId = entry.studentId.toString();

        if (!studentMap.has(studentId)) {
          studentMap.set(studentId, []);
        }

        studentMap.get(studentId)?.push(record);
      });
    });

    return Array.from(studentMap.keys())
      .map((studentId) =>
        this.calculateStudentSummary(
          attendanceRecords,
          studentId
        )
      )
      .filter(
        (student) =>
          student.attendanceRate < thresholdPercentage
      );
  }
}