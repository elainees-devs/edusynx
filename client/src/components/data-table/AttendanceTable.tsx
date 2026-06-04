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
  onBulkUpdate?: (entries: {attendanceId: string, studentId: string}[], status: AttendanceStatus) => Promise<void>;
}

const AttendanceTable: React.FC<AttendanceTableProps> = ({ atts, onEdit, onDelete, onBulkUpdate }) => {
  const [selectedEntries, setSelectedEntries] = useState<{attendanceId: string, studentId: string}[]>([]);
  const [syncingId, setSyncingId] = useState<string | null>(null);

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

  const handleStatusChange = async (attendanceId: string, studentId: string, status: AttendanceStatus) => {
    setSyncingId(`${attendanceId}-${studentId}`);
    try {
      await onEdit(attendanceId, studentId, status);
    } finally {
      setSyncingId(null);
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedEntries(rows.map(r => ({ attendanceId: r.attendanceId, studentId: r.studentId })));
    } else {
      setSelectedEntries([]);
    }
  };

  const handleSelectRow = (checked: boolean, attendanceId: string, studentId: string) => {
    if (checked) {
      setSelectedEntries(prev => [...prev, { attendanceId, studentId }]);
    } else {
      setSelectedEntries(prev => prev.filter(e => e.attendanceId !== attendanceId));
    }
  };

  const handleBulkPresent = async () => {
    if (selectedEntries.length === 0) return;
    try {
      if (onBulkUpdate) {
        await onBulkUpdate(selectedEntries, AttendanceStatus.PRESENT);
      } else {
        await Promise.all(selectedEntries.map(e => onEdit(e.attendanceId, e.studentId, AttendanceStatus.PRESENT)));
      }
      setSelectedEntries([]);
    } catch (err) {
      console.error("Bulk update failed", err);
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
    <div className="space-y-4">
      {selectedEntries.length > 0 && (
        <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-100 rounded-xl animate-in fade-in slide-in-from-top-1">
          <span className="text-sm font-medium text-blue-700">{selectedEntries.length} students selected</span>
          <button 
            onClick={handleBulkPresent}
            className="px-4 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            Mark selected as Present
          </button>
        </div>
      )}

      <div className="overflow-x-auto border border-gray-200 rounded-xl shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 bg-white border-collapse">
          <thead className="bg-gray-50">
            <tr className="divide-x divide-gray-200">
              <th className="px-4 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider w-12">
                <input 
                  type="checkbox" 
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  checked={selectedEntries.length === rows.length && rows.length > 0}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
              </th>
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
              const isSelected = selectedEntries.some(e => e.attendanceId === row.attendanceId);
              const isSyncing = syncingId === `${row.attendanceId}-${row.studentId}`;

              return (
                <tr key={row.attendanceId} className={`hover:bg-gray-50 transition-colors divide-x divide-gray-200 ${isSelected ? 'bg-blue-50/30' : ''}`}>
                  <td className="px-4 py-4 text-center">
                    <input 
                      type="checkbox" 
                      checked={isSelected}
                      onChange={(e) => handleSelectRow(e.target.checked, row.attendanceId, row.studentId)}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500 text-center">{index + 1}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{row.studentName}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {row.className} / {row.streamName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {new Date(row.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                       <input
                        type="checkbox"
                        checked={row.status === AttendanceStatus.PRESENT}
                        onChange={(e) => handleStatusChange(row.attendanceId, row.studentId, e.target.checked ? AttendanceStatus.PRESENT : AttendanceStatus.ABSENT)}
                        disabled={isSyncing}
                        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer disabled:opacity-50"
                      />
                      <select
                        value={row.status}
                        disabled={isSyncing}
                        onChange={(e) => handleStatusChange(row.attendanceId, row.studentId, e.target.value as AttendanceStatus)}
                        className={`text-xs border rounded-lg px-2 py-1.5 focus:ring-1 focus:ring-blue-500 outline-none transition-all disabled:opacity-50 ${
                          row.status === AttendanceStatus.PRESENT ? 'bg-green-50 text-green-700 border-green-100' :
                          row.status === AttendanceStatus.ABSENT ? 'bg-red-50 text-red-700 border-red-100' :
                          row.status === AttendanceStatus.LATE ? 'bg-yellow-50 text-yellow-700 border-yellow-100' :
                          'bg-blue-50 text-blue-700 border-blue-100'
                        }`}
                      >
                        {Object.values(AttendanceStatus).map((status) => (
                          <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
                        ))}
                      </select>
                      {isSyncing && <div className="w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <button onClick={() => onDelete(row.attendanceId)} className="text-red-600 hover:text-red-800 transition-colors" title="Delete record">
                      <FaTrash size={16} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceTable;