// client/src/pages/stream/RegisterStream.tsx
import { useGlobalState } from "../../hooks/useGlobalContext"; 
import RegisterStreamForm from "../../components/forms/register-stream-form";
import { registerStream } from "../../api/stream.api";
import Swal from "sweetalert2";
import Sidebar from "../../shared/layout/dashboard/sidebar";
import Topbar from "../../shared/layout/dashboard/topbar";
import { getSchoolId } from "../../utils/getSchoolId";


const RegisterStream: React.FC = () => {
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
 const handleStreamSubmit = async (data: {
  streamName?: string;
  bulkStreams?: string;
  academicYear: string;
  school: string;
}) => {
  try {
    let streamsToRegister: { streamName: string; academicYear: string; school: string }[] = [];

    if (data.streamName) {
      streamsToRegister.push({
        streamName: data.streamName, 
        academicYear: data.academicYear,
        school: data.school,
      });
    } else if (data.bulkStreams) {
      const names = data.bulkStreams
        .split("\n")
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      streamsToRegister = names.map((streamName) => ({
        streamName, 
        academicYear: data.academicYear,
        school: data.school,
      }));
    }

    // Call API for each stream
    for (const stream of streamsToRegister) {
      await registerStream(stream);
    }

    Swal.fire("Success", "Stream(s) created successfully", "success");
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Something went wrong.";
    Swal.fire("Failed to create stream", message, "error");
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
          <h1 className="text-2xl font-bold mb-4">Register Stream</h1>
          <RegisterStreamForm onSubmit={handleStreamSubmit} schoolId={schoolId} />
        </div>
      </div>
    </div>
  );
};

export default RegisterStream;
