import React from "react";
import type { ICompetency } from "../../types";

interface Props {
  competencies: ICompetency[];
  page: number;
  limit: number;
  onSort?: () => void;
  onEdit?: (id: string, data: Partial<ICompetency>) => void;
  onDelete?: (competency: ICompetency) => void;
}

const CompetencyTable: React.FC<Props> = ({ competencies, onEdit, onDelete }) => {
  return (
    <table className="min-w-full border">
      <thead>
        <tr>
          <th className="border px-2 py-1">Code</th>
          <th className="border px-2 py-1">Title</th>
          <th className="border px-2 py-1">Description</th>
          <th className="border px-2 py-1">Actions</th>
        </tr>
      </thead>
      <tbody>
        {competencies.map((comp) => (
          <tr key={comp._id}>
            <td className="border px-2 py-1">{comp.code}</td>
            <td className="border px-2 py-1">{comp.title}</td>
            <td className="border px-2 py-1">{comp.description || "-"}</td>
            <td className="border px-2 py-1 space-x-2">
              {onEdit && (
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => onEdit(comp._id, comp)}
                >
                  Edit
                </button>
              )}
              {onDelete && (
                <button
                  className="text-red-600 hover:underline"
                  onClick={() => onDelete(comp)}
                >
                  Delete
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CompetencyTable;
