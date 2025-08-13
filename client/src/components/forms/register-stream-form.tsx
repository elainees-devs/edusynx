// client/src/components/forms/RegisterStreamForm.tsx
import React from "react";
import { useForm } from "react-hook-form";
import type { IStream } from "../../types";
import { SubmitButton } from "../../shared";

type Props = {
  onSubmit: (data: IStream) => void;
  schoolId: string;
};

const RegisterStreamForm: React.FC<Props> = ({ onSubmit, schoolId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IStream>();

  const submitHandler = (data: IStream) => {
    const payload = { ...data, school: schoolId };
    onSubmit(payload);
    reset(); // Optional: reset after submit
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
      <div>
        <label htmlFor="streamName" className="block font-medium">
          Stream Name
        </label>
        <input
          type="text"
          id="streamName"
          {...register("streamName", { required: "Stream name is required" })}
          className="border p-2 rounded w-1/2"
        />
        {errors.streamName && (
          <p className="text-red-500 text-sm">{errors.streamName.message}</p>
        )}
      </div>
      
        {/* Submit button */}
      <SubmitButton
        label="Register Stream"
        loadingLabel="Registering..."
        loading={isSubmitting}
      />
    </form>
  );
};

export default RegisterStreamForm;
