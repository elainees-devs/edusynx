// client/src/components/forms/register-subject-form.tsx
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import type { ISubject, IClass } from "../../types";


export default function RegisterSubjectForm() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ISubject>();
  const [classes, setClasses] = useState<IClass[]>([]);

  // ✅ Fetch class list dynamically (replace with your API endpoint)
  useEffect(() => {
    async function fetchClasses() {
      try {
        const res = await fetch("/api/classes");
        const data = await res.json();
        setClasses(data);
      } catch (err) {
        console.error("Failed to load classes", err);
      }
    }
    fetchClasses();
  }, []);

  // ✅ Form submit handler
  const onSubmit = async (data: ISubject) => {
    try {
      const res = await fetch("/api/subjects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to register subject");

      Swal.fire({
        icon: "success",
        title: "Subject Registered!",
        text: `${data.subjectName} added successfully.`,
        confirmButtonColor: "#2563eb",
      });
      reset();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: (error as Error).message,
      });
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-center">Register New Subject</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Subject Name */}
        <div>
          <label className="block mb-1 font-medium">Subject Name</label>
          <input
            type="text"
            {...register("subjectName", { required: "Subject name is required" })}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. Mathematics"
          />
          {errors.subjectName && (
            <p className="text-red-500 text-sm mt-1">{errors.subjectName.message}</p>
          )}
        </div>

        {/* Class Reference */}
        <div>
          <label className="block mb-1 font-medium">Select Grade</label>
          <select
            {...register("classRef", { required: "Please select a grade" })}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Select Grade --</option>
            {classes.map((cls) => (
              <option key={cls._id} value={cls._id}>
                {cls.grade}
              </option>
            ))}
          </select>
          {errors.classRef && (
            <p className="text-red-500 text-sm mt-1">{errors.classRef.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {isSubmitting ? "Saving..." : "Register Subject"}
        </button>
      </form>
    </div>
  );
}
