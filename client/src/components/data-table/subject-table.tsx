// client/src/components/tables/subject-table.tsx
import React, { useEffect, useMemo, useState } from "react";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";
import type { IClass, ISubject } from "../../types";
import { getAllClasses } from "../../api";
import { resolveId } from "../../utils";

interface SubjectTableProps {
  subjects: ISubject[];
  onEdit: (id: string, updatedData: Partial<ISubject>) => void;
  onDelete: (subject: ISubject) => void;
  page: number;
  limit: number;
}

const SubjectTable: React.FC<SubjectTableProps> = ({
  subjects,
  onEdit,
  onDelete,
  page,
  limit,
}) => {
  const [classes, setClasses] = useState<IClass[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<ISubject>>({});
  const [sortAsc, setSortAsc] = useState(true);

  // Load classes
  useEffect(() => {
    const loadClasses = async () => {
      try {
        const cls = await getAllClasses();
        setClasses(cls || []);
      } catch (error) {
        console.error("Failed to load classes:", error);
        setClasses([]);
      }
    };
    loadClasses();
  }, []);

  const classMap = useMemo(
    () => new Map(classes.map((cls) => [cls._id, cls.clasName])),
    [classes],
  );

  // Editing
  const startEditing = (subject: ISubject) => {
    setEditingId(subject._id);
    setEditData({
      subjectName: subject.subjectName,
      classRef: resolveId(subject.classRef), // should return string ID
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleChange = (field: keyof Partial<ISubject>, value: string) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  const saveEdit = () => {
    if (!editingId) return;
    onEdit(editingId, {
      subjectName: editData.subjectName?.trim(),
      classRef: editData.classRef,
    });
    cancelEditing();
  };

  if (!subjects || subjects.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">No subjects found.</div>
    );
  }

  // Sorting by subjectName
  const sortedSubjects = [...subjects].sort((a, b) => {
    const nameA = a.subjectName.toLowerCase();
    const nameB = b.subjectName.toLowerCase();
    if (nameA < nameB) return sortAsc ? -1 : 1;
    if (nameA > nameB) return sortAsc ? 1 : -1;
    return 0;
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr className="text-left text-sm font-semibold text-gray-700">
            <th className="px-4 py-2 border">#</th>
            <th
              className="px-4 py-2 border cursor-pointer select-none"
              onClick={() => setSortAsc(!sortAsc)}
            >
              Subject Name {sortAsc ? "▲" : "▼"}
            </th>
            <th className="px-4 py-2 border">Class</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>

        <tbody>
          {sortedSubjects.map((subject, index) => {
            const isEditing = editingId === subject._id;
            const classId = resolveId(subject.classRef);

            return (
              <tr key={subject._id} className="hover:bg-gray-50 text-sm">
                <td className="px-4 py-2 border">
                  {(page - 1) * limit + index + 1}
                </td>
                <td className="px-4 py-2 border">
                  {isEditing ? (
                    <input
                      type="text"
                      autoFocus
                      value={editData.subjectName || ""}
                      onChange={(e) =>
                        handleChange("subjectName", e.target.value)
                      }
                      className="border p-1 rounded w-full"
                    />
                  ) : (
                    subject.subjectName
                  )}
                </td>
                <td className="px-4 py-2 border">
                  {isEditing ? (
                    <select
                      value={
                        typeof editData.classRef === "string"
                          ? editData.classRef
                          : ""
                      }
                      onChange={(e) => handleChange("classRef", e.target.value)}
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
                        title="Edit Subject"
                        onClick={() => startEditing(subject)}
                      >
                        <FaEdit className="text-green-600 hover:text-green-800" />
                      </button>
                      <button
                        type="button"
                        title="Delete Subject"
                        onClick={() => onDelete(subject)}
                      >
                        <FaTimes className="text-red-600 hover:text-red-800" />
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

export default SubjectTable;
