// client/src/components/forms/register-guardian-form-modal.tsx
import React from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import type { Guardian, GuardianFormInput } from "../../types";


interface GuardianFormModalProps {
  student: { adm: number; school: string; _id: string };
  onClose: () => void;
  onSuccess: (guardian: Guardian) => void; // callback with typed Guardian
}

const GuardianFormModal: React.FC<GuardianFormModalProps> = ({ student, onClose, onSuccess }) => {
  const { register, handleSubmit } = useForm<GuardianFormInput>({
    defaultValues: {
      school: student.school,
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      primaryPhoneNumber: "",
      nationality: "",
    },
  });

  const onSubmit: SubmitHandler<GuardianFormInput> = async (data) => {
    try {
      // Include ADM in request for linking to student
      const payload = { ...data, adm: student.adm };
      const response = await axios.post("/api/v1/guardians", payload);
      const guardian: Guardian = response.data.guardian;
      Swal.fire("Success", "Guardian added successfully!", "success");
      onSuccess(guardian); // pass typed guardian to parent
      onClose();
    } catch (error) {
      const message = axios.isAxiosError(error) ? error.response?.data?.message : "Something went wrong";
      Swal.fire("Error", message || "Something went wrong", "error");
    }
  };

  return (
   <div className="pt-12 fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-y-auto">
  <div className="bg-white p-6 rounded w-full max-w-md my-8">
    <h2 className="text-xl mb-4">Add Guardian for {student.adm}</h2>
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <input {...register("firstName", { required: true })} placeholder="First Name" className="w-full border p-1"/>
      <input {...register("middleName")} placeholder="Middle Name" className="w-full border p-1"/>
      <input {...register("lastName", { required: true })} placeholder="Last Name" className="w-full border p-1"/>
      <input {...register("email", { required: true })} placeholder="Email" className="w-full border p-1"/>
      <input {...register("secondaryEmail")} placeholder="Secondary Email" className="w-full border p-1"/>
      <input {...register("primaryPhoneNumber", { required: true })} placeholder="Phone Number" className="w-full border p-1"/>
      <input {...register("secondaryPhoneNumber")} placeholder="Secondary Phone Number" className="w-full border p-1"/>
      <input {...register("password")} placeholder="Password" className="w-full border p-1"/>
      <input {...register("nationality", { required: true })} placeholder="Nationality" className="w-full border p-1"/>
      <input {...register("avatarUrl")} placeholder="Avatar URL" className="w-full border p-1"/>
      <div className="flex items-center space-x-2">
        <input type="checkbox" {...register("isTwoFactorEnabled")} />
        <label>Enable Two-Factor Authentication</label>
      </div>

      {/* Disabled student fields */}
      <input value={student.adm} className="w-full border p-1 bg-gray-100" disabled />

      <div className="flex justify-end gap-2 mt-4">
        <button type="button" onClick={onClose} className="px-3 py-1 border rounded">Cancel</button>
        <button type="submit" className="px-3 py-1 bg-blue-500 text-white rounded">Save</button>
      </div>
    </form>
  </div>
</div>
  );
};

export default GuardianFormModal;