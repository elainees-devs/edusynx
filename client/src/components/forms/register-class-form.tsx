// client/src/components/forms/register-class-form.tsx
import React from "react";
import { classOptions } from "../../constants/class-options";
import type { IClass } from "../../types";
import type { UseFormRegister } from "react-hook-form";

interface RegisterClassFormProps {
  register: UseFormRegister<IClass>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const RegisterClassForm: React.FC<RegisterClassFormProps> = ({ register, onSubmit }) => {
  return (
    <form
      onSubmit={onSubmit}
      className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-2xl p-8 space-y-6"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800">
        Register Class
      </h2>

      {/* Class Name Dropdown */}
      <div className="space-y-2">
        <label htmlFor="ClassName" className="block text-sm font-medium text-gray-700">
          Class Name
        </label>
        <select
          id="ClassName"
          {...register("ClassName", { required: true })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        >
          <option value="">Select a class</option>
          {classOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Stream Input */}
      <div className="space-y-2">
        <label htmlFor="stream" className="block text-sm font-medium text-gray-700">
          Stream
        </label>
        <input
          id="stream"
          type="text"
          placeholder="e.g. Science, Arts, etc."
          {...register("stream", { required: true })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Academic Year Input */}
      <div className="space-y-2">
        <label htmlFor="academicYear" className="block text-sm font-medium text-gray-700">
          Academic Year
        </label>
        <input
          id="academicYear"
          type="text"
          placeholder="e.g. 2023-2024"
          {...register("academicYear", { required: true })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-blue-200 hover:text-gray transition duration-200"
      >
        Submit
      </button>
    </form>
  );
};

export default RegisterClassForm;
