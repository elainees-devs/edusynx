// client/src/pages/view-class.tsx
import React, { useState } from "react";
import { ClassDetails } from "../components";
import { classOptions } from "../constants/class-options";
import type { IClass } from "../types";

const ViewClass: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedStream, setSelectedStream] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  
  const dummyClasses: IClass[] = [
    { id: "1", ClassName: "Grade 1", stream: "North", academicYear: "2025" },
    { id: "2", ClassName: "Grade 2", stream: "East", academicYear: "2025" },
  
  ];
// fetch data from API
  const streams = ["North", "South", "East", "West"];

  const handleFilterChange = (filters: { ClassName: string; stream: string }) => {
    setSelectedClass(filters.ClassName);
    setSelectedStream(filters.stream);
    setCurrentPage(1); // Reset to page 1 on new filter
  };

  const handleResetFilters = () => {
    setSelectedClass("");
    setSelectedStream("");
    setCurrentPage(1);
  };

  const handleEdit = (cls: IClass) => {
    console.log("Edit class:", cls);
  };

  const filteredClasses = dummyClasses.filter((cls) => {
    return (
      (!selectedClass || cls.ClassName === selectedClass) &&
      (!selectedStream || cls.stream === selectedStream)
    );
  });

  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(filteredClasses.length / ITEMS_PER_PAGE);
  const paginatedClasses = filteredClasses.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <ClassDetails
      classOptions={classOptions}
      streams={streams}
      classes={paginatedClasses}
      selectedClass={selectedClass}
      selectedStream={selectedStream}
      currentPage={currentPage}
      totalPages={totalPages}
      onFilterChange={handleFilterChange}
      onResetFilters={handleResetFilters}
      onEdit={handleEdit}
      onPageChange={setCurrentPage}
    />
  );
};

export default ViewClass;
