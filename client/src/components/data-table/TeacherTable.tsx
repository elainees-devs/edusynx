// client/src/components/data-table/teacher-table.tsx
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";
import type { Teacher } from "../../types/school/allocation";
import { countTeachers } from "../../api";

interface TeacherTableProps {
  teachers: Teacher[];
onSort: () => void;
  onEdit: (id: string, updated: Partial<Teacher>) => void;
  onDelete: (teacher: Teacher) => void;
  onToggleStatus: (id: string) => void;

  page: number;
  limit: number;
}

const TeacherTable: React.FC<TeacherTableProps> = ({
  teachers,

  onEdit,
  onDelete,
  onToggleStatus,
  page,
  limit,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Teacher>>({});
  const [sortAsc, setSortAsc] = useState(true);
  const [totalTeachers, setTotalTeachers] = useState(teachers.length);

  // Sorting by firstName
  const sortedTeachers = [...teachers].sort((a, b) => {
    const nameA = a.firstName.toLowerCase();
    const nameB = b.firstName.toLowerCase();
    return sortAsc ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
  });

  // Editing
  const startEditing = (t: Teacher) => {
    setEditingId(t._id);
    setEditData({
      firstName: t.firstName,
      middleName: t.middleName,
      lastName: t.lastName,
      primaryPhoneNumber: t.primaryPhoneNumber,
      email: t.email,
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleChange = (field: keyof Partial<Teacher>, value: string) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  const saveEdit = () => {
    if (!editingId) return;
    onEdit(editingId, editData);
    cancelEditing();
  };

  // Load classes, streams, and total students
  useEffect(() => {
    const loadData = async () => {
      try {
        const totalTeachersData = await countTeachers();

        setTotalTeachers(totalTeachersData.count || 0);
      } catch (error) {
        console.error("Failed to load total teachers:", error);
        setTotalTeachers(0);
      }
    };
    loadData();
  }, []);

  return (
    <div className="overflow-x-auto">
       <p className="mb-2 mr-8 text-right font-semibold text-gray-700">
        Total number of teachers: <span className="table-data-count">{totalTeachers}</span>
      </p>
      <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr className="text-left text-sm font-semibold text-gray-700">
            <th className="px-4 py-2 border">#</th>
            <th className="px-4 py-2 border">Employment No</th>

            <th
              className="px-4 py-2 border cursor-pointer select-none"
              onClick={() => setSortAsc((prev) => !prev)}
            >
              Names {sortAsc ? "▲" : "▼"}
            </th>

            <th className="px-4 py-2 border">Phone</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>

        <tbody className="text-sm">
          {sortedTeachers.map((teacher, index) => {
            const isEditing = editingId === teacher._id;

            return (
              <tr key={teacher._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">
                  {(page - 1) * limit + index + 1}
                </td>

                <td className="px-4 py-2 border">{teacher.employmentNo}</td>

                {/* NAME */}
                <td className="px-4 py-2 border">
                  {isEditing ? (
                    <div className="flex flex-col gap-1">
                      <input
                        className="border p-1 rounded"
                        placeholder="First"
                        value={editData.firstName || ""}
                        onChange={(e) =>
                          handleChange("firstName", e.target.value)
                        }
                      />
                      <input
                        className="border p-1 rounded"
                        placeholder="Middle"
                        value={editData.middleName || ""}
                        onChange={(e) =>
                          handleChange("middleName", e.target.value)
                        }
                      />
                      <input
                        className="border p-1 rounded"
                        placeholder="Last"
                        value={editData.lastName || ""}
                        onChange={(e) =>
                          handleChange("lastName", e.target.value)
                        }
                      />
                    </div>
                  ) : (
                    `${teacher.firstName} ${teacher.middleName} ${teacher.lastName}`
                  )}
                </td>

                {/* PHONE */}
                <td className="px-4 py-2 border">
                  {isEditing ? (
                    <input
                      className="border p-1 rounded w-full"
                      value={editData.primaryPhoneNumber || ""}
                      onChange={(e) =>
                        handleChange("primaryPhoneNumber", e.target.value)
                      }
                    />
                  ) : (
                    teacher.primaryPhoneNumber
                  )}
                </td>

                {/* EMAIL */}
                <td className="px-4 py-2 border">
                  {isEditing ? (
                    <input
                      className="border p-1 rounded w-full"
                      value={editData.email || ""}
                      onChange={(e) => handleChange("email", e.target.value)}
                    />
                  ) : (
                    teacher.email
                  )}
                </td>

                {/* STATUS */}
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => onToggleStatus(teacher._id)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {teacher.isActive ? "Active" : "Inactive"}
                  </button>
                </td>

                {/* ACTIONS */}
                <td className="px-4 py-2 border flex gap-3">
                  {isEditing ? (
                    <>
                      <button onClick={saveEdit} title="Save">
                        <FaSave className="text-green-600 hover:text-green-800" />
                      </button>
                      <button onClick={cancelEditing} title="Cancel">
                        <FaTimes className="text-gray-600 hover:text-gray-800" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEditing(teacher)}
                        title="Edit"
                      >
                        <FaEdit className="text-green-600 hover:text-green-800" />
                      </button>
                      <button onClick={() => onDelete(teacher)} title="Delete">
                        <FaTrash className="text-red-600 hover:text-red-800" />
                      </button>
                    </>
                  )}
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
