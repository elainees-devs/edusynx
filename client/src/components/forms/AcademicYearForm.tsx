import React, { useState } from "react";
import { SubmitButton } from "../../shared";
import type {
  CreateAcademicYearPayload,
  UpdateAcademicYearPayload,
  IAcademicYear,
  ITermPeriod,
} from "../../types/school/AcademicYearTypes";

interface Props {
  initial?: IAcademicYear;
  schoolId: string;
  onSubmit: (payload: CreateAcademicYearPayload | UpdateAcademicYearPayload) => void;
  loading?: boolean;
}

const emptyTerm = (): ITermPeriod => ({
  name: "",
  startDate: "",
  endDate: "",
});

const AcademicYearForm: React.FC<Props> = ({ initial, schoolId, onSubmit, loading }) => {
  const [name, setName] = useState(initial?.name ?? "");
  const [startDate, setStartDate] = useState(
    initial?.startDate ? initial.startDate.slice(0, 10) : ""
  );
  const [endDate, setEndDate] = useState(
    initial?.endDate ? initial.endDate.slice(0, 10) : ""
  );
  const [isActive, setIsActive] = useState(initial?.isActive ?? false);
  const [terms, setTerms] = useState<ITermPeriod[]>(initial?.terms ?? [emptyTerm()]);

  const handleTermChange = (index: number, field: keyof ITermPeriod, value: string) => {
    setTerms((prev) =>
      prev.map((t, i) => (i === index ? { ...t, [field]: value } : t))
    );
  };

  const addTerm = () => setTerms((prev) => [...prev, emptyTerm()]);
  const removeTerm = (index: number) =>
    setTerms((prev) => prev.filter((_, i) => i !== index));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = initial
      ? ({ name, startDate, endDate, isActive, terms } as UpdateAcademicYearPayload)
      : ({
          school: schoolId,
          name,
          startDate,
          endDate,
          isActive,
          terms,
        } as CreateAcademicYearPayload);
    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 border rounded shadow space-y-4">
      <div>
        <label className="block mb-1 text-sm font-medium">Academic Year Name</label>
        <input
          type="text"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          required
          className="border p-2 rounded w-full"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Start Date</label>
        <input
          type="date"
          value={startDate}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStartDate(e.target.value)}
          required
          className="border p-2 rounded w-full"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">End Date</label>
        <input
          type="date"
          value={endDate}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEndDate(e.target.value)}
          required
          className="border p-2 rounded w-full"
        />
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={isActive}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIsActive(e.target.checked)}
        />
        Active
      </label>

      <div>
        <p className="text-sm font-medium mb-2">Term Periods</p>
        {terms.map((term, i) => (
          <div key={i} className="flex gap-2 items-center mb-2">
            <input
              type="text"
              placeholder="Term Name"
              value={term.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleTermChange(i, "name", e.target.value)
              }
              required
              className="border p-1 rounded w-1/3 text-sm"
            />
            <input
              type="date"
              value={term.startDate}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleTermChange(i, "startDate", e.target.value)
              }
              required
              className="border p-1 rounded w-1/3 text-sm"
            />
            <input
              type="date"
              value={term.endDate}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleTermChange(i, "endDate", e.target.value)
              }
              required
              className="border p-1 rounded w-1/3 text-sm"
            />
            <button
              type="button"
              onClick={() => removeTerm(i)}
              disabled={terms.length === 1}
              className="text-red-600 hover:text-red-800 disabled:text-gray-400 text-sm"
            >
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={addTerm} className="text-blue-600 hover:text-blue-800 text-sm">
          + Add Term
        </button>
      </div>

      <SubmitButton label={initial ? "Update" : "Create"} loading={loading} />
    </form>
  );
};

export default AcademicYearForm;
