// client/src/components/data-list/class-list.tsx
import React from "react";
import type { IClass } from "../../types";
import { ClassTable } from "../data-table";
import { Pagination } from "../../shared";
import { ClassFilterForm } from "../forms";

interface ClassProps {
  classOptions: string[];
  streams: string[];
  classes: IClass[];
  selectedClass: string;
  selectedStream: string;
  currentPage: number;
  totalPages: number;
  onFilterChange: (filters: { grade: string; stream: string }) => void;
  onResetFilters: () => void;
  onEdit: (cls: IClass) => void;
  onPageChange: (newPage: number) => void;
}

const ClassList: React.FC<ClassProps> = ({
  classOptions,
  streams,
  classes,
  selectedClass,
  selectedStream,
  currentPage,
  totalPages,
  onFilterChange,
  onResetFilters,
  onEdit,
  onPageChange,
}) => {
  return (
    <div className="space-y-8">
      <ClassFilterForm
        classOptions={classOptions}
        streams={streams}
        selectedClass={selectedClass}
        selectedStream={selectedStream}
        onFilterChange={onFilterChange}
        onResetFilters={onResetFilters}
      />

      <ClassTable classes={classes} onEdit={onEdit} />

      <Pagination 
        page={currentPage} 
        totalPages={totalPages} 
        onPageChange={onPageChange} 
      />
    </div>
  );
};

export default ClassList;
