// client/src/components/data-table/class-table.tsx
import React from "react";
import type { IClass } from "../../types";

interface ClassTableProps {
  classes: IClass[];
  onEdit: (cls: IClass) => void;
}

const ClassTable: React.FC<ClassTableProps> = ({ classes, onEdit }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border rounded-lg shadow-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border-b text-left">Class Name</th>
            <th className="p-3 border-b text-left">Stream</th>
            <th className="p-3 border-b text-left">Academic Year</th>
            <th className="p-3 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {classes.length > 0 ? (
            classes.map((cls) => (
              <tr key={cls._id} className="hover:bg-gray-50">
                <td className="p-3 border-b">{cls.grade}</td>
                <td className="p-3 border-b">
                  {typeof cls.stream === "string" ? cls.stream : cls.stream.streamName}
                </td>
                <td className="p-3 border-b">{cls.academicYear}</td>
                <td className="p-3 border-b">
                  <button
                    onClick={() => onEdit(cls)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center py-4 text-gray-500">
                No classes found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ClassTable;
