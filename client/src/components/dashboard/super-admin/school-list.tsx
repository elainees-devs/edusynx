// src/components/dashboard/super-admin/school-list.tsx
import React, { useEffect, useState } from "react";
import { fetchSchools } from "../../../api/school-api";
import { useSchoolEditHandlers } from "../../../utils/useSchoolEditHandlers";
import { schoolFields } from "../../../constants";
import { FaEdit, FaTrash } from "react-icons/fa";
import type { ISchool } from "../../../types";

const renderCell = (field: any, value: any, inputValue: any, isEditing: boolean, handleChange: any) => {
  if (!isEditing) {
    if (field.isLink && value) return <a href={value} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Website</a>;
    if (field.key === "isActive") return <span className={value ? "text-green-600 font-medium" : "text-gray font-medium"}>{value ? "Active" : "Inactive"}</span>;
    return value || "N/A";
  }
  return field.type === "checkbox" ? (
    <input type="checkbox" name={field.key} checked={!!inputValue} onChange={handleChange} />
  ) : (
    <input type={field.type} name={field.key} value={inputValue instanceof Date ? inputValue.toISOString().split("T")[0] : inputValue ?? ""} onChange={handleChange} className="w-full px-2 py-1 border" />
  );
};

const SchoolTable: React.FC = () => {
  const [schools, setSchools] = useState<ISchool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { editingSchoolId, editForm, handleChange, handleSave, handleCancel, handleEdit, handleDelete } = useSchoolEditHandlers(setSchools);

  useEffect(() => { fetchSchools().then(setSchools).catch(err => setError(err.message)).finally(() => setLoading(false)); }, []);

  return (
    <div className="p-4">
      <h2 className="mt-8 mb-4 text-xl font-semibold text-center">Registered Schools</h2>
      <table className="min-w-full text-sm border border-gray-300 table-auto">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">#</th>
            {schoolFields.map(f => <th key={f.key} className="p-2 border">{f.label}</th>)}
            <th className="p-2 border">Logo</th>
            <th className="p-2 border">Actions</th>
          </tr>
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
