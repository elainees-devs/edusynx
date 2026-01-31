// client/src/pages/subject/RegisterSubject.tsx
import { useGlobalState } from "../../hooks/useGlobalContext"; 
import RegisterSubjectForm from "../../components/forms/register-subject-form";
import { registerSubject } from "../../api/subject.api"; 
import Swal from "sweetalert2";
import Sidebar from "../../shared/layout/dashboard/sidebar";
import Topbar from "../../shared/layout/dashboard/topbar";
import { getSchoolId } from "../../utils/getSchoolId";
import { useClassOptions } from "../../hooks";

const RegisterSubject: React.FC = () => {
  const { state } = useGlobalState();
  const user = state.loggedInUser as
    | { role: string; school?: string | { _id: string; isActive: boolean } }
    | undefined;

  const schoolId = getSchoolId(user);

  // Call hook unconditionally (React rule)
  const { classOptions, loading, error } = useClassOptions();

  // If schoolId is missing
  if (!schoolId) {
    return (
      <div className="p-6 text-red-600">
        Unable to load school ID. Please log in again or contact support.
      </div>
    );
  }

  // Form submission handler
  const handleSubjectSubmit = async (data: {
    subjectName?: string;
    bulkSubjects?: string;
    classRef?: string;
    school: string;
  }) => {
    try {
      let subjectsToRegister: {
        subjectName: string;
        classRef: string;
        school: string;
      }[] = [];

      if (data.subjectName && data.classRef) {
        subjectsToRegister.push({
          subjectName: data.subjectName,
          classRef: data.classRef,
          school: data.school,
        });
      } else if (data.bulkSubjects) {
        const names = data.bulkSubjects
          .split("\n")
          .map((s) => s.trim())
          .filter((s) => s.length > 0);

        subjectsToRegister = names.map((subjectName) => ({
          subjectName,
          classRef: data.classRef || "", // fallback if not selected
          school: data.school,
        }));
      }

      // Register each subject via API
      for (const subject of subjectsToRegister) {
        await registerSubject(subject);
      }

      Swal.fire("Success", "Subject(s) created successfully", "success");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Something went wrong.";
      Swal.fire("Failed to create subject", message, "error");
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
          <Topbar role="principal" />
        </div>

        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Register Subject</h1>

          {loading ? (
            <p>Loading classes...</p>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : (
            <RegisterSubjectForm
              onSubmit={handleSubjectSubmit}
              schoolId={schoolId}
              classes={classOptions} // use classOptions from hook
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterSubject;
