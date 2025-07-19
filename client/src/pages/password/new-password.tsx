// server/src/pages/password/new-password.tsx
import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate, useSearchParams } from "react-router-dom";
import type { NewPasswordBody } from "../../types/auth/new-password.types";
import { NewPasswordForm } from "../../components/forms";
import { confirmPasswordReset } from "../../api/auth";

const NewPassword: React.FC = () => {
  const navigate = useNavigate();
  const [SearchParams] = useSearchParams();
  const token = SearchParams.get("token");
  const {
    register,
    handleSubmit,
    watch ,
    formState: { errors, isSubmitting },
  } = useForm<NewPasswordBody>();

  const onSubmit: SubmitHandler<NewPasswordBody> = async (data) => {
  if (!token) {
    Swal.fire("Error", "Token is missing from URL", "error");
    return;
  }

  console.log("Sending reset payload:", { token, newPassword: data.newPassword });

  try {
    const res = await confirmPasswordReset({
      token,
      newPassword: data.newPassword,
      confirmPassword: data.confirmPassword
    });

    console.log("Password reset response:", res.data);

    // Destructure response data
    const { role, slug } = res.data;

    if (!role) {
      throw new Error("Missing data in API response");
    }

    await Swal.fire({
      icon: "success",
      title: "Success!",
      text: "Password has been reset successfully!",
    });

    // Navigate based on role
    if (role === "super-admin") {
      navigate("/signin/super-admin");
    } else {
      if (!slug) {
        throw new Error("Missing slug for school user");
      }
      navigate(`/${slug}/signin`);
    }
  } catch (error: unknown) {
    console.error("Reset password error:", error);

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
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong. Please try again.",
      });
    }
  }
};


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <NewPasswordForm
        register={register}
        watch={watch}
        errors={errors}
        isSubmitting={isSubmitting}
      />
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Resetting..." : "Reset Password"}
      </button>
    </form>
  );
};

export default NewPassword;
