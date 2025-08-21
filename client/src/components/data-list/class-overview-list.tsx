// client/src/components/data-table/list/class-overview-list.tsx
import { FaUserPlus } from "react-icons/fa";
import { useClassTeachers } from "../../hooks";
import { SearchBar } from "../../shared";
import type { ClassTeacher } from "../../types";
import ClassOverviewTable from "../data-table/class-overview-table";


const ClassOverviewList: React.FC = () => {
  const {
    teachers,
    loading,
    error,
    sortAsc,
    setSortAsc,
    searchTerm,
    setSearchTerm,
    getTeacherName,
    getGradeDisplay,
    getStreamDisplay,
  } = useClassTeachers();

  const handleSort = () => setSortAsc((prev) => !prev);

  const onEdit = (teacher: ClassTeacher | null) => {
    if (teacher) console.log("Edit teacher:", teacher);
    else console.log("Assign new teacher");
    // TODO: open modal
  };

  if (loading) return <div className="p-4">Loading teachers...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;

  return (
    <div className="mt-4">
      {/* Search + Assign button */}
      <div className="mb-4 flex justify-between items-center">
        <SearchBar
          placeholder="Search teachers..."
          value={searchTerm}
          onChange={setSearchTerm}
        />
        <button
          onClick={() => onEdit(null)}
          className="bg-teal-400 text-white px-4 py-2 rounded-lg hover:bg-teal-200"
        >
          Assign Class Teacher <FaUserPlus className="inline ml-1" />
        </button>
      </div>

      {/* Table */}
      <ClassOverviewTable
        teachers={teachers}
        getTeacherName={getTeacherName}
        getGradeDisplay={getGradeDisplay}
        getStreamDisplay={getStreamDisplay}
        onEdit={onEdit}
        sortAsc={sortAsc}
        onSort={handleSort}
      />
    </div>
  );
};

export default ClassOverviewList;
