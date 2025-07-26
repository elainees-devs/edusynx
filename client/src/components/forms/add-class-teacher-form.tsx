// client/src/components/forms/add-class-teacher-form.tsx
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import type { Teacher, ClassAllocation } from "../../types/school/allocation";

type FormData = {
  className: string;
  stream: string;
  teacherSearch: string;
};

type Props = {
  teachers: Teacher[];
  existingAllocations: ClassAllocation[];
  onAllocate: (allocation: ClassAllocation) => void;
};

const ClassTeacherForm: React.FC<Props> = ({ teachers, existingAllocations, onAllocate }) => {
  const { register, handleSubmit, reset, watch } = useForm<FormData>();
  const [searchResults, setSearchResults] = useState<Teacher[]>([]);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

  const watchSearch = watch("teacherSearch");

  useEffect(() => {
    if (watchSearch?.trim()) {
      const filtered = teachers.filter((t) =>
        t.name.toLowerCase().includes(watchSearch.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  }, [watchSearch, teachers]);

  const onSubmit = (data: FormData) => {
    if (!selectedTeacher) {
      Swal.fire("Error", "Please select a teacher from the search results", "error");
      return;
    }

    // Check for duplicate class-stream assignment
    const isDuplicateClassStream = existingAllocations.some(
      (entry) =>
        entry.className === data.className && entry.stream === data.stream
    );

    if (isDuplicateClassStream) {
      Swal.fire("Duplicate Entry", "This class and stream already has a teacher assigned.", "error");
      return;
    }

    // Check if teacher is already assigned
    const isTeacherAssigned = existingAllocations.some(
      (entry) => entry.teacher.id === selectedTeacher.id
    );

    if (isTeacherAssigned) {
      Swal.fire("Teacher Already Assigned", "This teacher is already assigned to a class.", "error");
      return;
    }

    const allocation: ClassAllocation = {
      id: Date.now(),
      className: data.className,
      stream: data.stream,
      teacher: selectedTeacher,
    };

    onAllocate(allocation);

    Swal.fire("Success!", `Allocated to ${allocation.className} - ${allocation.stream}`, "success");

    reset();
    setSelectedTeacher(null);
    setSearchResults([]);
  };

  const handleTeacherSelect = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setSearchResults([]);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label>Class Name</label>
        <select {...register("className")} className="block w-full border p-2 rounded" required>
          <option value="">Select</option>
          <option value="Grade 1">Grade 1</option>
          <option value="Grade 2">Grade 2</option>
          <option value="Grade 3">Grade 3</option>
        </select>
      </div>

      <div>
        <label>Stream</label>
        <select {...register("stream")} className="block w-full border p-2 rounded" required>
          <option value="">Select</option>
          <option value="North">North</option>
          <option value="East">East</option>
          <option value="West">West</option>
        </select>
      </div>

      <div className="relative">
        <label>Search Teacher</label>
        <input
          type="text"
          {...register("teacherSearch")}
          className="block w-full border p-2 rounded"
          placeholder="Enter teacher name"
        />
        {searchResults.length > 0 && (
          <ul className="absolute z-10 bg-white w-full border mt-1 rounded shadow max-h-48 overflow-y-auto">
            {searchResults.map((t) => (
              <li
                key={t.id}
                className="p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleTeacherSelect(t)}
              >
                {t.name}
              </li>
            ))}
          </ul>
        )}
        {selectedTeacher && (
          <p className="text-sm text-green-600 mt-1">
            Selected: {selectedTeacher.name}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
      >
        Allocate
      </button>
    </form>
  );
};

export default ClassTeacherForm;
