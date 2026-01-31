// client/src/pages/student/view-class.tsx
import React from "react";
import { ClassList} from "../../components";
import { Sidebar, Topbar } from "../../shared";


const ViewClass: React.FC = () => {
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

        {/* Class List */}
        <div className="flex-1 overflow-auto p-4">
          <ClassList />
        </div>
      </div>
    </div>
  );
};

export default ViewClass;
