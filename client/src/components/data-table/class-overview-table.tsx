// client/src/components/data-table/ClassTeacherTable.tsx
import React from "react";
import { FaEdit } from "react-icons/fa";
import type { ClassTeacher, ITeacher, IClass, IStream } from "../../types";

const ClassOverviewTable: React.FC<{
  teachers: ClassTeacher[];
  getTeacherName: (t: ITeacher | string | null | undefined) => string;
  getGradeDisplay: (g: IClass | string | null | undefined) => string;
  getStreamDisplay: (s: IStream | string | null | undefined) => string;
  onEdit: (teacher: ClassTeacher | null) => void;
  sortAsc: boolean;
  onSort: () => void;
}> = ({
  teachers,
  getTeacherName,
  getGradeDisplay,
  getStreamDisplay,
  onEdit,
  sortAsc,
  onSort,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr className="text-left text-sm font-semibold text-gray-700">
            <th className="px-4 py-2 border">#</th>
            <th
              className="px-4 py-2 border cursor-pointer"
              onClick={onSort}
            >
              Teacher {sortAsc ? "▲" : "▼"}
            </th>
            <th className="px-4 py-2 border">Grade</th>
            <th className="px-4 py-2 border">Stream</th>
            <th className="px-4 py-2 border">Total Students</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher, index) => (
            <tr key={teacher._id} className="hover:bg-gray-50 text-sm">
              <td className="px-4 py-2 border">{index + 1}</td>
              <td className="px-4 py-2 border">{getTeacherName(teacher.teacher)}</td>
              <td className="px-4 py-2 border">{getGradeDisplay(teacher.grade)}</td>
              <td className="px-4 py-2 border">{getStreamDisplay(teacher.stream)}</td>
              <td className="px-4 py-2 border">{teacher.totalStudents}</td>
              <td className="px-4 py-2 border flex gap-2">
                <button onClick={() => onEdit(teacher)} title="Edit Teacher">
                  <FaEdit className="text-green-600 hover:text-green-800" />
                </button>
              </td>
            </tr>
          ))}
          {teachers.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center py-4 text-gray-500">
                No teachers found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ClassOverviewTable;
