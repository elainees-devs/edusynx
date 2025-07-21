// client/src/components/forms/register-stream.tsx
import React from "react";
import type { IStream } from "../../types";
import type { UseFormRegister } from "react-hook-form";

interface StreamFormProps {
  register: UseFormRegister<IStream>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const RegisterStreamForm: React.FC<StreamFormProps> = ({ register, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4 w-full max-w-md">
      <div>
        <label htmlFor="stream" className="block text-sm font-medium text-gray-700">
          Stream Name
        </label>
        <input
          id="stream"
          {...register("stream", { required: true })}
          className="w-full py-2 px-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
        />
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-200 hover:text-gray"
      >
        Submit
      </button>
    </form>
  );
};

export default RegisterStreamForm;
