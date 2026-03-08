// client/src/components/forms/register-subject-form.tsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { SubmitButton } from "../../shared";
import { useClassOptions, type ClassOption } from "../../hooks/"

interface SubjectFormData {
  subjectName?: string;
  bulkSubjects?: string;
  classRef?: string;
}

interface Props {
  onSubmit: (data: {
    subjectName?: string;
    bulkSubjects?: string;
    classRef?: string;
    school: string;
  }) => void;
  schoolId: string;
  classes: ClassOption[];
}

const RegisterSubjectForm: React.FC<Props> = ({ onSubmit, schoolId }) => {
  const { register, handleSubmit, reset } = useForm<SubjectFormData>();
  const [mode, setMode] = useState<"single" | "bulk">("single");

  // Use the hook to get classes
  const { classOptions, loading, error } = useClassOptions();

  const submitHandler = (data: SubjectFormData) => {
    // Attach schoolId and pass to parent handler
    onSubmit({ ...data, school: schoolId });
    reset();
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow">
      {/* Mode toggle */}
      <div className="mb-4">
        <button
          type="button"
          className={`mr-2 px-4 py-2 border rounded ${mode === "single" ? "bg-blue-500 text-white" : ""}`}
          onClick={() => setMode("single")}
        >
          Single
        </button>
        <button
          type="button"
          className={`px-4 py-2 border rounded ${mode === "bulk" ? "bg-blue-500 text-white" : ""}`}
          onClick={() => setMode("bulk")}
        >
          Bulk
        </button>
      </div>

      {loading ? (
        <p>Loading classes...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <form onSubmit={handleSubmit(submitHandler)}>
          {/* Single Subject */}
          {mode === "single" && (
            <>
              <div className="mb-4">
                <label className="block mb-1">Subject Name</label>
                <input
                  type="text"
                  {...register("subjectName", { required: true })}
                  className="w-full border px-2 py-1 rounded"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1">Class</label>
                <select
                  {...register("classRef", { required: true })}
                  className="w-full border px-2 py-1 rounded"
                >
                  <option value="">Select Class</option>
                  {classOptions.map((cls) => (
                    <option key={cls.value} value={cls.value}>
                      {cls.clasName}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          {/* Bulk Subjects */}
          {mode === "bulk" && (
            <div className="mb-4">
              <label className="block mb-1">Subjects (one per line)</label>
              <textarea
                {...register("bulkSubjects")}
                rows={5}
                className="w-full border px-2 py-1 rounded"
              />
            </div>
          )}

          <SubmitButton label="Register Subject(s)" />
        </form>
      )}
    </div>
  );
};

export default RegisterSubjectForm;
