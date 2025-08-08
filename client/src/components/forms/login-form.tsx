// client/src/components/forms/login-form.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import LoginButton from "../buttons/login-button";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";

export interface LoginFormProps {
  email: string;
  password: string;
  rememberMe: boolean;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setRememberMe: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (event: React.FormEvent) => Promise<void>;
  onResetPassword: () => void;
  slug: string;
}

const LoginForm: React.FC<LoginFormProps> = ({
  email,
  password,
  rememberMe,
  setEmail,
  setPassword,
  setRememberMe,
  onSubmit,
  onResetPassword,
  slug,
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
          <div className="flex items-center border border-gray rounded mb-4 p-2">
            <MdEmail className="text-gray-500 mr-2" />
            <input
              className="w-full outline-none"
              id="email"
              type="text"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <label htmlFor="password">Password:</label>
          <div className="flex items-center border border-gray rounded mb-4 p-2">
            <RiLockPasswordLine className="text-gray-500 mr-2" />
            <input
              className="w-full outline-none"
              id="password"
              type="password"
              placeholder="........"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="accent-emerald-500"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
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