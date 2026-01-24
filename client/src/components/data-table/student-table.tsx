// client/src/components/tables/student-table.tsx
import React, { useEffect, useMemo, useState } from "react";
import { FaUserPlus, FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";
import type { IClass, IStream } from "../../types";
import type { Student } from "../../types/people/student.types";
import { getAllClasses } from "../../api";
import { getAllStreams } from "../../api/stream.api";
import { resolveId } from "../../utils";

interface StudentTableProps {
  students: Student[];
  sortAsc: boolean;
  onSort: () => void;
  onAdd: () => void;
  onEdit: (id: string, updatedData: Partial<Student>) => void;
  onDelete: (student: Student) => void;
  page: number;
  limit: number;
}

const StudentTable: React.FC<StudentTableProps> = ({
  students,
  sortAsc,
  onSort,
  onAdd,
  onEdit,
  onDelete,
  page,
  limit,
}) => {
  const [classes, setClasses] = useState<IClass[]>([]);
  const [streams, setStreams] = useState<IStream[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Student>>({});

  // Load classes and streams
  useEffect(() => {
    const loadData = async () => {
      try {
        const [studentClasses, streamsData] = await Promise.all([
          getAllClasses(),
          getAllStreams(),
        ]);

        setClasses(studentClasses || []);
        setStreams(streamsData || []);
      } catch (error) {
        console.error("Failed to load classes or streams:", error);
        setClasses([]);
        setStreams([]);
      }
    };

    loadData();
  }, []);

  // Map for quick lookup
  const classMap = useMemo(() => {
    return new Map((classes || []).map((cls) => [cls._id, cls.clasName]));
  }, [classes]);

  const streamMap = useMemo(() => {
    return new Map((streams || []).map((s) => [s._id, s.streamName]));
  }, [streams]);

  // Editing functions
  const startEditing = (student: Student) => {
    setEditingId(student._id);

    setEditData({
      studentFirstName: student.studentFirstName,
      studentMiddleName: student.studentMiddleName,
      studentLastName: student.studentLastName,
      studentGender: student.studentGender,
      classId: resolveId(student.classId),
      stream:
        typeof student.stream === "object" && student.stream !== null
          ? (student.stream as IStream)._id
          : student.stream,
      status: student.status,
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

    const updatedData: Partial<Student> = {
      studentFirstName: editData.studentFirstName?.trim(),
      studentMiddleName: editData.studentMiddleName?.trim(),
      studentLastName: editData.studentLastName?.trim(),
      studentGender: editData.studentGender,
      classId: editData.classId,
      stream: editData.stream,
      status: editData.status,
    };

    onEdit(editingId, updatedData);
    cancelEditing();
  };

  // Guard: no students
  if (!students || students.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">No students found.</div>
    );
  }

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
          {(students || []).map((student, index) => {
            const isEditing = editingId === student._id;

            const classId = resolveId(student.classId);

            // Resolve guardian
            const guardianName =
              typeof student.guardianId === "object" &&
              student.guardianId !== null
                ? student.guardianId.firstName
                : (student.guardianId ?? "");

            return (
              <tr key={student._id} className="hover:bg-gray-50 text-sm">
                <td className="px-4 py-2 border">
                  {(page - 1) * limit + index + 1}
                </td>
                <td className="px-4 py-2 border">{student.adm}</td>

                {/* First Name */}
                <td className="px-4 py-2 border">
                  {isEditing ? (
                    <input
                      type="text"
                      autoFocus
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

                {/* Gender */}
                <td className="px-4 py-2 border">
                  {isEditing ? (
                    <select
                      value={editData.studentGender || ""}
                      onChange={(e) =>
                        handleChange("studentGender", e.target.value)
                      }
                      className="border p-1 rounded w-full"
                    >
                      <option value="">-- Select Gender --</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  ) : (
                    student.studentGender
                  )}
                </td>

                <td className="px-4 py-2 border">{student.previousSchool}</td>

                {/* Class */}
                <td className="px-4 py-2 border">
                  {isEditing ? (
                    <select
                      value={editData.classId || ""}
                      onChange={(e) => handleChange("classId", e.target.value)}
                      className="border p-1 rounded w-full"
                    >
                      <option value="">-- Select Class --</option>
                      {classes.map((cls) => (
                        <option key={cls._id} value={cls._id}>
                          {cls.clasName}
                        </option>
                      ))}
                    </select>
                  ) : (
                    (classMap.get(classId!) ?? "Unknown Class")
                  )}
                </td>

                {/* Stream */}
                <td className="px-4 py-2 border">
                  {isEditing ? (
                    <select
                      value={editData.stream || ""}
                      onChange={(e) => handleChange("stream", e.target.value)}
                      className="border p-1 rounded w-full"
                    >
                      <option value="">-- Select Stream --</option>
                      {(streams || []).map((s) => (
                        <option key={s._id} value={s._id}>
                          {s.streamName}
                        </option>
                      ))}
                    </select>
                  ) : (
                    (streamMap.get(student.stream) ?? "Unknown Stream")
                  )}
                </td>

                {/* Guardian */}
                <td className="px-4 py-2 border">{guardianName}</td>

                {/* Actions */}
                <td className="px-4 py-2 border flex gap-2">
                  {isEditing ? (
                    <>
                      <button type="button" title="Save" onClick={saveEdit}>
                        <FaSave className="text-green-600 hover:text-green-800" />
                      </button>
                      <button
                        type="button"
                        title="Cancel"
                        onClick={cancelEditing}
                      >
                        <FaTimes className="text-gray-600 hover:text-gray-800" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        title="Add Guardian"
                        onClick={onAdd}
                      >
                        <FaUserPlus className="text-blue-600 hover:text-blue-800" />
                      </button>
                      <button
                        type="button"
                        title="Edit Student"
                        onClick={() => startEditing(student)}
                      >
                        <FaEdit className="text-green-600 hover:text-green-800" />
                      </button>
                      <button
                        type="button"
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
