// client/src/components/forms/RegisterStudentForm.tsx
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useSchoolBySlug } from "../../hooks/useSchoolBySlug";
import { useClassOptions } from "../../hooks/useClassOptions";
import { useStudentFormContext } from "../../hooks/useStudentFormContext";
import type { StudentFormData } from "../../types";
import { ImageDropzone, SubmitButton } from "../../shared";

interface RegisterStudentFormProps {
  onSubmit: (data: StudentFormData) => Promise<void>;
}

const RegisterStudentForm: React.FC<RegisterStudentFormProps> = ({
  onSubmit,
}) => {
  const { slug } = useParams<{ slug: string }>();
  const { schoolId, error: schoolError } = useSchoolBySlug(slug);

  const { streamOptions, classOptions, error: classError } = useClassOptions();

  const { updateForm, formData } = useStudentFormContext();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<StudentFormData>();

  // Sync schoolId into form context & RHF
  useEffect(() => {
    if (schoolId && formData.school !== schoolId) {
      updateForm({ school: schoolId });
      setValue("school", schoolId);
    }
  }, [schoolId, formData.school, updateForm, setValue]);

  const submitHandler = async (data: StudentFormData) => {
    if (!data.classId) {
      alert("Class is required");
      return;
    }
    if (!data.stream) {
      alert("Stream is required");
      return;
    }

    // Get clasName from classOptions
    const selectedClass = classOptions.find(
      (cls) => cls.value === data.classId,
    );
    // Get streamName from streamOptions
    const selectedStream = streamOptions.find((s) => s.value === data.stream);

    const payload: StudentFormData = {
      ...data,
      clasName: selectedClass?.clasName || "",
      school: schoolId || "",
      streamName: selectedStream?.streamName || "",
    };

    await onSubmit(payload);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
      {(schoolError || classError) && (
        <p className="text-red-500">{schoolError || classError}</p>
      )}

      {/* First Name */}
      <input
        {...register("studentFirstName", { required: true })}
        placeholder="First Name"
        className="input"
      />
      {errors.studentFirstName && <p className="error">Required</p>}

      {/* Middle Name */}
      <input
        {...register("studentMiddleName", { required: true })}
        placeholder="Middle Name"
        className="input"
      />
      {errors.studentMiddleName && <p className="error">Required</p>}

      {/* Last Name */}
      <input
        {...register("studentLastName", { required: true })}
        placeholder="Last Name"
        className="input"
      />
      {errors.studentLastName && <p className="error">Required</p>}

      {/* Gender */}
      <select
        {...register("studentGender", { required: true })}
        className="input"
      >
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>

      {/* Date of Birth */}
      <label className="block font-medium">Date of Birth:</label>
      <input
        type="date"
        {...register("dateOfBirth", { required: true })}
        className="input"
      />

      {/* Admission Date */}
      <label className="block font-medium">Admission Date:</label>
      <input
        type="date"
        {...register("admissionDate", { required: true })}
        className="input"
      />

      {/* Previous School */}
      <label className="block font-medium">Previous School:</label>
      <input
        {...register("previousSchool")}
        placeholder="Optional"
        className="input"
      />

      {/* Stream */}
      <label className="block font-medium">Stream:</label>
      <select
        {...register("stream", { required: "Stream is required" })}
        className="input"
      >
        <option value="">Select Stream</option>
        {streamOptions.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>
      {errors.stream && <p className="error">{errors.stream.message}</p>}

      {/* Class */}
      <label className="block font-medium">Class:</label>
      <select
        {...register("classId", { required: "Class is required" })}
        className="input"
      >
        <option value="">Select Class</option>
        {classOptions.map((cls) => (
          <option key={cls.value} value={cls.value}>
            {cls.label}
          </option>
        ))}
      </select>
      {errors.classId && <p className="error">{errors.classId.message}</p>}

      {/* Status */}
      <div>
         <label className="block font-medium">Status:</label>
        <select {...register("status", { required: true })} className="input">
          <option value="">Select Status</option>
          <option value="active">Active</option>
        </select>
      </div>

      {/* Student Photo */}
      <ImageDropzone<StudentFormData, "studentPhotoUrl">
        formData={formData}
        setFormData={updateForm}
        field="studentPhotoUrl"
        label="Student Photo"
      />

      <SubmitButton
        label="Register Student"
        loadingLabel="Registering..."
        loading={isSubmitting}
      />
    </form>
  );
};

export default RegisterStudentForm;
