// client/src/pages/student/view-subjects.tsx
import React from "react";

import { Sidebar, Topbar } from "../../shared";
import SubjectList from "../../components/data-list/subject-list";


const ViewSubjects: React.FC = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0 bg-gray-100 overflow-y-auto">
       <Sidebar role={["school-admin", "principal"]} />

      </div>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Topbar */}
        <div className="flex-shrink-0">
          <Topbar role={["school-admin", "principal"]} />
        </div>

        {/* Student List */}
        <div className="flex-1 overflow-auto p-4">
          <SubjectList />
        </div>
      </div>
    </div>
  );
};

export default ViewSubjects;
