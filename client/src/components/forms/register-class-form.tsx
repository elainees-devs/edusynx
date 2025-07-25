// client/src/components/forms/RegisterClassForm.tsx
import React from "react";
import { useForm } from "react-hook-form";
import type { IClass } from "../../types";
import { classOptions } from "../../constants/class-options";


type Props = {
  onSubmit: (data: IClass) => void;
  schoolId: string;
  streams: { value: string; label: string }[];
};

const RegisterClassForm: React.FC<Props> = ({ onSubmit, schoolId, streams }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IClass>();

  const submitHandler = (data: IClass) => {
    const payload = { ...data, school: schoolId };
    onSubmit(payload);
    reset(); // Optional
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-6 max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold text-center">Register New Class</h2>

      {/* Grade/Class Name Select */}
      <div>
        <label htmlFor="grade" className="block font-medium">Grade/Class Name</label>
        <select
          id="grade"
          {...register("grade", { required: "Grade is required" })}
          className="border p-2 rounded w-full"
        >
          <option value="">Select a class</option>
          {classOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        {errors.grade && (
          <p className="text-red-500 text-sm">{errors.grade.message}</p>
        )}
      </div>

      {/* Academic Year Input */}
      <div>
        <label htmlFor="academicYear" className="block font-medium">Academic Year</label>
        <input
          type="text"
          id="academicYear"
          {...register("academicYear", { required: "Academic year is required" })}
          className="border p-2 rounded w-full"
        />
        {errors.academicYear && (
          <p className="text-red-500 text-sm">{errors.academicYear.message}</p>
        )}
      </div>

      {/* Stream Select */}
      <div>
        <label htmlFor="stream" className="block font-medium">Stream</label>
        <select
          id="stream"
          {...register("stream", { required: "Stream is required" })}
          className="border p-2 rounded w-full"
        >
          <option value="">Select a stream</option>
          {streams.map((stream) => (
            <option key={stream.value} value={stream.value}>
              {stream.label}
            </option>
          ))}
        </select>
        {errors.stream && (
          <p className="text-red-500 text-sm">{errors.stream.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-teal-400 text-white px-4 py-2 rounded hover:bg-teal-200 hover:text-gray w-full"
      >
        {isSubmitting ? "Registering..." : "Register Class"}
      </button>
    </form>
  );
};

export default RegisterClassForm;
