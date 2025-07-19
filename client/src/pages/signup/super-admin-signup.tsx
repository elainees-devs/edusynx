// client/src/pages/signup/super-admin-signup.tsx
import React, { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";
import type { ISuperAdmin } from "../../types/people/user.types";
import SuperAdminFormFields from "../../components/forms/super-admin-signup-form";
import { signupSuperAdmin } from "../../api/super-admin-api";

const SuperAdminSignUpForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISuperAdmin>();

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const onSubmit: SubmitHandler<ISuperAdmin> = async (data) => {
    try {
      const result = await signupSuperAdmin(data);
      console.log("API response:", result);

      await Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Super admin registered successfully!",
      });
    } catch (error) {
      console.error("Submission error:", error);

      // ✅ If backend returns a validation error object with `issues`
      if (
        typeof error === "object" &&
        error !== null &&
        "issues" in error &&
        Array.isArray((error as { issues: unknown[] }).issues)
      ) {
        const issues = (error as { issues: { message: string }[] }).issues;
        Swal.fire({
          icon: "error",
          title: "Validation Error",
          html: issues.map((i) => `<div>• ${i.message}</div>`).join(""),
        });
      } else {
        // ✅ Generic error fallback
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong. Please try again.",
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 bg-white p-8 rounded shadow-md"
      >
        <SuperAdminFormFields
          register={register}
          errors={errors}
          showPassword={showPassword}
          toggleShowPassword={toggleShowPassword}
        />

        <button
          type="submit"
          className="block mx-auto bg-green-600 text-white px-4 py-2 rounded hover:bg-green-200 hover:text-gray"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SuperAdminSignUpForm;
