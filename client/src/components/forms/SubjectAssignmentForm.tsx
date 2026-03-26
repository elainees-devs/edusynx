
import React, { useEffect, useState } from "react";
import type { SubjectAssignment, Teacher } from "../../types/school/Allocation";
import { getAllTeachers } from "../../api/BaseUserApi";
import { getAllSubjects } from "../../api/SubjectApi";

interface SubjectOption {
  subjectName: string;
  _id: string;
}

interface Props {
  initialData?: Partial<SubjectAssignment>;
  onSubmit: (data: { subjectName: string; teacher: Teacher }) => void;
  onCancel?: () => void;
}

const SubjectAssignmentForm: React.FC<Props> = ({ initialData, onSubmit, onCancel }) => {
  const [subjectName, setSubjectName] = useState<string>(initialData?.subjectName || "");
  const [teacherId, setTeacherId] = useState<string>(initialData?.teacher?._id || "");
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [subjects, setSubjects] = useState<SubjectOption[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([getAllTeachers(), getAllSubjects()])
      .then(([teacherList, subjectList]) => {
        setTeachers(teacherList);
        setSubjects(subjectList);
      })
      .catch(() => setError("Failed to load teachers or subjects."));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const teacher = teachers.find((t: Teacher) => t._id === teacherId);
    if (!subjectName || !teacher) {
      setError("Please select both subject and teacher.");
      return;
    }
    setError(null);
    onSubmit({ subjectName, teacher });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded shadow max-w-md mx-auto">
      <h2 className="text-lg font-semibold">{initialData ? "Edit" : "Assign"} Subject</h2>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <div>
        <label className="block mb-1 font-medium">Subject</label>
        <select
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
          className="border p-2 rounded w-full"
          required
        >
          <option value="">Select subject</option>
          {subjects.map((s: SubjectOption) => (
            <option key={s._id} value={s.subjectName}>
              {s.subjectName}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block mb-1 font-medium">Teacher</label>
        <select
          value={teacherId}
          onChange={(e) => setTeacherId(e.target.value)}
          className="border p-2 rounded w-full"
          required
        >
          <option value="">Select teacher</option>
          {teachers.map((t: Teacher) => (
            <option key={t._id} value={t._id}>
              {t.firstName} {t.lastName} ({t.employmentNo})
            </option>
          ))}
        </select>
      </div>
      <div className="flex gap-2 justify-end">
        {onCancel && (
          <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-200 rounded">
            Cancel
          </button>
        )}
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
          {initialData ? "Update" : "Assign"}
        </button>
      </div>
    </form>
  );
};

export default SubjectAssignmentForm;
