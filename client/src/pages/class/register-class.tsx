// client/src/pages/register-class.tsx
import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { RegisterClassForm } from "../../components/forms";
import type { IClass } from "../../types";

const RegisterClass: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<IClass>();

  const onSubmit = (data: IClass) => {
    console.log("Submitted class:", data);

    Swal.fire({
      title: "Class Registered",
      text: `Class "${data.ClassName}" in stream "${data.stream}" for year ${data.academicYear} created successfully!`,
      icon: "success",
      confirmButtonColor: "#10B981",
    });

    reset();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <RegisterClassForm register={register} onSubmit={handleSubmit(onSubmit)} />
    </div>
  );
};

export default RegisterClass;
