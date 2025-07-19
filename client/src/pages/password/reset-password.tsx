// client/src/pages/reset-password.ts
import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";
import type { SendResetTokenBody } from "../../types/email/email.types";
import { ResetPasswordForm } from "../../components/forms";
import { sendPasswordResetEmail } from "../../api/auth";

const ResetPassword: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SendResetTokenBody>();

  const onSubmit: SubmitHandler<SendResetTokenBody> = async (data) => {
    try {
      await sendPasswordResetEmail(data.email); // ✅ only email needed

      await Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Password reset email sent successfully!",
      });
    } catch (error: unknown) {
      console.error("Submission error:", error);

      // zod validation-like structure
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
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Forgot Password</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <ResetPasswordForm register={register} errors={errors} />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {isSubmitting ? "Sending..." : "Send Reset Email"}
        </button>
      </form>

      <div className="text-center mt-4">
        <a href="/signin" className="text-sm text-blue-600 hover:underline">
          Back to Sign In
        </a>
      </div>
    </div>
  );
};

export default ResetPassword;
