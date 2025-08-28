// client/src/components/tables/student-table.tsx
import React, { useState } from "react";
import { FaUserPlus, FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";
import type { Student } from "../../types";


interface StudentTableProps {
  students: Student[];
  sortAsc: boolean;
  onSort: () => void;
  onAdd: () => void;
  onEdit: (id: string, updatedData: Partial<Student>) => void;
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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Student>>({});

  // Preload only editable fields
  const startEditing = (student: Student) => {
    setEditingId(student._id);
    setEditData({
      studentFirstName: student.studentFirstName,
      studentMiddleName: student.studentMiddleName,
      studentLastName: student.studentLastName,
      // Add other editable string fields here if needed
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleChange = (field: keyof Partial<Student>, value: string) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };


  const saveEdit = () => {
    if (!editingId) return;

    // Prepare payload: only send allowed fields
    const updatedData: Partial<Student> = {
      studentFirstName: editData.studentFirstName,
      studentMiddleName: editData.studentMiddleName,
      studentLastName: editData.studentLastName,
    };

    console.log("Final update payload:", updatedData);

    onEdit(editingId, updatedData);
    setEditingId(null);
    setEditData({});
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr className="text-left text-sm font-semibold text-gray-700">
            <th className="px-4 py-2 border">#</th>
            <th className="px-4 py-2 border">Adm No</th>
            <th
              className="px-4 py-2 border cursor-pointer select-none"
              onClick={onSort}
            >
              First {sortAsc ? "▲" : "▼"}
            </th>
            <th className="px-4 py-2 border">Middle</th>
            <th className="px-4 py-2 border">Last</th>
            <th className="px-4 py-2 border">Gender</th>
            <th className="px-4 py-2 border">Previous School</th>
            <th className="px-4 py-2 border">Class</th>
            <th className="px-4 py-2 border">Stream</th>
            <th className="px-4 py-2 border">Guardian</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student, index) => {
            const isEditing = editingId === student._id;

            // Safe display for populated objects
            const className =
              typeof student.classId === "object"
                ? student.classId.grade
                : student.classId;
            const streamName =
              typeof student.stream === "object"
                ? student.stream.streamName
                : student.stream;
            const guardianName =
              typeof student.guardianId === "object"
                ? student.guardianId.firstName
                : student.guardianId;

            return (
              <tr key={student._id} className="hover:bg-gray-50 text-sm">
                <td className="px-4 py-2 border">{index + 1}</td>
                <td className="px-4 py-2 border">{student.adm}</td>

                {/* First Name */}
                <td className="px-4 py-2 border">
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.studentFirstName || ""}
                      onChange={(e) =>
                        handleChange("studentFirstName", e.target.value)
                      }
                      className="border p-1 rounded w-full"
                    />
                  ) : (
                    student.studentFirstName
                  )}
                </td>

                {/* Middle Name */}
                <td className="px-4 py-2 border">
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.studentMiddleName || ""}
                      onChange={(e) =>
                        handleChange("studentMiddleName", e.target.value)
                      }
                      className="border p-1 rounded w-full"
                    />
                  ) : (
                    student.studentMiddleName
                  )}
                </td>

                {/* Last Name */}
                <td className="px-4 py-2 border">
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.studentLastName || ""}
                      onChange={(e) =>
                        handleChange("studentLastName", e.target.value)
                      }
                      className="border p-1 rounded w-full"
                    />
                  ) : (
                    student.studentLastName
                  )}
                </td>

                <td className="px-4 py-2 border">{student.studentGender}</td>
                <td className="px-4 py-2 border">{student.previousSchool}</td>
                <td className="px-4 py-2 border">{className}</td>
                <td className="px-4 py-2 border">{streamName}</td>
                <td className="px-4 py-2 border">{guardianName}</td>

                {/* Actions */}
                <td className="px-4 py-2 border flex gap-2">
                  {isEditing ? (
                    <>
                      <button title="Save" onClick={saveEdit}>
                        <FaSave className="text-green-600 hover:text-green-800" />
                      </button>
                      <button title="Cancel" onClick={cancelEditing}>
                        <FaTimes className="text-gray-600 hover:text-gray-800" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button title="Add Guardian" onClick={onAdd}>
                        <FaUserPlus className="text-blue-600 hover:text-blue-800" />
                      </button>
                      <button
                        title="Edit Student"
                        onClick={() => startEditing(student)}
                      >
                        <FaEdit className="text-green-600 hover:text-green-800" />
                      </button>
                      <button
                        title="Delete Student"
                        onClick={() => onDelete(student)}
                      >
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

export default StudentTable;
