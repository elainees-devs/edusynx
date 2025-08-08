// client/src/components/data-table/teacher-list.tsx
import React, { useState } from "react";
import SearchBar from "../../shared/layout/ui/SearchBar";
import type { Teacher } from "../../types/school/allocation";


export interface TeacherDetailsProps {
  teachers: Teacher[];
  onEdit: (teacherId: string) => void;
  onToggleStatus: (teacherId: string) => void;
}

const TeacherList: React.FC<TeacherDetailsProps> = ({
  teachers,
  onEdit,
  onToggleStatus,
}) => {
  const [sortAsc, setSortAsc] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSort = () => setSortAsc((prev) => !prev);

  const filteredTeachers = teachers.filter((teacher) =>
    (`${teacher.firstName} ${teacher.middleName} ${teacher.lastName}`)
  .toLowerCase()
  .includes(searchTerm.toLowerCase())

  );

  const sortedTeachers = [...filteredTeachers].sort((a, b) => {
    const nameA = `${a.firstName} ${a.middleName} ${a.lastName}`.toLowerCase();
    const nameB = `${b.firstName} ${b.middleName} ${b.lastName}`.toLowerCase();
    return sortAsc ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
  });

  return (
    <div className="mt-4">
      {/* Search */}
      <div className="mb-4">
        <SearchBar
          placeholder="Search by first name..."
          value={searchTerm}
          onChange={setSearchTerm}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700">#</th>
              <th
                onClick={handleSort}
                className="cursor-pointer border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700"
                title="Click to sort by name"
              >
                Full Name {sortAsc ? "▲" : "▼"}
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Email
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Primary Phone
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Secondary Phone
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Status
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-800">
            {sortedTeachers.map((teacher, index) => (
              <tr key={teacher.id} className="border border-gray-300 hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 text-center font-mono text-sm text-gray-600">
                  {index + 1}
                </td>
                <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">
                  {teacher.firstName} {teacher.middleName} {teacher.lastName}
                </td>
                <td className="border border-gray-300 px-4 py-2">{teacher.email}</td>
                <td className="border border-gray-300 px-4 py-2">{teacher.primaryPhoneNumber}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {teacher.secondaryPhoneNumber || <span className="text-gray-400">—</span>}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      teacher.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}
                  >
                    {teacher.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onEdit(teacher.id)}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onToggleStatus(teacher.id)}
                      className="text-gray-600 hover:text-gray-800 text-sm"
                    >
                      {teacher.isActive ? "Deactivate" : "Activate"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {sortedTeachers.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center px-4 py-6 text-gray-500 italic border border-gray-300">
                  No teachers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherList;
