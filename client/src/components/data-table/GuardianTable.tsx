// client/src/components/tables/guardian-table.tsx
import React, { useState } from "react";
import { FaEdit, FaTrash, FaSave, FaTimes, FaUserPlus } from "react-icons/fa";
import type { Guardian } from "../../types";

interface GuardianTableProps {
  guardians: Guardian[];
  onSort: () => void;
  onAdd: () => void;
  onEdit: (id: string, updatedData: Partial<Guardian>) => void;
  onDelete: (guardian: Guardian) => void;
  page: number;
  limit: number;
}

const GuardianTable: React.FC<GuardianTableProps> = ({
  guardians,
  onSort,
  onAdd,
  onEdit,
  onDelete,
  page,
  limit,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Guardian>>({});
  const [sortAsc, setSortAsc] = useState(true);

  // Editing
  const startEditing = (guardian: Guardian) => {
    setEditingId(guardian._id);
    setEditData({
      firstName: guardian.firstName,
      middleName: guardian.middleName,
      lastName: guardian.lastName,
      email: guardian.email,
      secondaryEmail: guardian.secondaryEmail,
      primaryPhoneNumber: guardian.primaryPhoneNumber,
      secondaryPhoneNumber: guardian.secondaryPhoneNumber,
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleChange = (field: keyof Partial<Guardian>, value: string) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  const saveEdit = () => {
    if (!editingId) return;

    const updatedData: Partial<Guardian> = {
      firstName: editData.firstName?.trim(),
      middleName: editData.middleName?.trim(),
      lastName: editData.lastName?.trim(),
      email: editData.email?.trim(),
      secondaryEmail: editData.secondaryEmail?.trim(),
      primaryPhoneNumber: editData.primaryPhoneNumber?.trim(),
      secondaryPhoneNumber: editData.secondaryPhoneNumber?.trim(),
    };

    onEdit(editingId, updatedData);
    cancelEditing();
  };

  if (!guardians || guardians.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">No guardians found.</div>
    );
  }

  // Simple sort by first name (matches current backend-friendly approach)
  const sortedGuardians = [...guardians].sort((a, b) =>
    a.firstName.localeCompare(b.firstName),
  );
  if (!sortAsc) sortedGuardians.reverse();

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr className="text-left text-sm font-semibold text-gray-700">
            <th className="px-4 py-2 border">#</th>
            <th className="px-4 py-2 border">Family No</th>
            <th
              className="px-4 py-2 border cursor-pointer select-none"
              onClick={() => {
                setSortAsc(!sortAsc);
                onSort();
              }}
            >
              First Name {sortAsc ? "▲" : "▼"}
            </th>
            <th className="px-4 py-2 border">Middle Name</th>
            <th className="px-4 py-2 border">Last Name</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Phone</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>

        <tbody>
          {sortedGuardians.map((guardian, index) => {
            const isEditing = editingId === guardian._id;

            return (
              <tr key={guardian._id} className="hover:bg-gray-50 text-sm">
                <td className="px-4 py-2 border">
                  {(page - 1) * limit + index + 1}
                </td>
                <td className="px-4 py-2 border">
                  {guardian.familyNumber ?? "—"}
                </td>

                <td className="px-4 py-2 border">
                  {isEditing ? (
                    <input
                      autoFocus
                      value={editData.firstName || ""}
                      onChange={(e) =>
                        handleChange("firstName", e.target.value)
                      }
                      className="border p-1 rounded w-full"
                    />
                  ) : (
                    guardian.firstName
                  )}
                </td>

                <td className="px-4 py-2 border">
                  {isEditing ? (
                    <input
                      value={editData.middleName || ""}
                      onChange={(e) =>
                        handleChange("middleName", e.target.value)
                      }
                      className="border p-1 rounded w-full"
                    />
                  ) : (
                    guardian.middleName
                  )}
                </td>

                <td className="px-4 py-2 border">
                  {isEditing ? (
                    <input
                      value={editData.lastName || ""}
                      onChange={(e) => handleChange("lastName", e.target.value)}
                      className="border p-1 rounded w-full"
                    />
                  ) : (
                    guardian.lastName
                  )}
                </td>

                <td className="px-4 py-2 border">
                  {isEditing ? (
                    <input
                      value={editData.email || ""}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className="border p-1 rounded w-full"
                    />
                  ) : (
                    guardian.email
                  )}
                </td>

                <td className="px-4 py-2 border">
                  {isEditing ? (
                    <input
                      value={editData.primaryPhoneNumber || ""}
                      onChange={(e) =>
                        handleChange("primaryPhoneNumber", e.target.value)
                      }
                      className="border p-1 rounded w-full"
                    />
                  ) : (
                    guardian.primaryPhoneNumber
                  )}
                </td>

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
                        title="Edit Guardian"
                        onClick={() => startEditing(guardian)}
                      >
                        <FaEdit className="text-green-600 hover:text-green-800" />
                      </button>
                      <button
                        title="Delete Guardian"
                        onClick={() => onDelete(guardian)}
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

export default GuardianTable;
