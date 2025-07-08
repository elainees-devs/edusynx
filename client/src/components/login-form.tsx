// client/src/components/login-form.tsx
import React from "react";
import LoginButton from "./login-button";
import { useNavigate } from "react-router-dom";

export interface LoginFormProps {
  email: string;
  password: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: (event: React.FormEvent) => Promise<void>;
  onResetPassword: () => void;
  slug: string; 
}

const LoginForm: React.FC<LoginFormProps> = ({
  email,
  password,
  setEmail,
  setPassword,
  onSubmit,
  onResetPassword,
  slug
}) => {
  const navigate = useNavigate();
  if (!slug) return <div>Invalid school slug</div>;

  return (
    <form
      className="flex flex-col md:flex-row h-auto md:h-[85vh] rounded-2xl bg-white overflow-hidden"
      onSubmit={onSubmit}
    >
      {/* Left Section */}
      <div className="w-full p-8 md:w-1/2 bg-emerald-200">
        {/* Left side content*/}
      </div>

      {/* Right Section */}
      <div className="w-full p-8 md:w-1/2">
        <div className="w-full max-w-[90%] sm:max-w-md mx-auto">
          <h2 className="p-4 text-xl font-bold text-center">Login</h2>
          <p className="p-4 mb-8 text-center text-gray-600">
            Welcome back! Please login to your account
          </p>

          <label htmlFor="email">Email:</label>
          <input
            className="w-full p-2 mb-4 border rounded border-gray"
            id="email"
            type="text"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password:</label>
          <input
            className="w-full p-2 mb-4 border rounded border-gray"
            id="password"
            type="password"
            placeholder="........"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-emerald-500" />
              Remember Me
            </label>
            <button
              type="button"
              onClick={onResetPassword}
              className="text-emerald-600 hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <div className="mb-4 -mt-8">
            <LoginButton />
          </div>

          <div className="mt-6 text-sm text-center text-gray-600">
            Don’t have an account?{" "}
            <button
              type="button"
              onClick={() => navigate(`/${slug}/signup`)}
              className="text-emerald-600 hover:underline"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
