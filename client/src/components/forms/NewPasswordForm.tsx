// client/src/components/forms/new-password-form.tsx
import React from "react";
import {
  type UseFormRegister,
  type FieldErrors,
  type UseFormWatch,
} from "react-hook-form";
import type { NewPasswordBody } from "../../types/auth/new-password.types";

interface NewPasswordFormFieldsProps {
  register: UseFormRegister<NewPasswordBody>;
  errors: FieldErrors<NewPasswordBody>;
  isSubmitting: boolean;
  watch: UseFormWatch<NewPasswordBody>;
}

const NewPasswordFormFields: React.FC<NewPasswordFormFieldsProps> = ({
  register,
  errors,
  watch,
}) => {
  const newPassword = watch("newPassword");

  return (
    <div className="space-y-4">
      {/* New Password */}
      <div>
        <label className="block mb-1">New Password</label>
        <input
          type="password"
          {...register("newPassword", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
          className={`w-full border rounded px-3 py-2 ${
            errors.newPassword ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.newPassword && (
          <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <label className="block mb-1">Confirm New Password</label>
        <input
          type="password"
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) =>
              value === newPassword || "Passwords do not match",
          })}
          className={`w-full border rounded px-3 py-2 ${
            errors.confirmPassword ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default NewPasswordFormFields;
