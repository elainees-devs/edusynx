// client/src/pages/reset-password.ts
import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";
import type { SendResetTokenBody } from "../../types/email/email.types";
import { ResetPasswordForm } from "../../components/forms";
import { useNavigate, useParams } from "react-router-dom";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { sendPasswordResetEmail } from "../../api";

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SendResetTokenBody>();

  const onSubmit: SubmitHandler<SendResetTokenBody> = async (data) => {
    try {
      await sendPasswordResetEmail(data.email); 

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
  const handleBackToSignIn = () => {
    if (slug) {
      navigate(`/${slug}/signin`);
    } else {
      navigate("/signin/super-admin");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border border-dashed rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Forgot Password?</h1>
      <p className="text-center text-gray">No worries! We’ll help you get back into your account.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <ResetPasswordForm register={register} errors={errors} />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-teal-400 text-white py-2 rounded-md hover:bg-green-200 hover:text-gray transition"
        >
          {isSubmitting ? "Sending..." : "Send Password Reset Email"}
        </button>
      </form>

      <div className="text-center mt-4">
        <button
          onClick={handleBackToSignIn}
          className="flex items-center justify-center gap-1 text-sm text-teal-600 hover:underline"
        >
          <HiArrowNarrowLeft className="text-base" />
          Back to login
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
