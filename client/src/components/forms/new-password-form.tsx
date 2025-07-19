import React from "react";
import { type UseFormRegister, type FieldErrors } from "react-hook-form";
import type { NewPasswordBody } from "../../types/auth/new-password.types";

interface NewPasswordFormFieldsProps {
  register: UseFormRegister<NewPasswordBody>;
  errors: FieldErrors<NewPasswordBody>;
}

const NewPasswordFormFields: React.FC<NewPasswordFormFieldsProps> = ({
  register,
  errors,
}) => (
  <div className="space-y-4">
    {/* Password */}
    <div>
      <label className="block mb-1">New Password</label>
      <input
        type="password"
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password must be at least 8 characters",
          },
        })}
        className={`w-full border rounded px-3 py-2 ${
          errors.password ? "border-red-500" : "border-gray-300"
        }`}
      />
      {errors.password && (
        <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
      )}
    </div>

    {/* Confirm Password */}
    <div>
      <label className="block mb-1">Confirm New Password</label>
      <input
        type="password"
        {...register("confirmPassword", {
          required: "Please confirm your password",
          validate: (value, values) =>
            value === values.password || "Passwords do not match",
        })}
        className={`w-full border rounded px-3 py-2 ${
          errors.confirmPassword ? "border-red-500" : "border-gray-300"
        }`}
      />
      {errors.confirmPassword && (
        <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
      )}
    </div>
  </div>
);

export default NewPasswordFormFields;
