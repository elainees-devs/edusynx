// client/src/components/forms/class-filter-form.tsx
import React from "react";
import { useForm } from "react-hook-form";

interface FilterFormProps {
  classOptions: string[];
  streams: string[];
  selectedClass: string;
  selectedStream: string;
  onFilterChange: (filters: { grade: string; stream: string }) => void;
  onResetFilters: () => void;
}

const ClassFilterForm: React.FC<FilterFormProps> = ({
  classOptions,
  streams,
  selectedClass,
  selectedStream,
  onFilterChange,
  onResetFilters,
}) => {
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      grade: selectedClass,
      stream: selectedStream,
    },
  });

  const onSubmit = (data: { grade: string; stream: string }) => {
    onFilterChange(data);
  };

  const reset = () => {
    setValue("grade", "");
    setValue("stream", "");
    onResetFilters();
  };

  return (
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
  );
};

export default ClassFilterForm;
