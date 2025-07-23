// client/src/components/forms/super-admin-login-form.tsx
import React from "react";

export interface LoginFormProps {
  email: string;
  password: string;
  rememberMe: boolean;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setRememberMe: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (event: React.FormEvent) => Promise<void>;
  onResetPassword: () => void;
}

const SuperAdminLoginForm: React.FC<LoginFormProps> = ({
  email,
  password,
  rememberMe,
  setEmail,
  setPassword,
  setRememberMe,
  onSubmit,
  onResetPassword,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="max-w-md mx-auto mt-10 bg-white border border-dashed shadow-lg rounded-2xl p-8 space-y-6"
    >
      <h2 className="text-2xl font-semibold text-center text-gray-800">Super Admin Login</h2>

      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          required
        />
      </div>

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center space-x-2 text-gray-600">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="rounded border-gray-300 text-teal-600 shadow-sm focus:ring-teal-500"
          />
          <span>Remember Me</span>
        </label>
        <button
          type="button"
          onClick={onResetPassword}
          className="text-teal-600 hover:underline focus:outline-none"
        >
          Forgot Password?
        </button>
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-teal-400 text-white font-semibold rounded-lg shadow hover:bg-blue-200 hover:text-gray transition duration-200"
      >
        Login
      </button>
    </form>
  );
};

export default SuperAdminLoginForm;
