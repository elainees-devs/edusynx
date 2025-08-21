// client/src/components/data-table/guardian-table.tsx
import React from "react";
import type { Guardian } from "../../types";
import { IconButton } from "../../shared";

interface GuardianTableProps {
  guardians: Guardian[];
  sortAsc: boolean;
  onSort: () => void;
  onAdd: () => void;
  onEdit: (guardian: Guardian) => void;
  onDelete: (guardian: Guardian) => void;
}

const GuardianTable: React.FC<GuardianTableProps> = ({
  guardians,
  sortAsc,
  onSort,
  onAdd,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr className="text-left text-sm font-semibold text-gray-700">
            <th className="px-4 py-2 border">#</th>
            <th className="px-4 py-2 border">Family Number</th>
            <th
              className="px-4 py-2 border cursor-pointer select-none"
              onClick={onSort}
            >
              First Name {sortAsc ? "▲" : "▼"}
            </th>
            <th
              className="px-4 py-2 border cursor-pointer select-none"
              onClick={onSort}
            >
              Middle {sortAsc ? "▲" : "▼"}
            </th>
            <th
              className="px-4 py-2 border cursor-pointer select-none"
              onClick={onSort}
            >
              Last Name {sortAsc ? "▲" : "▼"}
            </th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Phone Number</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {guardians.map((guardian, index) => (
            <tr key={guardian._id} className="hover:bg-gray-50 text-sm">
              <td className="px-4 py-2 border">{index + 1}</td>
              <td className="px-4 py-2 border">{guardian.familyNumber}</td>
              <td className="px-4 py-2 border">{guardian.firstName}</td>
              <td className="px-4 py-2 border">{guardian.middleName}</td>
              <td className="px-4 py-2 border">{guardian.lastName}</td>
              <td className="px-4 py-2 border">{guardian.email}</td>
              <td className="px-4 py-2 border">{guardian.primaryPhoneNumber}</td>
              <td className="px-4 py-2 border flex gap-1">
                <IconButton title="Add Guardian" type="add" onClick={onAdd} />
                <IconButton
                  title="Edit Guardian"
                  type="edit"
                  onClick={() => onEdit(guardian)}
                />
                <IconButton
                  title="Delete Guardian"
                  type="delete"
                  onClick={() => onDelete(guardian)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GuardianTable;
