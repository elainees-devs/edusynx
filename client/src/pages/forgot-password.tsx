// client/src/pages/forgot-password.tsx
import type React from "react";
import ForgotPasswordForm from "../components/forms/forgot-password-form";

const ForgotPassword: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Forgot Password
        </h1>
        <ForgotPasswordForm />
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
