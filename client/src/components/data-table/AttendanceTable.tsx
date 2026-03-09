// client/src/components/data-table/attendance-table.tsx
import React, { useState, useMemo } from "react";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";
import { AttendanceStatus } from "../../types/school/AttendanceTypes";

interface FlatAttendance {
  _id: string;
  studentName: string;
  clasName: string;
  streamName: string;
  date: string;
  status: AttendanceStatus;
  notes?: string;
  studentId?: string;
}

interface AttendanceTableProps {
  atts: FlatAttendance[];
  onEdit: (attendanceId: string, studentId: string, status: AttendanceStatus) => Promise<void>;
  onDelete: (attendanceId: string) => Promise<void>;
}

const AttendanceTable: React.FC<AttendanceTableProps> = ({ atts, onEdit, onDelete }) => {
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [newStatus, setNewStatus] = useState<AttendanceStatus | null>(null);

  const rows = useMemo(() => {
    if (!Array.isArray(atts)) return [];
    
    return atts.map((item: FlatAttendance) => ({
      attendanceId: item._id,
      studentId: item.studentId || item._id,
      studentName: item.studentName || "Unknown Student",
      className: item.clasName || "—",
      streamName: item.streamName || "—",
      date: item.date,
      status: item.status,
    }));
  }, [atts]);

  const handleStartEdit = (row: typeof rows[0]) => {
    setEditingKey(row.attendanceId);
    setNewStatus(row.status);
  };

  const handleSave = async (attendanceId: string, studentId: string) => {
    if (newStatus) {
      await onEdit(attendanceId, studentId, newStatus);
      setEditingKey(null);
    }
  };

  if (rows.length === 0) {
    return (
      <div className="p-20 text-center text-gray-400 bg-white rounded-xl border border-dashed border-gray-300">
        <p className="text-lg font-medium">No records found for the selected criteria.</p>
        <p className="text-sm mt-1">Check that your Class, Stream, and Date filters match the data exactly.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
      {/* Added divide-x to the table for vertical lines */}
      <table className="min-w-full divide-y divide-gray-200 bg-white border-collapse">
        <thead className="bg-gray-50">
          <tr className="divide-x divide-gray-200">
            <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider w-12">#</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Student</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Class/Stream</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {rows.map((row, index) => {
            const isEditing = editingKey === row.attendanceId;

            return (
              <tr key={row.attendanceId} className="hover:bg-gray-50 transition-colors divide-x divide-gray-200">
                <td className="px-4 py-4 text-sm text-gray-500 text-center">{index + 1}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{row.studentName}</td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {row.className} / {row.streamName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                  {new Date(row.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {isEditing ? (
                    <select
                      value={newStatus || ""}
                      onChange={(e) => setNewStatus(e.target.value as AttendanceStatus)}
                      className="text-sm border border-gray-300 rounded p-1 focus:ring-2 focus:ring-blue-500 outline-none w-full"
                    >
                      {Object.values(AttendanceStatus).map((status) => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  ) : (
                    <StatusBadge status={row.status} />
                  )}
                </td>
                <td className="px-6 py-4 text-right text-sm font-medium">
                  <div className="flex justify-end gap-3">
                    {isEditing ? (
                      <>
                        <button onClick={() => handleSave(row.attendanceId, row.studentId)} className="text-green-600 hover:text-green-800" title="Save">
                          <FaSave size={18} />
                        </button>
                        <button onClick={() => setEditingKey(null)} className="text-gray-400 hover:text-gray-600" title="Cancel">
                          <FaTimes size={18} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => handleStartEdit(row)} className="text-blue-600 hover:text-blue-800" title="Edit">
                          <FaEdit size={18} />
                        </button>
                        <button onClick={() => onDelete(row.attendanceId)} className="text-red-600 hover:text-red-800" title="Delete">
                          <FaTrash size={18} />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const StatusBadge: React.FC<{ status: AttendanceStatus }> = ({ status }) => {
  const styles: Record<AttendanceStatus, string> = {
    present: "bg-green-100 text-green-800 border-green-200",
    absent: "bg-red-100 text-red-800 border-red-200",
    late: "bg-yellow-100 text-yellow-800 border-yellow-200",
    excused: "bg-blue-100 text-blue-800 border-blue-200",
  };

  return (
    <span className={`px-3 py-1 text-[10px] font-bold uppercase rounded-full border ${styles[status] || "bg-gray-100"}`}>
      {status}
    </span>
  );
};

export default AttendanceTable;