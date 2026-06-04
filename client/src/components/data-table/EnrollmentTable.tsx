import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import type { IEnrollment } from "../../types/academics/EnrollmentTypes";

interface Props {
  data: IEnrollment[];
  onEdit: (item: IEnrollment) => void;
  onDelete: (id: string) => void;
  page: number;
  limit: number;
}

const statusBadge = (status: string) => {
  const classes: Record<string, string> = {
    active: "bg-green-100 text-green-800",
    transferred: "bg-yellow-100 text-yellow-800",
    withdrawn: "bg-red-100 text-red-800",
    graduated: "bg-blue-100 text-blue-800",
  };
  return classes[status] || "bg-gray-100 text-gray-600";
};

const EnrollmentTable: React.FC<Props> = ({ data, onEdit, onDelete, page, limit }) => {
  if (data.length === 0) {
    return <div className="text-center py-4 text-gray-500">No enrollments found.</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr className="text-left text-sm font-semibold text-gray-700">
            <th className="px-4 py-2 border">#</th>
            <th className="px-4 py-2 border">Student</th>
            <th className="px-4 py-2 border">Class</th>
            <th className="px-4 py-2 border">Stream</th>
            <th className="px-4 py-2 border">Academic Year</th>
            <th className="px-4 py-2 border">Enrollment Date</th>
            <th className="px-4 py-2 border">Type</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            const startIdx = (page - 1) * limit;
            return (
              <tr key={item._id} className="hover:bg-gray-50 text-sm">
                <td className="px-4 py-2 border">{startIdx + index + 1}</td>
                <td className="px-4 py-2 border">{item.student}</td>
                <td className="px-4 py-2 border">{item.clas}</td>
                <td className="px-4 py-2 border">{item.stream}</td>
                <td className="px-4 py-2 border">{item.academicYear}</td>
                <td className="px-4 py-2 border">
                  {new Date(item.enrollmentDate).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border capitalize">{item.enrollmentType}</td>
                <td className="px-4 py-2 border">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${statusBadge(item.status)}`}>
                    {item.status}
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

export default EnrollmentTable;
