import { useGlobalState } from "../../hooks/useGlobalContext";
import Swal from "sweetalert2";
import { Sidebar, Topbar } from "../../shared";
import { getSchoolId } from "../../utils";
import { createCompetency } from "../../api/CBCApi";
import RegisterCompetencyForm from "../../components/forms/RegisterCompetencyForm";
import type { ICompetency } from "../../types";

const RegisterCompetency: React.FC = () => {
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
  const handleCompetencySubmit = async (data: ICompetency) => {
    try {
      // Attach schoolId if needed (if ICompetency has school field)
      // const payload = { ...data, school: schoolId };
      await createCompetency(data);
      Swal.fire("Success", "Competency created successfully", "success");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Something went wrong.";
      Swal.fire("Failed to create competency", message, "error");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0 bg-gray-100 overflow-y-auto">
        <Sidebar role="principal" />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Topbar */}
        <div className="flex-shrink-0">
          <Topbar role="principal" title="Register Competency" />
        </div>
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Register Competency</h1>
          <RegisterCompetencyForm onSubmit={handleCompetencySubmit} />
        </div>
      </div>
    </div>
  );
};

export default RegisterCompetency;