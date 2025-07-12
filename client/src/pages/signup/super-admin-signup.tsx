// client/src/pages/signup/super-admin-signup.tsx
import React, { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";
import type { ISuperAdmin } from "../../types/people/user.types";
import SuperAdminFormFields from "../../components/forms/super-admin-signup-form";


const SuperAdminSignUpForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISuperAdmin>();

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const onSubmit: SubmitHandler<ISuperAdmin> = async (data) => {
  try {
    console.log(data);
    await Swal.fire({
      icon: "success",
      title: "Success!",
      text: "Super admin registered successfully!",
    });
  } catch (error) {
    console.error("Submission error:", error); 
    await Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
    });
  }
};


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <SuperAdminFormFields
        register={register}
        errors={errors}
        showPassword={showPassword}
        toggleShowPassword={toggleShowPassword}
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Sign Up
      </button>
    </form>
  );
};

export default SuperAdminSignUpForm;
