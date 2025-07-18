// client/src/pages/reset-password.tsx
import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";
import type { SendResetTokenBody } from "../types/email/email.types";
import { sendResetTokenEmail } from "../api/email";
import ResetPasswordFormFields from "../components/forms/reset-password-form";

const ResetPassword: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SendResetTokenBody>();

  const onSubmit: SubmitHandler<SendResetTokenBody> = async (data) => {
    try {
      await sendResetTokenEmail(data.email, data.token);

      await Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Password reset email sent successfully!",
      });
    } catch (error) {
      console.error("Submission error:", error);

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
    <div>
      <h1>Forgot Password</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <ResetPasswordFormFields register={register} errors={errors} />

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send Reset Email"}
        </button>
      </form>

      <div>
        <a href="/signin">Back to Sign In</a>
      </div>
    </div>
  );
};

export default ResetPassword;
