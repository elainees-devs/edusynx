// client/src/components/forms/signup/steps/role-specific.tsx
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../hooks/storeHooks";
import { setFormData } from "../../../../store/slices/signupSlice";
import { useClassOptions, useSchoolBySlug } from "../../../../hooks";

type SignUpRole = "teacher" | "principal" | "school-admin" | "accountant" | "guardian";
const allowedRoles: SignUpRole[] = [
  "teacher",
  "principal",
  "school-admin",
  "accountant",
  "guardian",
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
  const dispatch = useAppDispatch();
  const formData = useAppSelector((state) => state.signup.formData);
  
  const updateForm = (data: any) => {
    dispatch(setFormData(data));
  };

  const { slug } = useParams();

  const { schoolId, error: schoolError } = useSchoolBySlug(slug);
  const { classOptions, loading, error: classError } = useClassOptions();

  // 🔹 Sync schoolId to formData
  if (schoolId && formData.school !== schoolId) {
    updateForm({ school: schoolId });
  }

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
              ) : schoolError || classError ? (
                <p className="text-red-500">{schoolError || classError}</p>
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

      {/* Guardian-specific fields */}
      {formData.role === "guardian" && (
        <>
          <label className="block">
            <span className="text-gray-700">Family Number</span>
            <input
              className="w-full p-2 border rounded"
              placeholder="Enter unique Family Number"
              value={formData.familyNumber || ""}
              onChange={(e) => updateForm({ familyNumber: e.target.value })}
            />
            <p className="text-xs text-gray-400 mt-1 italic">
              Use this number to link all your children in the same school.
            </p>
          </label>
        </>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button onClick={back} className="px-4 py-2 text-white rounded bg-gray">
          Back
        </button>
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
