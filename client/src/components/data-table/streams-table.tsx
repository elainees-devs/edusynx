// client/src/components/tables/streams-table.tsx
import React, { useState } from "react";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";
import type { IStream } from "../../types";

interface StreamsTableProps {
  streams?: IStream[];
  onEdit: (id: string, updatedData: Partial<IStream>) => void;
  onDelete: (stream: IStream) => void;
  onSort: () => void;
  page: number;
  limit: number;
}

const StreamsTable: React.FC<StreamsTableProps> = ({
  streams,
  onEdit,
  onDelete,
  page,
  limit,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<IStream>>({});

  const startEditing = (stream: IStream) => {
    setEditingId(stream._id);
    setEditData({
      streamName: stream.streamName,
      academicYear: stream.academicYear,
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleChange = (field: keyof Partial<IStream>, value: string) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  const saveEdit = () => {
    if (!editingId) return;
    onEdit(editingId, {
      streamName: editData.streamName?.trim(),
      academicYear: editData.academicYear,
    });
    cancelEditing();
  };

  if (!streams || streams.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">No streams found.</div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr className="text-left text-sm font-semibold text-gray-700">
            <th className="px-4 py-2 border">#</th>
            <th className="px-4 py-2 border">Stream Name</th>
            <th className="px-4 py-2 border">Academic Year</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>

        <tbody>
          {streams
            .slice((page - 1) * limit, page * limit)
            .map((stream, index) => {
              const isEditing = editingId === stream._id;

              return (
                <tr key={stream._id} className="hover:bg-gray-50 text-sm">
                  <td className="px-4 py-2 border">
                    {(page - 1) * limit + index + 1}
                  </td>

                  <td className="px-4 py-2 border">
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.streamName || ""}
                        onChange={(e) =>
                          handleChange("streamName", e.target.value)
                        }
                        className="border p-1 rounded w-full"
                      />
                    ) : (
                      stream.streamName
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
                      stream.academicYear
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
                          title="Edit Stream"
                          onClick={() => startEditing(stream)}
                        >
                          <FaEdit className="text-green-600 hover:text-green-800" />
                        </button>
                        <button
                          type="button"
                          title="Delete Stream"
                          onClick={() => onDelete(stream)}
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

export default StreamsTable;
