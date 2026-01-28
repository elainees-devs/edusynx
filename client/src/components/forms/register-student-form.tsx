// client/src/components/forms/register-student-form.tsx
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useSchoolBySlug } from "../../hooks/useSchoolBySlug";
import { useClassOptions } from "../../hooks/useClassOptions";
import { useStudentFormContext } from "../../hooks/useStudentFormContext";
import type { Option, StudentFormData } from "../../types";
import { ImageDropzone, SubmitButton } from "../../shared";

interface RegisterStudentFormProps {
  onSubmit: (data: StudentFormData) => Promise<void>;
}

const RegisterStudentForm: React.FC<RegisterStudentFormProps> = ({
  onSubmit,
}) => {
  const { slug } = useParams<{ slug: string }>();

  const { schoolId, error: schoolError } = useSchoolBySlug(slug);
  const {
    classOptions,
    loading,
    error: classError,
  } = useClassOptions(schoolId);

  const { updateForm, formData } = useStudentFormContext();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<StudentFormData>();

  /**
   * ✅ Correct place to sync schoolId into context
   * (runs AFTER render, never during render)
   */
  useEffect(() => {
    if (schoolId && formData.school !== schoolId) {
      updateForm({ school: schoolId });
    }
  }, [schoolId, formData.school, updateForm]);

  const submitHandler = async (data: StudentFormData) => {
    await onSubmit({
      ...data,
      school: schoolId || "",
    });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
      {(schoolError || classError) && (
        <p className="text-red-500">{schoolError || classError}</p>
      )}

      {/* First Name */}
      <div>
        <label className="block mb-1 font-medium">First Name</label>
        <input
          {...register("studentFirstName", { required: true })}
          className="w-full border rounded px-3 py-2"
        />
        {errors.studentFirstName && (
          <p className="text-red-500 text-sm">Required</p>
        )}
      </div>

      {/* Middle Name */}
      <div>
        <label className="block mb-1 font-medium">Middle Name</label>
        <input
          {...register("studentMiddleName", { required: true })}
          className="w-full border rounded px-3 py-2"
        />
        {errors.studentMiddleName && (
          <p className="text-red-500 text-sm">Required</p>
        )}
      </div>

      {/* Last Name */}
      <div>
        <label className="block mb-1 font-medium">Last Name</label>
        <input
          {...register("studentLastName", { required: true })}
          className="w-full border rounded px-3 py-2"
        />
        {errors.studentLastName && (
          <p className="text-red-500 text-sm">Required</p>
        )}
      </div>

      {/* Gender */}
      <div>
        <label className="block mb-1 font-medium">Gender</label>
        <select
          {...register("studentGender", { required: true })}
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        {errors.studentGender && (
          <p className="text-red-500 text-sm">Required</p>
        )}
      </div>

      {/* Date of Birth */}
      <div>
        <label className="block mb-1 font-medium">Date of Birth</label>
        <input
          type="date"
          {...register("dateOfBirth", { required: true })}
          className="w-full border rounded px-3 py-2"
        />
        {errors.dateOfBirth && (
          <p className="text-red-500 text-sm">Required</p>
        )}
      </div>

      {/* Admission Date */}
      <div>
        <label className="block mb-1 font-medium">Admission Date</label>
        <input
          type="date"
          {...register("admissionDate", { required: true })}
          className="w-full border rounded px-3 py-2"
        />
        {errors.admissionDate && (
          <p className="text-red-500 text-sm">Required</p>
        )}
      </div>

      {/* Previous School */}
      <div>
        <label className="block mb-1 font-medium">
          Previous School (Optional)
        </label>
        <input
          {...register("previousSchool")}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {/* Class */}
      <div>
        <label className="block mb-1 font-medium">Class</label>
        {loading ? (
          <p>Loading classes...</p>
        ) : (
          <select
            {...register("classId", { required: true })}
            className="w-full border rounded px-3 py-2"
            onChange={(e) => {
              const selected = classOptions.find(
                (cls) => cls.value === e.target.value
              );
              if (selected) {
                setValue("classId", selected.value);
                setValue("stream", selected.streamId);
              }
            }}
          >
            <option value="">Select Class</option>
            {classOptions.map((cls: Option) => (
              <option key={cls.value} value={cls.value}>
                {cls.label}
              </option>
            ))}
          </select>
        )}
        {errors.classId && (
          <p className="text-red-500 text-sm">Required</p>
        )}
      </div>

      {/* Status */}
      <div>
        <label className="block mb-1 font-medium">Status</label>
        <select
          {...register("status", { required: true })}
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Select Status</option>
          <option value="active">Active</option>
        </select>
        {errors.status && (
          <p className="text-red-500 text-sm">Required</p>
        )}
      </div>

      {/* Student Photo */}
      <div>
        <label className="block mb-1 font-medium">Student Photo</label>
        <ImageDropzone<StudentFormData, "studentPhotoUrl">
          formData={formData}
          setFormData={updateForm}
          field="studentPhotoUrl"
          label="student photo"
        />
      </div>

      {/* Submit */}
      <SubmitButton
        label="Register Student"
        loadingLabel="Registering..."
        loading={isSubmitting}
      />
    </form>
  );
};

export default RegisterStudentForm;
