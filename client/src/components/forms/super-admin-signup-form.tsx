// client/src/components/forms/SuperAdminFormFields.tsx
import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { type UseFormRegister, type FieldErrors } from "react-hook-form";
import type { ISuperAdmin } from "../../types/people/user.types";

interface Props {
  register: UseFormRegister<ISuperAdmin>;
  errors: FieldErrors<ISuperAdmin>;
  showPassword: boolean;
  toggleShowPassword: () => void;
}

const SuperAdminFormFields: React.FC<Props> = ({
  register,
  errors,
  showPassword,
  toggleShowPassword,
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
            message: "Invalid email",
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

    {/* Password */}
    <div>
      <label className="block mb-1">Password</label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Min 6 characters",
            },
          })}
          className={`w-full border rounded px-3 py-2 pr-10 ${
            errors.password ? "border-red-500" : "border-gray-300"
          }`}
        />
        <span
          onClick={toggleShowPassword}
          className="absolute right-3 top-2.5 cursor-pointer text-gray-500 hover:text-gray-700"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>
      {errors.password && (
        <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
      )}
    </div>

    {/* Role */}
    <div>
      <label className="block mb-1">Role</label>
      <input
        type="text"
        value="super_admin"
        readOnly
        {...register("role")}
        className="w-full px-3 py-2 border rounded bg-gray-100 text-gray-600 cursor-not-allowed"
      />
    </div>
  </div>
);

export default SuperAdminFormFields;
