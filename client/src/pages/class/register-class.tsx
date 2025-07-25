// client/src/pages/class/RegisterClass.tsx
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useGlobalState } from "../../hooks/useGlobalContext";
import { getSchoolId } from "../../utils/getSchoolId";
import { getStreamsBySchool } from "../../api/stream.api";
import { registerClass } from "../../api/class.api";
import Sidebar from "../../shared/layout/dashboard/sidebar";
import Topbar from "../../shared/layout/dashboard/topbar";
import RegisterClassForm from "../../components/forms/register-class-form";
import type { IClass } from "../../types";

const RegisterClass: React.FC = () => {
  const { state } = useGlobalState();

  const user = state.loggedInUser as
    | { role: string; school?: string | { _id: string; isActive: boolean } }
    | undefined;

  const schoolId = getSchoolId(user);

  const [streams, setStreams] = useState<{ value: string; label: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

useEffect(() => {
  const fetchStreams = async () => {
    if (!schoolId) return;

    try {
      const streamList = await getStreamsBySchool(schoolId);
      console.log("Stream List:", streamList);

      const options = streamList.map((s) => ({
        value: s._id,
        label: s.streamName,
      }));

      setStreams(options);
      setError(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to load streams";
      console.error("Stream fetch failed:", message);
      setError(message);
      Swal.fire("Error", message, "error");
    } finally {
      setLoading(false);  // Always stop loading regardless of success or failure
    }
  };

  fetchStreams();
}, [schoolId]);




  if (!schoolId) {
    return (
      <div className="p-6 text-red-600">
        Unable to load school ID. Please log in again or contact support.
      </div>
    );
  }

  const handleClassSubmit = async (data: IClass) => {
    try {
      const payload = { ...data, school: schoolId };
      await registerClass(payload);
      Swal.fire("Success", "Class registered successfully", "success");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Something went wrong.";
      Swal.fire("Failed to register class", message, "error");
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-64 flex-shrink-0 bg-gray-100 overflow-y-auto">
        <Sidebar role="headteacher" />
      </div>

      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="flex-shrink-0">
          <Topbar role="headteacher" />
        </div>

        <div className="p-6">

          {loading ? (
            <p>Loading streams...</p>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : (
            <RegisterClassForm
              onSubmit={handleClassSubmit}
              streams={streams}
              schoolId={schoolId} 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterClass;
