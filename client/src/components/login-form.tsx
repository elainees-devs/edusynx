// src/components/login-form.tsx
import React from "react";
import LoginButton from "./login-button";

const LoginForm: React.FC = () => {
  return (
    <form className="flex flex-col md:flex-row h-auto md:h-[80vh] rounded-2xl bg-white overflow-hidden">
      {/* Left Section */}
      <div className="w-full p-8 md:w-1/2 bg-emerald-200">
        {/* Left side content */}
      </div>

      {/* Right Section */}
      <div className="w-full p-8 md:w-1/2">
        <div className="w-full max-w-[90%] sm:max-w-md mx-auto">
          <h2 className="p-4 text-xl font-bold text-center">Login</h2>
          <p className="p-4 mb-8 text-center text-gray-600">
            Welcome back! Please login to your account
          </p>

          <label htmlFor="username">Username:</label><br />
         <input
  className="w-full p-2 mb-4 border rounded border-gray"
  id="username"
  type="text"
  placeholder="example@gmail.com"
/><br />

          <label htmlFor="password">Password:</label><br />
          <input
            className="w-full p-2 mb-4 border rounded border-gray"
            id="password"
            type="password"
            placeholder="........"
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
