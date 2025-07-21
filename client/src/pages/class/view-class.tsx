// client/src/pages/view-class.tsx
import React, { useState } from "react";
import { ClassDetails } from "../../components";
import { classOptions } from "../../constants/class-options";
import type { IClass } from "../../types";
import Topbar from "../../shared/layout/dashboard/topbar";
import Sidebar from "../../shared/layout/dashboard/sidebar";

const ViewClass: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedStream, setSelectedStream] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const dummyClasses: IClass[] = [
    { id: "1", ClassName: "Grade 1", stream: "North", academicYear: "2025" },
    { id: "2", ClassName: "Grade 2", stream: "East", academicYear: "2025" },
  ];

  const streams = ["North", "South", "East", "West"];

  const handleFilterChange = (filters: { ClassName: string; stream: string }) => {
    setSelectedClass(filters.ClassName);
    setSelectedStream(filters.stream);
    setCurrentPage(1);
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
    <div className="flex flex-col h-screen">
      {/* Topbar */}
      <div className="flex-shrink-0">
        <Topbar role="Head Teacher" />
      </div>

      {/* Sidebar + Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 flex-shrink-0 bg-gray-100 overflow-y-auto">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-y-auto">
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
        </div>
      </div>
    </div>
  );
};

export default ViewClass;
