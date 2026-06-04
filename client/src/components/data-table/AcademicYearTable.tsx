import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import type { IAcademicYear } from "../../types/school/AcademicYearTypes";

interface Props {
  data: IAcademicYear[];
  onEdit: (item: IAcademicYear) => void;
  onDelete: (id: string) => void;
  page: number;
  limit: number;
}

const AcademicYearTable: React.FC<Props> = ({ data, onEdit, onDelete, page, limit }) => {
  if (data.length === 0) {
    return <div className="text-center py-4 text-gray-500">No academic years found.</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr className="text-left text-sm font-semibold text-gray-700">
            <th className="px-4 py-2 border">#</th>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Start Date</th>
            <th className="px-4 py-2 border">End Date</th>
            <th className="px-4 py-2 border">Terms</th>
            <th className="px-4 py-2 border">Active</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            const startIdx = (page - 1) * limit;
            return (
              <tr key={item._id} className="hover:bg-gray-50 text-sm">
                <td className="px-4 py-2 border">{startIdx + index + 1}</td>
                <td className="px-4 py-2 border">{item.name}</td>
                <td className="px-4 py-2 border">{new Date(item.startDate).toLocaleDateString()}</td>
                <td className="px-4 py-2 border">{new Date(item.endDate).toLocaleDateString()}</td>
                <td className="px-4 py-2 border">{item.terms?.length ?? 0}</td>
                <td className="px-4 py-2 border">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      item.isActive
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {item.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-2 border">
                  <div className="flex gap-2">
                    <button type="button" title="Edit" onClick={() => onEdit(item)}>
                      <FaEdit className="text-green-600 hover:text-green-800" />
                    </button>
                    <button type="button" title="Delete" onClick={() => onDelete(item._id)}>
                      <FaTrash className="text-red-600 hover:text-red-800" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AcademicYearTable;
