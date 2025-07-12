// src/components/forms/super-admin-signup-form.tsx
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import type { ISuperAdmin } from "../../types/people/user.types";

interface SuperAdminFormFieldsProps {
  formData: ISuperAdmin;
  errors: Partial<ISuperAdmin>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SuperAdminFormFields: React.FC<SuperAdminFormFieldsProps> = ({
  formData,
  errors,
  handleChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-4 w-full">
      {/* Email Field */}
      <div className="flex flex-col">
        <label className="mb-2 text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className={`px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
            errors.email
              ? "border-red-500 focus:ring-red-400"
              : "border-gray-300 focus:ring-blue-500"
          }`}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      {/* Password Field with Eye Icon */}
      <div className="flex flex-col">
        <label className="mb-2 text-sm font-medium text-gray-700">Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className={`w-full px-4 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2 ${
              errors.password
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-2.5 cursor-pointer text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password}</p>
        )}
      </div>

      {/* Role Field */}
      <div className="flex flex-col">
        <label className="mb-2 text-sm font-medium text-gray-700">Role</label>
        <input
          type="text"
          name="role"
          value={formData.role}
          onChange={handleChange}
          readOnly
          className="px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600 cursor-not-allowed"
        />
        {errors.role && (
          <p className="text-red-500 text-sm mt-1">{errors.role}</p>
        )}
      </div>
    </div>
  );
};

export default SuperAdminFormFields;
