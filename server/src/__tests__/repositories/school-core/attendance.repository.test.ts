import { AttendanceRepository } from '../../../repositories/school-core/attendance.repository';
import { AttendanceModel } from '../../../models';
import { Types } from 'mongoose';

jest.mock('../../../models/academics/attendance.model');

function mockQuery(resolved: unknown) {
  const q: any = {
    populate: jest.fn().mockReturnThis(),
    exec: jest.fn().mockResolvedValue(resolved),
  };
  return q;
}

describe('AttendanceRepository', () => {
  let repo: AttendanceRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    repo = new AttendanceRepository();
  });

  describe('create', () => {
    it('should save a new attendance record', async () => {
      const mockData = { school: new Types.ObjectId() } as any;
      const saveMock = jest.fn().mockResolvedValue(mockData);
      (AttendanceModel as unknown as jest.Mock).mockImplementation(() => ({
        save: saveMock,
      }));

      const result = await repo.create(mockData);
      expect(saveMock).toHaveBeenCalled();
      expect(result).toEqual(mockData);
    });
  });

  describe('updateAttendance', () => {
    it('should update the full attendance array and audit fields', async () => {
      const attendanceId = new Types.ObjectId().toString();
      const updatedBy = new Types.ObjectId();
      const attendanceArray = [{ studentId: new Types.ObjectId(), status: 'present' }];
      const remarks = 'Updated remarks';

      const mockUpdated = { _id: attendanceId, attendance: attendanceArray, updatedBy, remarks };
      (AttendanceModel.findByIdAndUpdate as jest.Mock).mockReturnValue(mockQuery(mockUpdated));

      const result = await repo.updateAttendance(attendanceId, attendanceArray as any, updatedBy, remarks);

      expect(AttendanceModel.findByIdAndUpdate).toHaveBeenCalledWith(
        attendanceId,
        { attendance: attendanceArray, updatedBy, remarks },
        { new: true }
      );
      expect(result).toEqual(mockUpdated);
    });
  });

  describe('findByClass', () => {
    it('should find records within a date range for a class', async () => {
      const classId = new Types.ObjectId().toString();
      const startDate = new Date('2026-01-01');
      const endDate = new Date('2026-01-31');

      const mockRecords = [{ classRef: classId, date: new Date('2026-01-15') }];
      (AttendanceModel.find as jest.Mock).mockReturnValue(mockQuery(mockRecords));

      const result = await repo.findByClass(classId, startDate, endDate);

      expect(AttendanceModel.find).toHaveBeenCalledWith({
        classRef: classId,
        date: { $gte: startDate, $lte: endDate },
      });
      expect(result).toEqual(mockRecords);
    });
  });
});
