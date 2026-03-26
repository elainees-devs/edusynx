import { Sidebar, Topbar } from "../../shared/layout/dashboard";
import SubjectAssignmentList from "../../components/data-list/SubjectAssignmentList";

const SubjectAssignmentPage = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0 bg-gray-100 overflow-y-auto">
        <Sidebar role={["principal", "teacher"]} />
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar role={["principal", "teacher"]} title="Subject Assignments" />

        <div className="flex-1 overflow-y-auto p-4">
          <h1 className="text-xl font-bold mb-4">Subject Assignments</h1>
          <SubjectAssignmentList />
        </div>
      </div>
    </div>
  );
};

export default SubjectAssignmentPage;
