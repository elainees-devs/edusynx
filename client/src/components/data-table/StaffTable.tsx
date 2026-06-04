import React, { useState } from "react";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";
import type { IStaff } from "../../types/people/StaffTypes";
import { countStaff } from "../../api/StaffApi";

interface StaffTableProps {
  staff: IStaff[];
  onSort: () => void;
  onEdit: (id: string, updated: Partial<IStaff>) => void;
  onDelete: (staff: IStaff) => void;
  onToggleStatus: (id: string) => void;
  page: number;
  limit: number;
}

const roleBadge = (role: string) => {
  const colors: Record<string, string> = {
    principal: "bg-red-100 text-red-800",
    "deputy-principal": "bg-orange-100 text-orange-800",
    teacher: "bg-blue-100 text-blue-800",
    accountant: "bg-green-100 text-green-800",
    "school-admin": "bg-purple-100 text-purple-800",
  };
  return colors[role] ?? "bg-gray-100 text-gray-800";
};

const StaffTable: React.FC<StaffTableProps> = ({
  staff,
  onEdit,
  onDelete,
  onToggleStatus,
  page,
  limit,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<IStaff>>({});
  const [sortAsc, setSortAsc] = useState(true);
  const [totalStaff, setTotalStaff] = useState(0);

  const sortedStaff = [...staff].sort((a, b) => {
    const nameA = (a.firstName + a.lastName).toLowerCase();
    const nameB = (b.firstName + b.lastName).toLowerCase();
    return sortAsc ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
  });

  const startEditing = (s: IStaff) => {
    setEditingId(s._id!);
    setEditData({
      firstName: s.firstName,
      middleName: s.middleName,
      lastName: s.lastName,
      primaryPhoneNumber: s.primaryPhoneNumber,
      email: s.email,
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleChange = (field: keyof Partial<IStaff>, value: string) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  const saveEdit = () => {
    if (!editingId) return;
    onEdit(editingId, editData);
    cancelEditing();
  };

  React.useEffect(() => {
    countStaff("").then((res) => setTotalStaff(res.count)).catch(() => {});
  }, []);

  return (
    <div className="overflow-x-auto">
      <p className="mb-2 mr-8 text-right font-semibold text-gray-700">
        Total staff: <span className="table-data-count">{totalStaff}</span>
      </p>
      <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr className="text-left text-sm font-semibold text-gray-700">
            <th className="px-4 py-2 border">#</th>
            <th className="px-4 py-2 border">Employee No</th>
            <th
              className="px-4 py-2 border cursor-pointer select-none"
              onClick={() => setSortAsc((prev) => !prev)}
            >
              Names {sortAsc ? "▲" : "▼"}
            </th>
            <th className="px-4 py-2 border">Phone</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Role</th>
            <th className="px-4 py-2 border">Department</th>
            <th className="px-4 py-2 border">Position</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {sortedStaff.map((s, index) => {
            const isEditing = editingId === s._id;
            return (
              <tr key={s._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{(page - 1) * limit + index + 1}</td>
                <td className="px-4 py-2 border">{s.employeeNumber}</td>
                <td className="px-4 py-2 border">
                  {isEditing ? (
                    <div className="flex flex-col gap-1">
                      <input className="border p-1 rounded" placeholder="First" value={editData.firstName || ""} onChange={(e) => handleChange("firstName", e.target.value)} />
                      <input className="border p-1 rounded" placeholder="Middle" value={editData.middleName || ""} onChange={(e) => handleChange("middleName", e.target.value)} />
                      <input className="border p-1 rounded" placeholder="Last" value={editData.lastName || ""} onChange={(e) => handleChange("lastName", e.target.value)} />
                    </div>
                  ) : (
                    `${s.firstName} ${s.middleName ? s.middleName + " " : ""}${s.lastName}`
                  )}
                </td>
                <td className="px-4 py-2 border">
                  {isEditing ? (
                    <input className="border p-1 rounded w-full" value={editData.primaryPhoneNumber || ""} onChange={(e) => handleChange("primaryPhoneNumber", e.target.value)} />
                  ) : (
                    s.primaryPhoneNumber
                  )}
                </td>
                <td className="px-4 py-2 border">
                  {isEditing ? (
                    <input className="border p-1 rounded w-full" value={editData.email || ""} onChange={(e) => handleChange("email", e.target.value)} />
                  ) : (
                    s.email
                  )}
                </td>
                <td className="px-4 py-2 border">
                  <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${roleBadge(s.role)}`}>
                    {s.role}
                  </span>
                </td>
                <td className="px-4 py-2 border">
                  {typeof s.department === "object" && s.department !== null
                    ? (s.department as { departmentName?: string }).departmentName ?? "-"
                    : "-"}
                </td>
                <td className="px-4 py-2 border">{s.position || "-"}</td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => onToggleStatus(s._id!)}
                    className={s.isActive ? "text-green-600 hover:text-green-800" : "text-red-600 hover:text-red-800"}
                  >
                    {s.isActive ? "Active" : "Inactive"}
                  </button>
                </td>
                <td className="px-4 py-2 border flex gap-3">
                  {isEditing ? (
                    <>
                      <button onClick={saveEdit} title="Save"><FaSave className="text-green-600 hover:text-green-800" /></button>
                      <button onClick={cancelEditing} title="Cancel"><FaTimes className="text-gray-600 hover:text-gray-800" /></button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => startEditing(s)} title="Edit"><FaEdit className="text-green-600 hover:text-green-800" /></button>
                      <button onClick={() => onDelete(s)} title="Delete"><FaTrash className="text-red-600 hover:text-red-800" /></button>
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

export default StaffTable;
