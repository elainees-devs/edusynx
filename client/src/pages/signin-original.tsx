// src/pages/signin.tsx

import { useState } from "react";
import { LoginForm } from "../components";
import { useNavigate } from "react-router-dom";
import useUserAuth from "../hooks/useUserAuth";
import { useGlobalState } from "../context/useGlobalState";
import { UserRole } from "../constants";
import Swal from "sweetalert2";
import type { IUser } from "../types/people/user.types";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const userAuth = useUserAuth();
  const { dispatch, state } = useGlobalState();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/signin`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to log in");

      const data = await response.json();
      const userData = data.accountDetails.school
        ? data.accountDetails
        : { ...data.accountDetails, school: data.accountDetails._id };

      if (!userData) throw Error("User data is missing");

      dispatch({
        type: "UPDATE_USER",
        payload: {
          ...state.loggedInUser,
          ...userData,
        },
      });

      userAuth.loginUser(userData);
      Swal.fire("Logged in successfully");

      // Redirect using switch
      switch (userData.role) {
        case UserRole.SUPER_ADMIN:
          navigate("/dashboard/super-admin");
          break;
        case UserRole.SCHOOL_ADMIN:
          navigate("/dashboard/school-admin");
          break;
        case UserRole.TEACHER:
          navigate("/dashboard/teacher");
          break;
        case UserRole.HEADTEACHER:
          navigate("/dashboard/HEADTEACHER");
          break;
        case UserRole.ACCOUNTANT:
          navigate("/dashboard/accountant");
          break;
        case UserRole.GUARDIAN:
          navigate("/dashboard/guardian");
          break;
        default:
          navigate("/unauthorized");
          break;
      }
    } catch (error) {
      Swal.fire("Invalid login details");
      console.error("Login error:", error);
    }
  };

  const handleResetPassword = () => {
    navigate("/reset-password");
  };

  return (
    <div className="h-screen p-16 bg-light">
      <LoginForm
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        onSubmit={handleLogin}
        onResetPassword={handleResetPassword}
      />
    </div>
  );
};

export default SignIn;
