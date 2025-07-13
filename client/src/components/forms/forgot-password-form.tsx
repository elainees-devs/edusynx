// client/src/components/forms/forgot-password-form.tsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { sendPasswordResetEmail } from "../../api/auth";

interface ForgotPasswordFormProps {
  email: string;
}

const ForgotPasswordForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormProps>();
  const [serverError, setServerError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit = async (data: ForgotPasswordFormProps) => {
    try {
      setServerError(null);
      await sendPasswordResetEmail(data.email);
      Swal.fire({
        title: "Success",
        text: "Password reset email sent successfully.",
        icon: "success",
      });
      await new Promise((resolve) => setTimeout(resolve, 2000));
      navigate("/signin");
    } catch (error) {
      console.error("Error sending password reset email:", error);
      setServerError(
        error instanceof Error ? error.message : "An unexpected error occurred."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="email" className="block mb-1 font-medium">
          Email address
        </label>
        <input
          type="email"
          id="email"
          className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 ${
            errors.email
              ? "border-red-500 focus:ring-red-200"
              : "border-gray-300 focus:ring-blue-200"
          }`}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Enter a valid email address",
            },
          })}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {serverError && (
        <p className="text-red-500 text-center">{serverError}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
      >
        {isSubmitting ? "Sending..." : "Send Reset Link"}
      </button>
    </form>
  );
};

export default ForgotPasswordForm;
