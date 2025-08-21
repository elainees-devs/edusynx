// client/src/components/data-list/teacher-list.tsx
import React from "react";
import type { Teacher } from "../../types/school/allocation";
import { SearchBar } from "../../shared";
import { searchConfig } from "../../constants";
import { useTeacherSearchSort } from "../../hooks/useTeacherSearchSort";
import TeacherTable from "../data-table/teacher-table";

interface TeacherListProps {
  teachers: Teacher[];
  onEdit: (teacherId: string) => void;
  onToggleStatus: (teacherId: string) => void;
}

const TeacherList: React.FC<TeacherListProps> = ({
  teachers,
  onEdit,
  onToggleStatus,
}) => {
  const {
    sortAsc,
    searchTerm,
    setSearchTerm,
    toggleSort,
    sortedTeachers,
  } = useTeacherSearchSort(teachers);

  return (
    <div className="mt-4">
      {/* Search */}
      <div className="mb-4">
        <SearchBar
          placeholder={searchConfig.teacher.placeholder}
          value={searchTerm}
          onChange={setSearchTerm}
        />
      </div>

      {/* Table */}
      <TeacherTable
        teachers={sortedTeachers}
        sortAsc={sortAsc}
        onToggleSort={toggleSort}
        onEdit={onEdit}
        onToggleStatus={onToggleStatus}
      />
    </div>
  );
};

export default TeacherList;
