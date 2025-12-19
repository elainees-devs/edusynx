// client/src/components/forms/register-subject-form.tsx
import React from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useSchoolBySlug } from "../../hooks/useSchoolBySlug";
import { useClassOptions } from "../../hooks/useClassOptions";
import { SubmitButton } from "../../shared";
import type { Option, ISubject, SubjectData } from "../../types";

interface RegisterSubjectFormProps {
  onSubmit: (data: SubjectData) => Promise<void>;
}

const RegisterSubjectForm: React.FC<RegisterSubjectFormProps> = ({
  onSubmit,
}) => {
  const { slug } = useParams();
  const { schoolId } = useSchoolBySlug(slug);

  const { classOptions, loading, error: classError } =
    useClassOptions(schoolId);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ISubject>();

  /** -----------------------------------
   *  Submit Handler
   * ----------------------------------- */
  const submitHandler = async (data: ISubject) => {
    try {
      await onSubmit({ ...data, school: schoolId || "" });

      Swal.fire({
        icon: "success",
        title: "Subject Registered",
        text: `${data.subjectName} added successfully`,
        confirmButtonColor: "#2563eb",
      });

      reset();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: (error as Error).message,
      });
    }
  };

  /** -----------------------------------
   *  Handle class select → setValue()
   * ----------------------------------- */
  const handleClassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedClassId = e.target.value;

    const selectedClass = classOptions.find(
      (cls) => cls.value === selectedClassId
    );

    if (selectedClass) {
      setValue("classRef", selectedClass.value);       // classId
      
    }
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
      {classError && <p className="text-red-500">{classError}</p>}

      {/* SUBJECT NAME */}
      <div>
        <label className="block mb-1 font-medium">Subject Name</label>
        <input
          type="text"
          {...register("subjectName", { required: true })}
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="e.g. Mathematics"
        />
        {errors.subjectName && (
          <p className="text-red-500 text-sm">Required</p>
        )}
      </div>

      {/* SELECT CLASS */}
      <div>
        <label className="block mb-1 font-medium">Select Grade</label>

        {loading ? (
          <p>Loading classes...</p>
        ) : (
          <select
            {...register("classRef", { required: true })}
            className="w-full border border-gray-300 rounded px-3 py-2"
            onChange={handleClassChange}
          >
            <option value="">Select Grade</option>
            {classOptions.map((cls: Option) => (
              <option key={cls.value} value={cls.value}>
                {cls.label}
              </option>
            ))}
          </select>
        )}

        {errors.classRef && <p className="text-red-500 text-sm">Required</p>}
      </div>

      <SubmitButton
        label="Register Subject"
        loadingLabel="Saving..."
        loading={isSubmitting}
      />
    </form>
  );
};

export default RegisterSubjectForm;
