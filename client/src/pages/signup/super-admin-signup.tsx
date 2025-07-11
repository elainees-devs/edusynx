// client/src/pages/signup/super-admin-signup.tsx
import React, { useState } from "react";
import SuperAdminSignUpForm from "../../components/forms/super-admin-signup-form";


interface SuperAdminFormData {
  email: string;
  password: string;
  role: string;
}

const SuperAdminSignUp: React.FC = () => {
  const [formData, setFormData] = useState<SuperAdminFormData>({
    email: "",
    password: "",
    role: "super-admin",
  });

  const [errors, setErrors] = useState<Partial<SuperAdminFormData>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<SuperAdminFormData> = {};
    if (!formData.email.includes("@")) newErrors.email = "Invalid email";
    if (formData.password.length < 6) newErrors.password = "Min 6 characters";
    if (!formData.role) newErrors.role = "Role is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    console.log("Submitted:", formData);
    setSubmitted(true);

    // TODO: Send to backend
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Super Admin Registration</h2>
      <SuperAdminSignUpForm
        formData={formData}
        errors={errors}
        handleChange={handleChange}
      />
      <button type="submit">Register</button>
      {submitted && <p style={{ color: "green" }}>Registration submitted!</p>}
    </form>
  );
};

export default SuperAdminSignUp;
