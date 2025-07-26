import React, { useState } from "react";
import Swal from "sweetalert2";
import type { ClassAllocation} from "../../types/school/allocation";
import ClassTeacherForm from "../../components/forms/add-class-teacher-form";
import { sampleTeachers } from "../../data/sampleTeachers";

const ClassTeacher: React.FC = () => {
  const [allocations, setAllocations] = useState<ClassAllocation[]>([]);

  const handleAllocation = (allocation: ClassAllocation) => {
    const duplicateClass = allocations.some(
      (a) =>
        a.className.toLowerCase() === allocation.className.toLowerCase() &&
        a.stream.toLowerCase() === allocation.stream.toLowerCase()
    );

    if (duplicateClass) {
      Swal.fire({
        title: "Duplicate Entry",
        text: `Class ${allocation.className} - ${allocation.stream} is already allocated.`,
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    const duplicateTeacher = allocations.some((a) => a.teacher.id === allocation.teacher.id);

    if (duplicateTeacher) {
      Swal.fire({
        title: "Teacher Conflict",
        text: `${allocation.teacher.firstName} is already assigned to a class.`,
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    setAllocations((prev) => [...prev, allocation]);

    Swal.fire({
      title: "Success!",
      text: `Class teacher allocated to ${allocation.className} - ${allocation.stream}`,
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Allocate Class Teachers</h1>

      <ClassTeacherForm
        teachers={sampleTeachers}
        existingAllocations={allocations}
        onAllocate={handleAllocation}
      />

      <h2 className="text-xl font-semibold mt-8 mb-2">Allocated Classes</h2>
      <table className="min-w-full table-auto border mt-2">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Class Name</th>
            <th className="border px-4 py-2">Stream</th>
            <th className="border px-4 py-2">Class Teacher</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Primary Phone Number</th>
            <th className="border px-4 py-2">Secondary Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {allocations.map((entry, index) => (
            <tr key={index} className="text-center">
              <td className="border px-4 py-2">{entry.className}</td>
              <td className="border px-4 py-2">{entry.stream}</td>
              <td className="border px-4 py-2">{entry.teacher.firstName}</td>
              <td className="border px-4 py-2">{entry.teacher.email}</td>
              <td className="border px-4 py-2">{entry.teacher.primaryPhoneNumber}</td>
              <td className="border px-4 py-2">{entry.teacher.secondaryPhoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClassTeacher;
