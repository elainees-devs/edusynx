//client/src/components/data-table/teacher-table.tsx
import React from "react";
import type { Teacher } from "../../types/school/allocation";
import RowActions from "../../shared/table/row-actions";

interface TeacherTableProps {
  teachers: Teacher[];
  sortAsc: boolean;
  editingId: string | null;
  editData: Partial<Teacher>;

  onToggleSort: () => void;
  onToggleStatus: (id: string) => void;

  onEditStart: (teacher: Teacher) => void;
  onEditChange: (field: keyof Teacher, value: string) => void;
  onEditSave: (id: string) => void;
  onEditCancel: () => void;
  onDelete: (id: string) => void;
}

const TeacherTable: React.FC<TeacherTableProps> = ({
  teachers,
  sortAsc,
  editingId,
  editData,
  onToggleSort,
  onToggleStatus,
  onEditStart,
  onEditChange,
  onEditSave,
  onEditCancel,
  onDelete,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr className="text-sm font-semibold text-gray-700">
            <th className="px-4 py-2 border">#</th>
            <th className="px-4 py-2 border">Employment No</th>
            <th
              className="px-4 py-2 border cursor-pointer select-none"
              onClick={onToggleSort}
            >
              Names <span className="ml-1">{sortAsc ? "▲" : "▼"}</span>
            </th>
            <th className="px-4 py-2 border">Phone</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>

        <tbody className="text-sm">
          {teachers.map((teacher, index) => {
            const isEditing = editingId === teacher.id;

            return (
              <tr key={teacher.id} className="border hover:bg-gray-50">
                <td className="px-4 py-2 border border-gray-300">
                  {index + 1}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {teacher.employmentNo}
                </td>

                {/* NAME */}
                <td className="px-4 py-2 border border-gray-300">
                  {isEditing ? (
                    <input
                      value={editData.firstName || ""}
                      onChange={(e) =>
                        onEditChange("firstName", e.target.value)
                      }
                      className="border px-2 py-1 rounded w-full"
                    />
                  ) : (
                    `${teacher.firstName} ${teacher.middleName} ${teacher.lastName}`
                  )}
                </td>

                {/* PHONE */}
                <td className="px-4 py-2 border border-gray-300">
                  {isEditing ? (
                    <input
                      value={editData.primaryPhoneNumber || ""}
                      onChange={(e) =>
                        onEditChange("primaryPhoneNumber", e.target.value)
                      }
                      className="border px-2 py-1 rounded w-full"
                    />
                  ) : (
                    teacher.primaryPhoneNumber
                  )}
                </td>

                {/* EMAIL */}
                <td className="px-4 py-2 border border-gray-300">
                  {isEditing ? (
                    <input
                      value={editData.email || ""}
                      onChange={(e) => onEditChange("email", e.target.value)}
                      className="border px-2 py-1 rounded w-full"
                    />
                  ) : (
                    teacher.email
                  )}
                </td>

                {/* STATUS */}
                <td className="px-4 py-2 border border-gray-300">
                  <button
                    onClick={() => onToggleStatus(teacher.id)}
                    className="text-gray-600"
                  >
                    {teacher.isActive ? "Deactivate" : "Activate"}
                  </button>
                </td>

                {/* ACTIONS */}
                <td className="px-4 py-2 border border-gray-300">
                  <RowActions
                    isEditing={isEditing}
                    onEdit={() => onEditStart(teacher)}
                    onSave={() => onEditSave(teacher.id)}
                    onCancel={onEditCancel}
                    onDelete={() => onDelete(teacher.id)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherTable;
