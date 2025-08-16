// client/src/components/forms/register-school-form.tsx
import React from "react";
import {
  type UseFormRegister,
  type FieldErrors,
  type UseFormWatch,
  type UseFormSetValue,
} from "react-hook-form";
import type { ISchool } from "../../types";
import SchoolLogoDropzone from "./school/school-logo";
import { SubmitButton } from "../../shared";

interface Props {
  register: UseFormRegister<ISchool>;
  errors: FieldErrors<ISchool>;
  watch: UseFormWatch<ISchool>;
  setValue: UseFormSetValue<ISchool>;
  isSubmitting: boolean;
}

const SchoolRegistrationForm: React.FC<Props> = ({
  register,
  errors,
  watch,
  setValue,
  isSubmitting
}) => {
  const logoUrl = watch("logoUrl");

  return (
    <div className="space-y-4">
      {/* School Name */}
      <div>
        <label className="block mb-1">School Name</label>
        <input
          {...register("name", { required: "School name is required" })}
          className={`w-full border rounded px-3 py-2 ${
            errors.name ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="School Name"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Address */}
      <div>
        <label className="block mb-1">Address</label>
        <textarea
          {...register("address", { required: "Address is required" })}
          className={`w-full border rounded px-3 py-2 ${
            errors.address ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Address"
        />
        {errors.address && (
          <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
        )}
      </div>

      {/* Phone Number */}
      <div>
        <label className="block mb-1">Phone Number</label>
        <input
          {...register("phoneNumber", { required: "Phone number is required" })}
          className={`w-full border rounded px-3 py-2 ${
            errors.phoneNumber ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Phone Number"
        />
        {errors.phoneNumber && (
          <p className="text-red-500 text-sm mt-1">
            {errors.phoneNumber.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block mb-1">Email</label>
        <input
          type="email"
          {...register("email", { required: "Email is required" })}
          className={`w-full border rounded px-3 py-2 ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Email"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Website */}
      <div>
        <label className="block mb-1">Website</label>
        <input
          {...register("website")}
          className="w-full border rounded px-3 py-2 border-gray-300"
          placeholder="Website (optional)"
        />
      </div>

      {/* Established Year */}
      <div>
        <label className="block mb-1">Established Year</label>
        <input
          type="number"
          {...register("establishedYear", {
            required: "Established year is required",
          })}
          className={`w-full border rounded px-3 py-2 ${
            errors.establishedYear ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Established Year"
        />
        {errors.establishedYear && (
          <p className="text-red-500 text-sm mt-1">
            {errors.establishedYear.message}
          </p>
        )}
      </div>

      {/* Logo Dropzone */}
      <div>
        <label className="block mb-1">School Logo</label>
        <SchoolLogoDropzone
          value={logoUrl || ""}
          onChange={(url: string) => setValue("logoUrl", url)}
        />
      </div>

      {/* School Code */}
      <div>
        <label className="block mb-1">School Code</label>
        <input
          {...register("schoolCode", { required: "School code is required" })}
          className={`w-full border rounded px-3 py-2 ${
            errors.schoolCode ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="School Code"
        />
        {errors.schoolCode && (
          <p className="text-red-500 text-sm mt-1">
            {errors.schoolCode.message}
          </p>
        )}
      </div>

      {/* Role */}
      <div>
        <label className="block mb-1">Role</label>
        <input
          {...register("role")}
          value="HEADTEACHER"
          disabled
          readOnly
          className="w-full px-3 py-2 border rounded bg-gray-100 text-gray-600 cursor-not-allowed"
        />
      </div>

        {/* Submit Button */}
       <SubmitButton
            label="Register School"
            loadingLabel="Registering..."
            loading={isSubmitting}
          />
    </div>
  );
};

export default SchoolRegistrationForm;
