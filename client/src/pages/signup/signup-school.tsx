// client/src/pages/signup/school-signup.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { SchoolRegistrationForm } from "../../components/forms";
import { registerSchool } from "../../api";
import type { ISchool } from "../../types";

const SchoolSignupPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ISchool>({
    defaultValues: {
      name: "",
      address: "",
      phoneNumber: "",
      email: "",
      website: "",
      establishedYear: new Date().getFullYear(),
      logoUrl: "",
      isActive: false,
      schoolCode: "",
      role: "HEADTEACHER",
    },
  });

  const onSubmit = async (data: ISchool) => {
    try {
      await registerSchool(data);
      Swal.fire("Success", "School registered successfully!", "success");
      navigate("/"); // redirect after success (update path as needed)
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Registration failed.";
      Swal.fire("Error", message, "error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-50">
      <form
        className="w-full max-w-xl p-6 my-4 space-y-5 bg-white rounded-lg shadow"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-2xl font-semibold text-center">Register School</h2>

        <SchoolRegistrationForm
          register={register}
          errors={errors}
          watch={watch}
          setValue={setValue}
          isSubmitting={isSubmitting}
        />
      </form>
    </div>
  );
};

export default SchoolSignupPage;

