// src/components/login-form.tsx
import React from "react";
import LoginButton from "./login-button";

const LoginForm: React.FC = () => {
  return (
    <form className="flex h-[80vh] rounded-2xl bg-white">
      <div className="w-1/2 p-8 rounded bg-emerald-200 rounded-2xl">
        {/* Left side content */}
      </div>
      <div className="w-1/2 p-8">
        <div className="w-3/4 mx-auto">
          <h2 className="p-4 text-xl font-bold text-center">Login</h2>
          <p className="p-4 mb-8 text-gray-600">
            Welcome back! Please login to your account
          </p>
          <label htmlFor="username">Username:</label><br />
          <input
            className="w-full p-2 mb-4 border-2 border-gray-400"
            id="username"
            type="text"
            placeholder="example@gmail.com"
          /><br />
          <label htmlFor="password">Password:</label><br />
          <input
            className="w-full p-2 mb-4 border-2 border-gray-400"
            id="password"
            type="password"
          />
          <div className="mt-4">
            <LoginButton />
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
