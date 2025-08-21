// client/src/components/data-table/school-list.tsx
import React, { useEffect, useState } from "react";
import { useSchoolEditHandlers } from "../../utils/useSchoolEditHandlers";
import { schoolFields } from "../../constants";
import type { ISchool } from "../../types";
import { fetchSchools } from "../../api";
import SchoolRow from "../data-table/school-row";
import { Pagination } from "../../shared";


const SchoolList: React.FC = () => {
  const [schools, setSchools] = useState<ISchool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sendingId, setSendingId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const { editingSchoolId, editForm, handleChange, handleSave, handleCancel, handleEdit, handleDelete } =
    useSchoolEditHandlers(setSchools);

  useEffect(() => {
    setLoading(true);
    fetchSchools(page, limit)
      .then((data) => {
        setSchools(data.schools);
        setTotalPages(data.totalPages);
      })
      .catch((err) => setError(err.message || "Error fetching schools"))
      .finally(() => setLoading(false));
  }, [page, limit]);

  return (
    <div className="p-4 overflow-auto">
      <h2 className="mb-4 text-xl font-semibold text-center">Registered Schools</h2>
      <table className="text-sm border border-gray-300 table-auto">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">#</th>
            {schoolFields.map((f) => (
              <th key={f.key} className="p-2 border">{f.label}</th>
            ))}
            <th className="p-2 border">Logo</th>
            <th className="p-2 border">Actions</th>
            <th className="p-2 border">Link</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan={schoolFields.length + 3} className="p-4 text-center">Loading schools...</td></tr>
          ) : error ? (
            <tr><td colSpan={schoolFields.length + 3} className="p-4 text-center text-red-600">{error}</td></tr>
          ) : schools.length === 0 ? (
            <tr><td colSpan={schoolFields.length + 3} className="p-4 text-center text-gray-600">No schools found.</td></tr>
          ) : (
            schools.map((s, i) => (
              <SchoolRow
                key={s._id}
                s={s}
                index={i}
                page={page}
                limit={limit}
                editingSchoolId={editingSchoolId}
                editForm={editForm}
                handleChange={handleChange}
                handleSave={handleSave}
                handleCancel={handleCancel}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                sendingId={sendingId}
                setSendingId={setSendingId}
              />
            ))
          )}
        </tbody>
      </table>
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
};

export default SchoolList;
