// src/components/dashboard/super-admin/school-list.tsx
import React, { useEffect, useState } from "react";
import { fetchSchools } from "../../../api/school-api";
import { useSchoolEditHandlers } from "../../../utils/useSchoolEditHandlers";
import { schoolFields } from "../../../constants";
import { FaEdit, FaTrash } from "react-icons/fa";
import type { ISchool } from "../../../types";
import { logger } from "../../../utils/logger";
import { sendAccessLink } from "../../../api/email";

const renderCell = (f: any, v: any, i: any, e: boolean, h: any) => {
  if (!e) {
    if (f.isLink && v) return <a href={v} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Website</a>;
    if (f.key === "isActive") return <span className={v ? "text-green-600 font-medium" : "text-gray font-medium"}>{v ? "Active" : "Inactive"}</span>;
    return v || "N/A";
  }
  return f.type === "checkbox" ? <input type="checkbox" name={f.key} checked={!!i} onChange={h} /> : <input type={f.type} name={f.key} value={i instanceof Date ? i.toISOString().split("T")[0] : i ?? ""} onChange={h} className="w-full px-2 py-1 border" />;
};

const SchoolTable: React.FC = () => {
  const [schools, setSchools] = useState<ISchool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { editingSchoolId, editForm, handleChange, handleSave, handleCancel, handleEdit, handleDelete } = useSchoolEditHandlers(setSchools);

  useEffect(() => {
    fetchSchools().then(setSchools).catch((err) => setError(err.message)).finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-4">
      <h2 className="mt-8 mb-4 text-xl font-semibold text-center">Registered Schools</h2>
      <table className="min-w-full text-sm border border-gray-300 table-auto">
        <thead className="bg-gray-100">
          <tr><th className="p-2 border">#</th>{schoolFields.map(f => <th key={f.key} className="p-2 border">{f.label}</th>)}<th className="p-2 border">Logo</th><th className="p-2 border">Actions</th><th className="p-2 border">Link</th></tr>
        </thead>
        <tbody>
          {schools.map((s, i) => {
            const isEditing = editingSchoolId === s._id;
            return (
              <tr key={s._id} className="border-t">
                <td className="p-2 text-center border">{i + 1}</td>
                {schoolFields.map(f => (
                  <td key={f.key} className={`p-2 border ${["email", "website"].includes(f.key) ? "break-all" : "text-center"}`}>
                    {renderCell(f, s[f.key as keyof ISchool], editForm[f.key as keyof ISchool], isEditing, handleChange)}
                  </td>
                ))}
                <td className="p-2 text-center border"><img src={s.logoUrl} alt={s.name} className="h-8 mx-auto" /></td>
                <td className="flex justify-center gap-2 p-2 border">
                  {isEditing ? (
                    <>
                      <button onClick={() => handleSave(s._id!)} className="text-green-600 hover:underline">Save</button>
                      <button onClick={handleCancel} className="text-gray-600 hover:underline">Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(s)} className="text-blue-500 hover:text-blue-700"><FaEdit /></button>
                      <button onClick={() => handleDelete(s._id!)} className="text-red-500 hover:text-red-700"><FaTrash /></button>
                    </>
                  )}
                </td>
                <td className="p-2 text-center border">
                  <button onClick={async () => {
                    if (!s.accessUrl) return alert("Access URL is missing for this school.");
                    try {
                      logger.info(`Sending access link to ${s.email}`);
                      alert(await sendAccessLink(s.email, s.accessUrl));
                    } catch (error) {
                      logger.error(`Failed to send access link to ${s.email}`, error);
                      alert("Failed to send access link.");
                    }
                  }} className="px-2 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700">Send Link</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {loading && <p className="mt-4 text-center">Loading...</p>}
      {error && <p className="mt-4 text-center text-red-600">{error}</p>}
    </div>
  );
};

export default SchoolTable;
