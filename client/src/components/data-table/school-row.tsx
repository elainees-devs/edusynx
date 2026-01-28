// client/src/components/data-table/school-row.tsx
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import type { ISchool } from "../../types";
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
      <td className="p-2 text-center border">
        {(page - 1) * limit + index + 1}
      </td>
      
      {/* Name */}
      <td className="p-2 text-center border">
        {isEditing ? (
          <input
            type="text"
            name="name"
            value={editForm.name || ""}
            onChange={handleChange}
            className="border rounded p-1 w-full"
          />
        ) : (
          s.name
        )}
      </td>

      {/* Address */}
      <td className="p-2 text-center border">
        {isEditing ? (
          <input
            type="text"
            name="address"
            value={editForm.address || ""}
            onChange={handleChange}
            className="border rounded p-1 w-full"
          />
        ) : (
          s.address
        )}
      </td>

      {/* Phone */}
      <td className="p-2 text-center border">
        {isEditing ? (
          <input
            type="text"
            name="phone"
            value={editForm.phoneNumber || ""}
            onChange={handleChange}
            className="border rounded p-1 w-full"
          />
        ) : (
          s.phoneNumber
        )}
      </td>

      {/* Email*/}
      <td className="p-2 text-center border">
        {isEditing ? (
          <input
            type="email"
            name="email"
            value={editForm.email || ""}
            onChange={handleChange}
            className="border rounded p-1 w-full"
          />
        ) : (
          s.email
        )}
      </td>

      {/* Website */}
      <td className="p-2 text-center border">
        {isEditing ? (
          <input
            type="text"
            name="website"
            value={editForm.website || ""}
            onChange={handleChange}
            className="border rounded p-1 w-full"
          />
        ) : (
          s.website
        )}
      </td>

      {/* Year */}
      <td className="p-2 text-center border">
        {isEditing ? (
          <input
            type="number"
            name="establishedYear"
            value={editForm.establishedYear || ""}
            onChange={handleChange}
            className="border rounded p-1 w-full"
          />
        ) : (
          s.establishedYear
        )}
      </td>

      {/* Status */}
      <td className="p-2 text-center border">
        {isEditing ? (
          <input
            type="checkbox"
            name="isActive"
            checked={editForm.isActive || false}
            onChange={(e) => {
              handleChange({
                target: {
                  name: "isActive",
                  value: e.target.checked.toString(),
                  type: "checkbox",
                  checked: e.target.checked,
                },
              } as React.ChangeEvent<HTMLInputElement>);
            }}
            className="w-4 h-4 cursor-pointer"
          />
        ) : (
          <span
            className={`font-medium ${
              s.isActive ? "text-green-600" : "text-red-600"
            }`}
          >
            {s.isActive ? "Active" : "Inactive"}
          </span>
        )}
      </td>

      {/* School Code */}
      <td className="p-2 text-center border">
        {isEditing ? (
          <input
            type="text"
            name="schoolCode"
            value={editForm.schoolCode || ""}
            onChange={handleChange}
            className="border rounded p-1 w-full"
          />
        ) : (
          s.schoolCode
        )}
      </td>
      {/* Access Link */}
      <td className="p-2 text-center border break-all">
        {isEditing ? (
          <input
            type="url"
            name="accessUrl"
            value={editForm.accessUrl || ""}
            onChange={handleChange}
            className="border rounded p-1 w-full"
            placeholder="https://example.com"
          />
        ) : (
          <a
            href={s.accessUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {s.accessUrl}
          </a>
        )}
      </td>

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
            if (!s.accessUrl)
              return alert("Access URL is missing for this school.");
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
