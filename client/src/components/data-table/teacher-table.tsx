// client/src/components/data-table/teacher-table.tsx
import React from "react";
import type { Teacher } from "../../types/school/allocation";

interface TeacherTableProps {
  teachers: Teacher[];
  sortAsc: boolean;
  onToggleSort: () => void;
  onEdit: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

const TeacherTable: React.FC<TeacherTableProps> = ({
  teachers,
  sortAsc,
  onToggleSort,
  onEdit,
  onToggleStatus,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr className="text-left text-sm font-semibold text-gray-700">
            <th className="px-4 py-2 border">#</th>
            
            <th className="px-4 py-2 border">EmploymentNo</th>
           <th
              className="px-4 py-2 border cursor-pointer select-none"
              onClick={onToggleSort}
            >
              Names <span className="ml-1">{sortAsc ? "▲" : "▼"}</span>
            </th>
            <th className="px-4 py-2 border">Primary Phone No</th>
            <th className="px-4 py-2 border">SecondaryPhoneNumber</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>

        <tbody className="text-sm text-gray-800">
          {teachers.map((teacher, index) => (
            <tr
              key={teacher.id}
              className="border border-gray-300 hover:bg-gray-50"
            >
              <td className="px-4 py-2 text-center">{index + 1}</td>
             
               <td className="px-4 py-2 border">{teacher.employmentNo}</td>
                <td className="px-4 py-2">
                {teacher.firstName} {teacher.middleName} {teacher.lastName}
              </td>
              <td className="px-4 py-2 border">{teacher.primaryPhoneNumber}</td>
              <td className="px-4 py-2 border ">{teacher.secondaryPhoneNumber}</td>
              <td className="px-4 py-2 border">{teacher.email}</td>
              <td className="px-4 py-2 border">
                  <button
                  onClick={() => onToggleStatus(teacher.id)}
                  className="text-gray-600"
                >
                  {teacher.isActive ? "Deactivate" : "Activate"}
                </button>
              </td>
             
              <td className="px-4 py-2">
                <button
                  onClick={() => onEdit(teacher.id)}
                  className="text-blue-600 mr-2"
                >
                  Edit
                </button>
              
              </td>
            </tr>
          ))}

          {teachers.length === 0 && (
            <tr>
              <td
                colSpan={9}
                className="text-center px-4 py-6 text-gray-500 italic"
              >
                No teachers found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherTable;
