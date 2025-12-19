// client/src/components/data-list/teacher-list.tsx
import React from "react";
import type { Teacher } from "../../types/school/allocation";
import { SearchBar } from "../../shared";
import { searchConfig } from "../../constants";
import { useTeacherSearchSort } from "../../hooks/useTeacherSearchSort";
import TeacherTable from "../data-table/teacher-table";

interface TeacherListProps {
  teachers: Teacher[];

  /* inline edit state */
  editingId: string | null;
  editData: Partial<Teacher>;

  /* handlers */
  onEditStart: (teacher: Teacher) => void;
  onEditChange: (field: keyof Teacher, value: string) => void;
  onEditSave: (id: string) => void;
  onEditCancel: () => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

const TeacherList: React.FC<TeacherListProps> = ({
  teachers,
  editingId,
  editData,
  onEditStart,
  onEditChange,
  onEditSave,
  onEditCancel,
  onDelete,
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
        editingId={editingId}
        editData={editData}
        onToggleSort={toggleSort}
        onToggleStatus={onToggleStatus}
        onEditStart={onEditStart}
        onEditChange={onEditChange}
        onEditSave={onEditSave}
        onEditCancel={onEditCancel}
        onDelete={onDelete}
      />
    </div>
  );
};

export default TeacherList;
