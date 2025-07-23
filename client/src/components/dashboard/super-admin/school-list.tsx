// src/components/dashboard/super-admin/school-list.tsx
import React, { useEffect, useState } from "react";
import { fetchSchools } from "../../../api/school-api";
import { useSchoolEditHandlers } from "../../../utils/useSchoolEditHandlers";
import { schoolFields } from "../../../constants";
import { FaEdit, FaTrash } from "react-icons/fa";
import type { ISchool } from "../../../types";
import { logger } from "../../../utils/logger";
import { sendAccessLink } from "../../../api/email";

// Helper to format values safely for input fields
const normalizeValue = (
  val: string | number | boolean | Date | null | undefined
): string | number | undefined => {
  if (val instanceof Date) return val.toISOString().split("T")[0];
  if (typeof val === "boolean") return val ? "true" : "false"; // or "" if you prefer
  if (val === null || val === undefined) return "";
  return val;
};

const renderCell = (
  field: { key: string; label: string; type?: string; isLink?: boolean },
  value: string | number | boolean | null | undefined,
  inputValue: string | number | boolean | null | undefined,
  isEditing: boolean,
  handleChange: React.ChangeEventHandler<HTMLInputElement>
) => {
  if (!isEditing) {
    if (field.isLink && typeof value === "string") {
      return (
        <a
          href={value}
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 hover:underline"
        >
          Website
        </a>
      );
    }

    if (field.key === "isActive") {
      return (
        <span
          className={
            value ? "text-green-600 font-medium" : "text-gray-600 font-medium"
          }
        >
          {value === "true" ? "Active" : "Inactive"}

        </span>
      );
    }

    return value !== null && value !== undefined ? String(value) : "N/A";
  }

  if (field.type === "checkbox") {
    return (
      <input
        type="checkbox"
        name={field.key}
        checked={Boolean(inputValue === "true" || inputValue === true)}
        onChange={handleChange}
      />
    );
  }

  return (
    <input
      type={field.type || "text"}
      name={field.key}
      value={normalizeValue(inputValue)}
      onChange={handleChange}
      className="w-full px-2 py-1 border"
    />
  );
};

const SchoolTable: React.FC = () => {
  const [schools, setSchools] = useState<ISchool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sendingId, setSendingId] = useState<string | null>(null);
const [page, setPage] = useState(1);
const [limit] = useState(10);
const [totalPages, setTotalPages] = useState(1);



  const {
    editingSchoolId,
    editForm,
    handleChange,
    handleSave,
    handleCancel,
    handleEdit,
    handleDelete,
  } = useSchoolEditHandlers(setSchools);

useEffect(() => {
  setLoading(true);
  fetchSchools(page, limit)
    .then((data) => {
      setSchools(data.schools);
      setTotalPages(data.totalPages);
    })
    .catch((err) => {
      console.error(err);
      setError(err.message || "Error fetching schools");
    })
    .finally(() => setLoading(false));
}, [page, limit]);


  return (
    <div className="p-4 overflow-auto">
      <h2 className="mb-4 text-xl font-semibold text-center">
        Registered Schools
      </h2>
      <table className="text-sm border border-gray-300 table-auto">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">#</th>
            {schoolFields.map((f) => (
              <th key={f.key} className="p-2 border">
                {f.label}
              </th>
            ))}
            <th className="p-2 border">Logo</th>
            <th className="p-2 border">Actions</th>
            <th className="p-2 border">Link</th>
          </tr>
        </thead>
      <tbody>
  {loading ? (
    <tr>
      <td colSpan={schoolFields.length + 3} className="p-4 text-center">
        Loading schools...
      </td>
    </tr>
  ) : error ? (
    <tr>
      <td
        colSpan={schoolFields.length + 3}
        className="p-4 text-center text-red-600"
      >
        {error}
      </td>
    </tr>
  ) : schools.length === 0 ? (
    <tr>
      <td
        colSpan={schoolFields.length + 3}
        className="p-4 text-center text-gray-600"
      >
        No schools found.
      </td>
    </tr>
  ) : (
    schools.map((s, i) => {
      const isEditing = editingSchoolId === s._id;
      return (
        <tr key={s._id} className="border-t">
          <td className="p-2 text-center border">{(page - 1) * limit + i + 1}</td>

          {schoolFields.map((f) => (
            <td
              key={f.key}
              className={`p-2 border ${
                ["email", "website"].includes(f.key)
                  ? "break-all"
                  : "text-center"
              }`}
            >
              {renderCell(
                f,
                normalizeValue(s[f.key as keyof ISchool]),
                normalizeValue(editForm[f.key as keyof ISchool]),
                isEditing,
                handleChange
              )}
            </td>
          ))}
          <td className="p-2 text-center border">
            <img src={s.logoUrl} alt={s.name} className="h-8 mx-auto" />
          </td>
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
                  logger.error(
                    `Failed to send access link to ${s.email}`,
                    error
                  );
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
    })
  )}
</tbody>


      </table>
      <div className="flex justify-center items-center mt-4 space-x-4">
  <button
    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
    disabled={page === 1}
    className="px-4 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
  >
    Previous
  </button>

  <span className="text-sm font-medium">
    Page {page} of {totalPages}
  </span>

  <button
    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
    disabled={page === totalPages}
    className="px-4 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
  >
    Next
  </button>
</div>

    </div>
  );
};

export default SchoolTable;
