// client/src/pages/stream/RegisterStream.tsx
import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import RegisterStreamForm from "../../components/forms/register-stream-form";
import Sidebar from "../../shared/layout/dashboard/sidebar";
import Topbar from "../../shared/layout/dashboard/topbar";
import type { IStream } from "../../types";

const RegisterStream: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<IStream>();

  const onSubmit = (data: IStream) => {
    // Simulate saving to API
    console.log("Registered Stream:", data.stream);

    Swal.fire({
      title: "Success!",
      text: `Stream "${data.stream}" has been registered.`,
      icon: "success",
      confirmButtonColor: "#10B981",
    });

    reset(); // Reset the form
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <Topbar role="Head Teacher" />
      <Sidebar />
      <div className="p-12 max-w-md mx-auto">
        <RegisterStreamForm onSubmit={handleSubmit(onSubmit)} register={register} />
      </div>
    </div>
  );
};

export default RegisterStream;
