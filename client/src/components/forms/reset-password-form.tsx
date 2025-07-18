// client/src/components/forms/reset-password-form.tsx
import React from "react";
import { type UseFormRegister, type FieldErrors } from "react-hook-form";
import type { SendResetTokenBody } from "../../types/email/email.types";

interface ResetPasswordFormFieldsProps {
  register: UseFormRegister<SendResetTokenBody>;
  errors: FieldErrors<SendResetTokenBody>;
}

const ResetPasswordFormFields: React.FC<ResetPasswordFormFieldsProps> = ({
  register,
  errors,
}) => (
  <div className="space-y-4">
    {/* Email */}
    <div>
      <label className="block mb-1">Email</label>
      <input
        type="email"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "Invalid email address",
          },
        })}
        className={`w-full border rounded px-3 py-2 ${
          errors.email ? "border-red-500" : "border-gray-300"
        }`}
      />
      {errors.email && (
        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
      )}
    </div>

    {/* Token */}
    <div>
      <label className="block mb-1">Token</label>
      <input
        type="text"
        {...register("token", { required: "Token is required" })}
        className={`w-full border rounded px-3 py-2 ${
          errors.token ? "border-red-500" : "border-gray-300"
        }`}
      />
      {errors.token && (
        <p className="text-red-500 text-sm mt-1">{errors.token.message}</p>
      )}
    </div>
  </div>
);

export default ResetPasswordFormFields;
