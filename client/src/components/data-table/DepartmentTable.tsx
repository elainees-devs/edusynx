import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import type { IDepartment } from "../../types/school/AcademicTypes";
import type { IStaff } from "../../types/people/StaffTypes";

interface DepartmentTableProps {
  departments: IDepartment[];
  onEdit: (dept: IDepartment) => void;
  onDelete: (id: string) => void;
}

const staffName = (s?: string | IStaff): string => {
  if (!s) return "-";
  if (typeof s === "string") return s;
  return `${s.firstName} ${s.middleName ? s.middleName + " " : ""}${s.lastName}`;
};

const teacherCount = (teachers?: string | IStaff[]): number => {
  if (!teachers) return 0;
  if (Array.isArray(teachers)) return teachers.length;
  return 0;
};

const DepartmentTable: React.FC<DepartmentTableProps> = ({
  departments,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr className="text-left text-sm font-semibold text-gray-700">
            <th className="px-4 py-2 border">#</th>
            <th className="px-4 py-2 border">Department Name</th>
            <th className="px-4 py-2 border">Head of Department</th>
            <th className="px-4 py-2 border">Members</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {departments.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                No departments found.
              </td>
            </tr>
          ) : (
            departments.map((dept, index) => (
              <tr key={dept._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{index + 1}</td>
                <td className="px-4 py-2 border font-medium">{dept.departmentName}</td>
                <td className="px-4 py-2 border">{staffName(dept.headOfDepartment)}</td>
                <td className="px-4 py-2 border">{teacherCount(dept.teachers)}</td>
                <td className="px-4 py-2 border flex gap-3">
                  <button onClick={() => onEdit(dept)} title="Edit">
                    <FaEdit className="text-green-600 hover:text-green-800" />
                  </button>
                  <button onClick={() => onDelete(dept._id!)} title="Delete">
                    <FaTrash className="text-red-600 hover:text-red-800" />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DepartmentTable;
