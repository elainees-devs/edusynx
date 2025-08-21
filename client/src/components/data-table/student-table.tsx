// client/src/components/data-table/student-table.tsx
import React from "react";
import { FaUserPlus, FaEdit, FaTrash } from "react-icons/fa";
import type { Student } from "../../types";

interface StudentTableProps {
  students: Student[];
  sortAsc: boolean;
  onSort: () => void;
  onAdd: () => void;
  onEdit: (student: Student) => void;
  onDelete: (student: Student) => void;
}

const StudentTable: React.FC<StudentTableProps> = ({
  students,
  sortAsc,
  onSort,
  onAdd,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr className="text-left text-sm font-semibold text-gray-700">
            <th className="px-4 py-2 border">#</th>
            <th className="px-4 py-2 border">Adm No</th>
            <th className="px-4 py-2 border cursor-pointer select-none" onClick={onSort}>
              First {sortAsc ? "▲" : "▼"}
            </th>
            <th className="px-4 py-2 border cursor-pointer select-none" onClick={onSort}>
              Middle {sortAsc ? "▲" : "▼"}
            </th>
            <th className="px-4 py-2 border cursor-pointer select-none" onClick={onSort}>
              Last {sortAsc ? "▲" : "▼"}
            </th>
            <th className="px-4 py-2 border">Gender</th>
            <th className="px-4 py-2 border">Previous School</th>
            <th className="px-4 py-2 border">Class</th>
            <th className="px-4 py-2 border">Stream</th>
            <th className="px-4 py-2 border">Guardian</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student._id} className="hover:bg-gray-50 text-sm">
              <td className="px-4 py-2 border">{index + 1}</td>
              <td className="px-4 py-2 border">{student.adm}</td>
              <td className="px-4 py-2 border">{student.studentFirstName}</td>
              <td className="px-4 py-2 border">{student.studentMiddleName}</td>
              <td className="px-4 py-2 border">{student.studentLastName}</td>
              <td className="px-4 py-2 border">{student.studentGender}</td>
              <td className="px-4 py-2 border">{student.previousSchool}</td>
              <td className="px-4 py-2 border">{student.classId}</td>
              <td className="px-4 py-2 border">{student.stream}</td>
              <td className="px-4 py-2 border">{student.guardianId}</td>
              <td className="px-4 py-2 border flex gap-2">
                <button title="Add Guardian" onClick={onAdd}>
                  <FaUserPlus className="text-blue-600 hover:text-blue-800" />
                </button>
                <button title="Edit Student" onClick={() => onEdit(student)}>
                  <FaEdit className="text-green-600 hover:text-green-800" />
                </button>
                <button title="Delete Student" onClick={() => onDelete(student)}>
                  <FaTrash className="text-red-600 hover:text-red-800" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
