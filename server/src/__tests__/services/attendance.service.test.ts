import { AttendanceService } from '../../services/attendance.service';
import { AttendanceStatus } from '../../types/enum/enum';
import { IAttendance } from '../../types/school/school-activity.types';
import { Types } from 'mongoose';

describe('AttendanceService', () => {
  let attendanceService: AttendanceService;

  beforeEach(() => {
    attendanceService = new AttendanceService();
  });

  const mockRecord: Partial<IAttendance> = {
    attendance: [
      { studentId: new Types.ObjectId(), status: AttendanceStatus.PRESENT },
      { studentId: new Types.ObjectId(), status: AttendanceStatus.PRESENT },
      { studentId: new Types.ObjectId(), status: AttendanceStatus.ABSENT },
      { studentId: new Types.ObjectId(), status: AttendanceStatus.LATE },
    ],
  };

  describe('calculateAttendanceSummary', () => {
    it('should calculate correct summary for a single record', () => {
      const summary = attendanceService.calculateAttendanceSummary(mockRecord as IAttendance);
      expect(summary.totalStudents).toBe(4);
      expect(summary.present).toBe(2);
      expect(summary.absent).toBe(1);
      expect(summary.late).toBe(1);
      expect(summary.attendanceRate).toBe(75); // (2 present + 1 late) / 4 * 100
    });

    it('should return 0 rate if no students', () => {
      const summary = attendanceService.calculateAttendanceSummary({ attendance: [] } as any);
      expect(summary.attendanceRate).toBe(0);
    });
  });

  describe('calculateOverallSummary', () => {
    it('should aggregate multiple records correctly', () => {
      const records = [
        mockRecord,
        {
          attendance: [
            { studentId: new Types.ObjectId(), status: AttendanceStatus.PRESENT },
            { studentId: new Types.ObjectId(), status: AttendanceStatus.EXCUSED },
          ],
        },
      ];
      const summary = attendanceService.calculateOverallSummary(records as IAttendance[]);
      expect(summary.totalStudents).toBe(6);
      expect(summary.present).toBe(3);
      expect(summary.attendanceRate).toBe(66.67); // (3 present + 1 late) / 6 * 100
    });
  });

  describe('calculateStudentSummary', () => {
    it('should calculate summary for a specific student', () => {
      const studentId = new Types.ObjectId();
      const records = [
        {
          attendance: [{ studentId: studentId, status: AttendanceStatus.PRESENT }],
        },
        {
          attendance: [{ studentId: studentId, status: AttendanceStatus.ABSENT }],
        },
        {
          attendance: [{ studentId: studentId, status: AttendanceStatus.LATE }],
        },
      ];
      const summary = attendanceService.calculateStudentSummary(records as IAttendance[], studentId.toString());
      expect(summary.totalDays).toBe(3);
      expect(summary.present).toBe(1);
      expect(summary.absent).toBe(1);
      expect(summary.late).toBe(1);
      expect(summary.attendanceRate).toBe(66.67);
    });
  });

  describe('getAtRiskStudents', () => {
    it('should identify students below threshold', () => {
      const studentA = new Types.ObjectId(); // 100%
      const studentB = new Types.ObjectId(); // 0%
      const records = [
        {
          attendance: [
            { studentId: studentA, status: AttendanceStatus.PRESENT },
            { studentId: studentB, status: AttendanceStatus.ABSENT },
          ],
        },
      ];
      const atRisk = attendanceService.getAtRiskStudents(records as IAttendance[], 75);
      expect(atRisk).toHaveLength(1);
      expect(atRisk[0].studentId).toBe(studentB.toString());
    });
  });
});
