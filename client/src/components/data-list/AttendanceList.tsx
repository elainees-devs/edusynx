import React, { useEffect, useState, useCallback } from "react";
import { attendanceApi } from "../../api/AttendanceApi";
import { getAllClasses, getAllStreams } from "../../api";
import type { AttendanceStatus } from "../../types/school/AttendanceTypes";
import AttendanceTable from "../data-table/AttendanceTable";
import type { IClass, IStream } from "../../types";

export interface IFlatAttendance {
  _id: string;
  studentName: string;
  clasName: string;
  streamName: string;
  date: string;
  status: AttendanceStatus;
  notes?: string;
  studentId?: string;
}

const AttendanceList: React.FC = () => {
  const [classes, setClasses] = useState<IClass[]>([]);
  const [streams, setStreams] = useState<IStream[]>([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedStream, setSelectedStream] = useState("");
  const [date, setDate] = useState("");
  const [attendance, setAttendance] = useState<IFlatAttendance[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      try {
        const [cls, str, response] = await Promise.all([
          getAllClasses(),
          getAllStreams(),
          attendanceApi.getAllAttendanceFlattened(),
        ]);

        setClasses(cls);
        setStreams(str);

        // Type-safe extraction of the flat array
        const attArray = Array.isArray(response)
          ? (response as unknown as IFlatAttendance[])
          : (response as unknown as { data: IFlatAttendance[] })?.data || [];

        setAttendance(attArray);
      } catch (err) {
        console.error("Initialization failed:", err);
        setAttendance([]);
      } finally {
        setLoading(false);
      }
    };
    loadInitialData();
  }, []);

  const handleFetch = useCallback(async () => {
    if (!selectedClass || !selectedStream || !date) return;

    setLoading(true);
    try {
      const response = await attendanceApi.getAttendanceByClassAndDate(
        selectedClass,
        selectedStream,
        date,
      );

      // If the backend returns the record in the 'data' property
      if (response && response.data) {
        // Wrap the single object in an array for the Table
        setAttendance([response.data as unknown as IFlatAttendance]);
      } else {
        setAttendance([]);
      }
    } catch (err) {
      console.error("Fetch failed:", err);
      setAttendance([]);
    } finally {
      setLoading(false);
    }
  }, [selectedClass, selectedStream, date]);
  const handleEdit = async (
    attendanceId: string,
    studentId: string,
    status: AttendanceStatus,
  ) => {
    try {
      await attendanceApi.updateStudentStatus(attendanceId, studentId, status);

      // Simplified local state update for flat structure
      setAttendance((prev) =>
        prev.map((att) =>
          att._id === attendanceId ? { ...att, status } : att,
        ),
      );
    } catch {
      alert("Failed to update student status.");
    }
  };

  const handleDelete = async (attendanceId: string) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    try {
      await attendanceApi.deleteAttendance(attendanceId);
      setAttendance((prev) => prev.filter((att) => att._id !== attendanceId));
    } catch {
      alert("Failed to delete record.");
    }
  };

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Attendance Management
        </h1>
        <div className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full border">
          {attendance.length} Student Record(s) Found
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase">
              Class
            </label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full border border-gray-200 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">Select Class</option>
              {classes.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.clasName}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase">
              Stream
            </label>
            <select
              value={selectedStream}
              onChange={(e) => setSelectedStream(e.target.value)}
              className="w-full border border-gray-200 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">Select Stream</option>
              {streams.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.streamName}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border border-gray-200 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <button
            onClick={handleFetch}
            disabled={loading || !selectedClass || !selectedStream || !date}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold rounded-lg px-4 py-2 transition-colors h-[42px]"
          >
            {loading ? "Searching..." : "Search Records"}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-20 text-center text-gray-500 animate-pulse">
            Retrieving attendance data...
          </div>
        ) : attendance.length > 0 ? (
          <AttendanceTable
            atts={attendance}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ) : (
          <div className="p-20 text-center text-gray-400">
            <p className="text-lg italic">
              No student records match your filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceList;
