// client/src/pages/class/RegisterClass.tsx
import { useGlobalState } from "../../hooks/useGlobalContext"; 

import Swal from "sweetalert2";
import Sidebar from "../../shared/layout/dashboard/sidebar";
import Topbar from "../../shared/layout/dashboard/topbar";
import { getSchoolId } from "../../utils/getSchoolId";
import { registerClass } from "../../api";
import { RegisterClassForm } from "../../components";
import type { IClass } from "../../types";


const RegisterClass: React.FC = () => {
  const { state } = useGlobalState();

const user = state.loggedInUser as
  | { role: string; school?: string | { _id: string; isActive: boolean } }
  | undefined;

const schoolId = getSchoolId(user);

// If schoolId is missing, show an error
if (!schoolId) {
  return (
    <div className="p-6 text-red-600">
      Unable to load school ID. Please log in again or contact support.
    </div>
  );
}

  // Form submission handler
 const handleClassSubmit = async (data: {
  clasName?: string;
  bulkClasses?: string;
  academicYear: string;
  school: string;
}) => {
  try {
    let classesToRegister: Omit<IClass, '_id'>[] = [];

    if (data.clasName) {
      classesToRegister.push({
        clasName: data.clasName, 
        academicYear: data.academicYear,
        school: data.school,
      });
    } else if (data.bulkClasses) {
      const names = data.bulkClasses
        .split("\n")
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      classesToRegister = names.map((clasName) => ({
        clasName, 
        academicYear: data.academicYear,
        school: data.school,
      }));
    }

    // Call API for each class
    for (const clas of classesToRegister) {
      await registerClass(clas as IClass);
    }

    Swal.fire("Success", "Class(es) created successfully", "success");
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Something went wrong.";
    Swal.fire("Failed to create class", message, "error");
  }
};
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0 bg-gray-100 overflow-y-auto">
        <Sidebar role="principal"/>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Topbar */}
        <div className="flex-shrink-0">
          <Topbar role="principal" />
        </div>
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Register Class</h1>
          <RegisterClassForm onSubmit={handleClassSubmit} schoolId={schoolId} />
        </div>
      </div>
    </div>
  );
};

export default RegisterClass;
