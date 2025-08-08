// client/src/pages/view-class.tsx
import { useState } from "react";
import { ClassList } from "../../components";
import { classOptions } from "../../constants/class-options";
import type { IClass } from "../../types";
import { Sidebar, Topbar } from "../../shared";


const ViewClass: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedStream, setSelectedStream] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

const dummyClasses: IClass[] = [
  {
    _id: 'class001',
    grade: 'Grade 1',
    stream: {
      _id: 'streamA',
      streamName: 'Stream A',
    },
    school: {
      _id: 'school001',
      name: 'Sunrise Primary School',
    },
    academicYear: '2025-2026',
  },
  {
    _id: 'class002',
    grade: 'Grade 2',
    stream: 'streamB', // just the ID
    school: 'school002', // just the ID
    academicYear: '2025-2026',
  },
  {
    _id: 'class003',
    grade: 'Grade 3',
    stream: {
      _id: 'streamC',
      streamName: 'Stream C',
    },
    school: {
      _id: 'school003',
      name: 'Green Valley Academy',
    },
    academicYear: '2024-2025',
  },
  {
    _id: 'class004',
    grade: 'Grade 4',
    stream: 'streamD',
    school: {
      _id: 'school004',
      name: 'Hilltop School',
    },
    academicYear: '2025-2026',
  },
  {
    _id: 'class005',
    grade: 'Grade 5',
    stream: {
      _id: 'streamE',
      streamName: 'Stream E',
    },
    school: 'school005',
    academicYear: '2023-2024',
  },
];


  const streams = ["North", "South", "East", "West"];

  const handleFilterChange = (filters: { grade: string; stream: string }) => {
    setSelectedClass(filters.grade);
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
  const streamValue =
    typeof cls.stream === "string" ? cls.stream : cls.stream.streamName;

  return (
    (!selectedClass || cls.grade === selectedClass) &&
    (!selectedStream || streamValue === selectedStream)
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
          <Sidebar role="headteacher" />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <ClassList
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
