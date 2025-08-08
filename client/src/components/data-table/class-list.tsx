// client/src/components/class/class-list.tsx
import React from "react";
import type { IClass } from "../../types";
import { useForm } from "react-hook-form";

interface ClassProps {
  classOptions: string[];
  streams: string[];
  classes: IClass[];
  selectedClass: string;
  selectedStream: string;
  currentPage: number;
  totalPages: number;
  onFilterChange: (filters: { grade: string; stream: string }) => void;
  onResetFilters: () => void;
  onEdit: (cls: IClass) => void;
  onPageChange: (newPage: number) => void;
}


const ClassList: React.FC<ClassProps> = ({
  classOptions,
  classes,
  streams,
  selectedClass,
  selectedStream,
  currentPage,
  totalPages,
  onFilterChange,
  onResetFilters,
  onEdit,
  onPageChange,
}) => {
    const {register,handleSubmit, setValue} = useForm({
            defaultValues:{
                grade: selectedClass,
                stream: selectedStream
            },
        });
    const onSubmit = (data: {grade: string, stream: string}) => {
        onFilterChange(data);
    };

  const reset = () => {
  setValue("grade", "");
  setValue("stream", "");
  onResetFilters(); // optional if you want to clear filtered results on reset
};

    
  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4 items-end">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">Class</label>
          <select {...register("grade")} className="w-full px-4 py-2 border rounded-lg">
            <option value="">All Classes</option>
            {classOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">Stream</label>
          <select {...register("stream")} className="w-full px-4 py-2 border rounded-lg">
            <option value="">All Streams</option>
            {streams.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          Apply
        </button>

        <button
          type="button"
          onClick={reset}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
        >
          Reset
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-full border rounded-lg shadow-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border-b text-left">Class Name</th>
              <th className="p-3 border-b text-left">Stream</th>
              <th className="p-3 border-b text-left">Academic Year</th>
              <th className="p-3 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {classes.length > 0 ? (
              classes.map((cls) => (
                <tr key={cls._id} className="hover:bg-gray-50">
                  <td className="p-3 border-b">{cls.grade}</td>
                    {typeof cls.stream === "string" ? cls.stream : cls.stream.streamName}
                  <td className="p-3 border-b">{cls.academicYear}</td>
                  <td className="p-3 border-b">
                    <button
                      onClick={() => onEdit(cls)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-500">
                  No classes found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};


export default ClassList;
