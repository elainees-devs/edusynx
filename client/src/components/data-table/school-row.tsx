// client/src/components/data-table/school-row.tsx
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import type { ISchool } from "../../types";
import { renderCell } from "./render-cell";
import { normalizeValue } from "../../utils";
import { sendAccessLink } from "../../api";
import { logger } from "../../utils/logger";

interface SchoolRowProps {
  s: ISchool;
  index: number;
  page: number;
  limit: number;
  editingSchoolId: string | null;
  editForm: Partial<ISchool>;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  handleSave: (id: string) => void;
  handleCancel: () => void;
  handleEdit: (school: ISchool) => void;
  handleDelete: (id: string) => void;
  sendingId: string | null;
  setSendingId: React.Dispatch<React.SetStateAction<string | null>>;
}

const SchoolRow: React.FC<SchoolRowProps> = ({
  s,
  index,
  page,
  limit,
  editingSchoolId,
  editForm,
  handleChange,
  handleSave,
  handleCancel,
  handleEdit,
  handleDelete,
  sendingId,
  setSendingId,
}) => {
  const isEditing = editingSchoolId === s._id;

  return (
    <tr key={s._id} className="border-t">
      <td className="p-2 text-center border">{(page - 1) * limit + index + 1}</td>

      {/* Dynamic fields */}
      {Object.keys(editForm).map((key) => (
        <td
          key={key}
          className={`p-2 border ${
            ["email", "website"].includes(key) ? "break-all" : "text-center"
          }`}
        >
          {renderCell(
            { key, label: key },
            normalizeValue(s[key as keyof ISchool]),
            normalizeValue(editForm[key as keyof ISchool]),
            isEditing,
            handleChange
          )}
        </td>
      ))}

      {/* Logo */}
      <td className="p-2 text-center border">
        <img src={s.logoUrl} alt={s.name} className="h-8 mx-auto" />
      </td>

      {/* Actions */}
      <td className="p-2 text-center border">
        {isEditing ? (
          <>
            <button
              onClick={() => handleSave(s._id!)}
              className="text-teal-600 hover:underline mr-2"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="text-gray-600 hover:underline"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              title="Edit"
              onClick={() => handleEdit(s)}
              className="text-blue-500 hover:text-blue-700 mr-2"
            >
              <FaEdit />
            </button>
            <button
              title="Delete"
              onClick={() => handleDelete(s._id!)}
              className="text-red-500 hover:text-red-700"
            >
              <FaTrash />
            </button>
          </>
        )}
      </td>

      {/* Send Link */}
      <td className="p-2 text-center border">
        <button
          disabled={sendingId === s._id}
          onClick={async () => {
            if (!s.accessUrl) return alert("Access URL is missing for this school.");
            try {
              setSendingId(s._id!);
              logger.info(`Sending access link to ${s.email}`);
              const msg = await sendAccessLink(s.email, s.accessUrl);
              alert(msg);
            } catch (error) {
              logger.error(`Failed to send access link to ${s.email}`, error);
              alert("Failed to send access link.");
            } finally {
              setSendingId(null);
            }
          }}
          className={`px-2 py-1 text-sm text-white rounded ${
            sendingId === s._id
              ? "bg-gray-500"
              : "bg-teal-400 hover:bg-teal-200 hover:text-gray"
          }`}
        >
          {sendingId === s._id ? "Sending..." : "Send Link"}
        </button>
      </td>
    </tr>
  );
};

export default SchoolRow;
