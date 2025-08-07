// client/src/components/forms/register-student-form.tsx
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useSchoolBySlug } from "../../hooks/useSchoolBySlug";
import { useClassOptions } from "../../hooks/useClassOptions";
import { useStudentFormContext } from "../../hooks/useStudentFormContext";
import type { Option, StudentFormData } from "../../types";
import { ImageDropzone } from "../../shared";

interface RegisterStudentFormProps {
  onSubmit: (data: StudentFormData) => Promise<void>;
}

const RegisterStudentForm: React.FC<RegisterStudentFormProps> = ({
  onSubmit,
}) => {
  const { slug } = useParams();
  const { schoolId, error: schoolError } = useSchoolBySlug(slug);
  const {
    classOptions,
    loading,
    error: classError,
  } = useClassOptions(schoolId);

  const { updateForm, formData } = useStudentFormContext();

  // 🔹 Sync schoolId to formData
  if (schoolId && formData.school !== schoolId) {
    updateForm({ school: schoolId });
  }
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<StudentFormData>();

  // Keep formData.school in sync with current schoolId
  useEffect(() => {
    if (schoolId && formData.school !== schoolId) {
      updateForm({ school: schoolId });
    }
  }, [schoolId, formData.school, updateForm]);

  const submitHandler = async (data: StudentFormData) => {
    await onSubmit({ ...data, school: schoolId || "" });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
      {(schoolError || classError) && (
        <p className="text-red-500">{schoolError || classError}</p>
      )}

      <div>
        <label className="block mb-1 font-medium">First Name</label>
        <input
          type="text"
          {...register("studentFirstName", { required: true })}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        {errors.studentFirstName && (
          <p className="text-red-500 text-sm">Required</p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium">Middle Name</label>
        <input
          type="text"
          {...register("studentMiddleName", { required: true })}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        {errors.studentMiddleName && (
          <p className="text-red-500 text-sm">Required</p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium">Last Name</label>
        <input
          type="text"
          {...register("studentLastName", { required: true })}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        {errors.studentLastName && (
          <p className="text-red-500 text-sm">Required</p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium">Gender</label>
        <select
          {...register("studentGender", { required: true })}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        {errors.studentGender && (
          <p className="text-red-500 text-sm">Required</p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium">Date of Birth</label>
        <input
          type="date"
          {...register("dateOfBirth", { required: true })}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        {errors.dateOfBirth && <p className="text-red-500 text-sm">Required</p>}
      </div>

      <div>
        <label className="block mb-1 font-medium">Admission Date</label>
        <input
          type="date"
          {...register("admissionDate", { required: true })}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        {errors.admissionDate && (
          <p className="text-red-500 text-sm">Required</p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium">
          Previous School (Optional)
        </label>
        <input
          type="text"
          {...register("previousSchool")}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Class</label>
        {loading ? (
          <p>Loading classes...</p>
        ) : (
          <select
            {...register("classId", { required: true })}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="">Select Class</option>
            {classOptions.map((cls: Option) => (
              <option key={cls.value} value={cls.value}>
                {cls.label}
              </option>
            ))}
          </select>
        )}
        {errors.classId && <p className="text-red-500 text-sm">Required</p>}
      </div>

      <div>
        <label className="block mb-1 font-medium">Status</label>
        <select
          {...register("status", { required: true })}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="">Select Status</option>
          <option value="Active">Active</option>
      
        </select>
        {errors.status && <p className="text-red-500 text-sm">Required</p>}
      </div>

      {/* Student Photo Upload */}
      <div>
        <label className="block mb-1 font-medium">Student Photo</label>
        <ImageDropzone<StudentFormData, "studentPhotoUrl">
          formData={formData}
          setFormData={updateForm}
          field="studentPhotoUrl"
          label="student photo"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-teal-600 text-white font-medium py-2 px-4 rounded hover:bg-teal-700 transition"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Registering..." : "Register Student"}
      </button>
    </form>
  );
};

export default RegisterStudentForm;
