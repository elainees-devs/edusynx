// client/src/components/forms/register-class-form.tsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { SubmitButton } from "../../shared";

interface ClassFormData {
  clasName?: string;
  bulkClasses?: string;
  academicYear: string;
}

interface Props {
  onSubmit: (data: { clasName?: string; bulkClasses?: string; academicYear: string; school: string }) => void;
  schoolId: string;
}

const RegisterClassForm: React.FC<Props> = ({ onSubmit, schoolId }) => {
  const { register, handleSubmit, reset } = useForm<ClassFormData>();
  const [mode, setMode] = useState<"single" | "bulk">("single");

  const submitHandler = (data: ClassFormData) => {
    // Attach schoolId to data and call the page handler
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

      <form onSubmit={handleSubmit(submitHandler)}>
        {mode === "single" && (
          <div className="mb-4">
            <label className="block mb-1">Class Name</label>
            <input
              type="text"
              {...register("clasName")}
              className="w-full border px-2 py-1 rounded"
            />
          </div>
        )}

        {mode === "bulk" && (
          <div className="mb-4">
            <label className="block mb-1">Classes (one per line)</label>
            <textarea
              {...register("bulkClasses")}
              rows={5}
              className="w-full border px-2 py-1 rounded"
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block mb-1">Academic Year</label>
          <input
            type="text"
            {...register("academicYear", { required: true })}
            placeholder="e.g., 2025-2026"
            className="w-full border px-2 py-1 rounded"
          />
        </div>

        <SubmitButton label="Register Class(es)" />
      </form>
    </div>
  );
};

export default RegisterClassForm;