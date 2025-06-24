// client/src/components/dashboard/super-admin/school-list.tsx
import React, { useEffect, useState } from "react";
import type { ISchool } from "../../../types";
import { fetchSchools } from "../../../api/school-api";
import { FaEdit, FaTrash } from "react-icons/fa";

const SchoolTable: React.FC = () => {
  const [schools, setSchools] = useState<ISchool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSchools = async () => {
      try {
        const schoolData = await fetchSchools();
        setSchools(schoolData);
      } catch (err: any) {
        setError(err?.message || "Failed to fetch schoola");
      } finally {
        setLoading(false);
      }
    };
    loadSchools();
  }, []);

  const handleEdit = (id: string) => {
    console.log("Edit", id);
  };

  const handleDelete = (id: string) => {
    console.log("Delete", id);
  };

  return (
    <div className="p-4">
      <h2 className="mt-8 mb-4 text-xl font-semibold text-center">
        Registered Schools
      </h2>

      <table className="min-w-full text-sm border border-gray-300 table-auto">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border border-gray-300">#</th>
            <th className="p-2 border border-gray-300">Name</th>
            <th className="p-2 border border-gray-300">Address</th>
            <th className="p-2 border border-gray-300">Phone</th>
            <th className="p-2 border border-gray-300">Email</th>
            <th className="p-2 border border-gray-300">Website</th>
            <th className="p-2 border border-gray-300">Year</th>
            <th className="p-2 border border-gray-300">Logo</th>
            <th className="p-2 border border-gray-300">Status</th>
            <th className="p-2 border border-gray-300">Code</th>
            <th className="p-2 border border-gray-300">AccessLink</th>
            <th className="p-2 border border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {schools.map((school, index) => (
            <tr key={school._id} className="border-t border-gray-300">
              <td className="p-2 text-center border border-gray-300">
                {index + 1}
              </td>
              <td className="p-2 border border-gray-300">{school.name}</td>
              <td className="p-2 border border-gray-300">{school.address}</td>
              <td className="p-2 border border-gray-300">
                {school.phoneNumber}
              </td>
              <td className="p-2 border border-gray-300">{school.email}</td>
              <td className="p-2 border border-gray-300">
                {school.website ? (
                  <a
                    href={school.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Website
                  </a>
                ) : (
                  "N/A"
                )}
              </td>
              <td className="p-2 text-center border border-gray-300">
                {school.establishedYear}
              </td>
              <td className="p-2 text-center border border-gray-300">
                <img
                  src={school.logoUrl}
                  alt={school.name}
                  className="h-8 mx-auto"
                />
              </td>
              <td className="p-2 text-center border border-gray-300">
                <span
                  className={
                    school.isActive
                      ? "text-green-600 font-medium"
                      : "text-gray font-medium"
                  }
                >
                  {school.isActive ? "Active" : "Inactive"}
                </span>
              </td>
              <td className="p-2 text-center border border-gray-300">
                {school.schoolCode}
              </td>

              <td className="p-2 text-center border border-gray-300">
                {school.accessUrl}
              </td>
              <td className="flex justify-center gap-2 p-2 border border-gray-300">
                <button
                  onClick={() => handleEdit(school._id!)}
                  className="text-blue-500 hover:text-blue-700"
                  title="Edit"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(school._id!)}
                  className="text-red-500 hover:text-red-700"
                  title="Delete"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SchoolTable;
