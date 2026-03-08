// client/src/components/tables/class-table.tsx
import React, { useState } from "react";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";
import type { IClass } from "../../types";

interface ClassTableProps {
  classes?: IClass[];
  onEdit: (id: string, updatedData: Partial<IClass>) => void;
  onDelete: (classes: IClass) => void;
  onSort: () => void;
  page: number;
  limit: number;
}

const ClassTable: React.FC<ClassTableProps> = ({
  classes,
  onEdit,
  onDelete,
  page,
  limit,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<IClass>>({});

  const startEditing = (clas: IClass) => {
    setEditingId(clas._id);
    setEditData({
      clasName: clas.clasName,
      academicYear: clas.academicYear,
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleChange = (field: keyof Partial<IClass>, value: string) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  const saveEdit = () => {
    if (!editingId) return;
    onEdit(editingId, {
      clasName: editData.clasName?.trim(),
      academicYear: editData.academicYear,
    });
    cancelEditing();
  };

  if (!classes || classes.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">No classes found.</div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr className="text-left text-sm font-semibold text-gray-700">
            <th className="px-4 py-2 border">#</th>
            <th className="px-4 py-2 border">Class Name</th>
            <th className="px-4 py-2 border">Academic Year</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>

        <tbody>
          {classes
            .slice((page - 1) * limit, page * limit)
            .map((clas, index) => {
              const isEditing = editingId === clas._id;

              return (
                <tr key={clas._id} className="hover:bg-gray-50 text-sm">
                  <td className="px-4 py-2 border">
                    {(page - 1) * limit + index + 1}
                  </td>

                  <td className="px-4 py-2 border">
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.clasName || ""}
                        onChange={(e) =>
                          handleChange("clasName", e.target.value)
                        }
                        className="border p-1 rounded w-full"
                      />
                    ) : (
                      clas.clasName
                    )}
                  </td>

                  <td className="px-4 py-2 border">
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.academicYear || ""}
                        onChange={(e) =>
                          handleChange("academicYear", e.target.value)
                        }
                        className="border p-1 rounded w-full"
                      />
                    ) : (
                      clas.academicYear
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
                          title="Edit Class"
                          onClick={() => startEditing(clas)}
                        >
                          <FaEdit className="text-green-600 hover:text-green-800" />
                        </button>
                        <button
                          type="button"
                          title="Delete Class"
                          onClick={() => onDelete(clas)}
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

export default ClassTable;
