// client/src/pages/forgot-password.tsx
import type React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "../api/auth";
import Swal from "sweetalert2";

interface ForgotPasswordFormProps {
  email: string;
}
const ForgotPassword: React.FC = () => {
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

      // Simulate API call to reset password
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
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Forgot Password
        </h1>

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
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
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

        <div className="mt-4 text-center">
          <a href="/signin" className="text-blue-600 hover:underline">
            Back to Sign In
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
