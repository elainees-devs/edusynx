// client/src/pages/signin/super-admin-signin.tsx
import { useState } from "react";
import Swal from "sweetalert2";
import { SuperAdminLoginForm } from "../../components/forms";
import { useNavigate } from "react-router-dom"; 
import { useUserAuth } from "../../hooks";
import { loginSuperAdmin } from "../../api";

const SuperAdminSignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const useAuth = useUserAuth();
  const navigate = useNavigate(); 

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { user } = await loginSuperAdmin(email, password);
         console.log("Logged-in user role:", user.role);

      useAuth.loginSuperAdmin(user);

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: `Welcome back, Super Admin!`,
        timer: 1500,
        showConfirmButton: false,
      });

      // ✅ Redirect to dashboard after success
      setTimeout(() => {
        navigate("/dashboard/super-admin");
      }, 1500); // Give time for SweetAlert2 to show
    } catch (error) {
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
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Invalid email or password. Please try again.",
        });
      }
    }
  };

  return (
    <div>
      <SuperAdminLoginForm
        email={email}
        password={password}
        rememberMe={rememberMe}
        setEmail={setEmail}
        setPassword={setPassword}
        setRememberMe={setRememberMe}
        onSubmit={handleLogin}
        onResetPassword={() => Swal.fire("Password reset flow not implemented")}
      />
    </div>
  );
};

export default SuperAdminSignIn;
