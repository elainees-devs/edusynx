// client/src/components/signup/steps/role-specific.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSignUpContext } from "../../../context/signup/useSignUpContext";
import { getClassesByFilter } from "../../../api/class.api";
import { getSchoolBySlug } from "../../../api/school-api";

type SignUpRole = "teacher" | "headteacher" | "school-admin" | "accountant";
const allowedRoles: SignUpRole[] = [
  "teacher",
  "headteacher",
  "school-admin",
  "accountant",
];

const formatRole = (role: string) =>
  role
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");

const RoleSpecificStep = ({
  back,
  submit,
}: {
  back: () => void;
  submit: () => void;
}) => {
  const { formData, updateForm } = useSignUpContext();
  const { slug } = useParams();

  const [schoolId, setSchoolId] = useState<string | null>(null);
  const [classOptions, setClassOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔹 Fetch school ID by slug
  useEffect(() => {
    const fetchSchoolAndClasses = async () => {
      if (!slug) return;

      try {
        const school = await getSchoolBySlug(slug);
        setSchoolId(school._id ?? null);
        updateForm({ school: school._id }); // ✅ Fixes missing "school" field
      } catch (err) {
        console.error("Failed to fetch school:", err);
        setError("School not found.");
      }
    };

    fetchSchoolAndClasses();
  }, [slug]);

  // 🔹 Fetch classes once schoolId is known
  useEffect(() => {
    const fetchClasses = async () => {
      if (!schoolId) return;
      setLoading(true);
      try {
        const classList = await getClassesByFilter(schoolId);
        const options = classList.map((cls) => {
          const streamName =
            typeof cls.stream === "object" && "streamName" in cls.stream
              ? cls.stream.streamName
              : "Unknown Stream";

          return {
            value: cls._id,
            label: `Grade ${cls.grade} - ${streamName}`,
          };
        });

        setClassOptions(options);
        setError("");
      } catch (err: unknown) {
        if (err && typeof err === "object" && "message" in err) {
          setError((err as { message: string }).message);
        } else {
          setError("Failed to fetch classes.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, [schoolId]);

  // 🔹 Guard against missing required fields
  const isSubmitDisabled =
    !formData.role ||
    (formData.isClassTeacher && !formData.classId) ||
    !formData.school;

  return (
    <div className="space-y-4 border-[1px] p-8 border-dashed border-gray-200">
      {/* Role Selection */}
      <label className="block">
        <span className="text-gray-700">Select Role</span>
        <select
          className="w-full p-2 border rounded"
          value={formData.role || ""}
          onChange={(e) => updateForm({ role: e.target.value as SignUpRole })}
        >
          <option value="">-- Select a role --</option>
          {allowedRoles.map((role) => (
            <option key={role} value={role}>
              {formatRole(role)}
            </option>
          ))}
        </select>
      </label>

      {/* Teacher-specific fields */}
      {formData.role === "teacher" && (
        <>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.isClassTeacher || false}
              onChange={(e) => updateForm({ isClassTeacher: e.target.checked })}
            />
            <span>Is Class Teacher</span>
          </label>

          {formData.isClassTeacher && (
            <label className="block">
              <span className="text-gray-700">Select Class</span>
              {loading ? (
                <p>Loading classes...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : (
                <select
                  className="w-full p-2 border rounded"
                  value={formData.classId || ""}
                  onChange={(e) => updateForm({ classId: e.target.value })}
                >
                  <option value="">-- Select Class --</option>
                  {classOptions.map((cls) => (
                    <option key={cls.value} value={cls.value}>
                      {cls.label}
                    </option>
                  ))}
                </select>
              )}
            </label>
          )}
        </>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between">
            <button onClick={back} className="px-4 py-2 text-white rounded bg-gray">Back</button>
        <button
          onClick={submit}
          disabled={isSubmitDisabled}
          className="px-4 py-2 text-white rounded bg-teal-400 hover:bg-teal-200 hover:text-gray"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default RoleSpecificStep;
