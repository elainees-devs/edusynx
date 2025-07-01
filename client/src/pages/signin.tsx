// client/src/pages/signin.tsx
import { useState } from "react";
import { LoginForm } from "../components";
import { useNavigate, useParams } from "react-router-dom";
import useUserAuth from "../hooks/useUserAuth";
import { useGlobalState } from "../context/useGlobalState";
import { UserRole } from "../constants";
import Swal from "sweetalert2";
import { loginUser } from "../api/auth";
import type { IUser } from "../types/people/user.types";

const SignIn: React.FC = () => {
  const { slug } = useParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const userAuth = useUserAuth();
  const { dispatch, state } = useGlobalState();

  const roleRedirectMap: Record<UserRole, string> = {
    [UserRole.SUPER_ADMIN]: "/dashboard/super-admin",
    [UserRole.SCHOOL_ADMIN]: "/dashboard/school-admin",
    [UserRole.TEACHER]: "/dashboard/teacher",
    [UserRole.HEADTEACHER]: "/dashboard/headteacher",
    [UserRole.ACCOUNTANT]: "/dashboard/accountant",
    [UserRole.GUARDIAN]: "/dashboard/guardian",
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { token, user } = await loginUser(email, password);
      localStorage.setItem("token", token);

      dispatch({
        type: "UPDATE_USER",
        payload: { ...state.loggedInUser, ...user },
      });

      userAuth.loginUser(user);
      Swal.fire("Logged in successfully");

      navigate(roleRedirectMap[user.role] || "/unauthorized");
    } catch (error: any) {
      console.error("Login error:", error);

      if (Array.isArray(error.issues)) {
        Swal.fire({
          icon: "error",
          title: "Validation Error",
          text: error.issues.map((i: any) => `• ${i.message}`).join("\n"),
        });
      } else {
        Swal.fire("Login Error", error.message || "Something went wrong.");
      }
    }
  };

  const handleResetPassword = () => navigate("/reset-password");

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
