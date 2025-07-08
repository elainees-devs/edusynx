// client/src/pages/signin.tsx

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LoginForm } from "../components";
import useUserAuth from "../hooks/useUserAuth";
import { useGlobalState } from "../context/useGlobalState";
import { UserRole } from "../constants";
import Swal from "sweetalert2";
import { loginUser } from "../api/auth";

const SignIn: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const userAuth = useUserAuth();
  const { dispatch, state } = useGlobalState();

  // Redirect map
  const roleRedirectMap: Record<UserRole, string> = {
    [UserRole.SUPER_ADMIN]: "super-admin",
    [UserRole.SCHOOL_ADMIN]: "school-admin",
    [UserRole.TEACHER]: "teacher",
    [UserRole.HEADTEACHER]: "headteacher",
    [UserRole.ACCOUNTANT]: "accountant",
    [UserRole.GUARDIAN]: "guardian",
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!slug) {
      Swal.fire("Error", "Missing school identifier in URL.", "error");
      return;
    }

    try {
      const { token, user} = await loginUser(email, password);
      localStorage.setItem("token", token);

      dispatch({
        type: "UPDATE_USER",
        payload: { ...state.loggedInUser, ...user },
      });

      userAuth.loginUser(user);

      Swal.fire("Success", "Logged in successfully", "success");

      const rolePath = roleRedirectMap[user.role as UserRole];
      if (rolePath) {
        navigate(`/${slug}/dashboard/${rolePath}`);
      } else {
        navigate("/unauthorized");
      }
    } catch (error) {
      // Handle with type-safe logic
      if (
        typeof error === "object" &&
        error !== null &&
        "issues" in error &&
        Array.isArray((error as { issues: unknown[] }).issues)
      ) {
        const issues = (error as { issues: { message: string }[] }).issues;
        Swal.fire({
          icon: "error",
          title: "Validation Error",
          html: issues.map((i) => `<div>• ${i.message}</div>`).join(""),
        });
      } else {
        const message =
          typeof error === "object" && error !== null && "message" in error
            ? String((error as { message?: string }).message)
            : "Something went wrong.";
        Swal.fire({
          icon: "error",
          title: "Login Error",
          text: message,
        });
      }
    }
  };

  const handleResetPassword = () => navigate(`/${slug}/reset-password`);

  return (
    <div className="nin-h-screen p-16 bg-light">
      <LoginForm
        slug={slug!}
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
