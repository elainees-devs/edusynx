import React, { useState } from "react";
import { useClassOptions } from "../../hooks/useClassOptions";
import { useSubjectOptions } from "../../hooks/useSubjectOptions";
import { useTeacherOptions } from "../../hooks/useTeacherOptions";
import { getAllClasses } from "../../api/ClassApi";
import { getAllStreams } from "../../api/StreamApi";
import type { SubjectAssignment, Teacher } from "../../types/school/Allocation";
import type { IClass, IStream } from "../../types/school/SchoolCoreTypes";

interface Props {
  initialData?: Partial<SubjectAssignment>;
  onSubmit: (data: { subjectName: string; teacher: Teacher, clas: IClass | undefined, stream: IStream | undefined }) => void;
  onCancel?: () => void;
}

const SubjectAssignmentForm: React.FC<Props> = ({ initialData, onSubmit, onCancel }) => {
  const [teacherId, setTeacherId] = useState<string>(initialData?.teacher?._id || "");
  const [classId, setClassId] = useState<string>("");
  const [streamId, setStreamId] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [allClasses, setAllClasses] = useState<IClass[]>([]);
  const [allStreams, setAllStreams] = useState<IStream[]>([]);

  const { classOptions, streamOptions, error: classError } = useClassOptions();
  const { subjectOptions, error: subjectError } = useSubjectOptions();
  const { teacherOptions, error: teacherError } = useTeacherOptions();
  const [subjectName, setSubjectName] = useState<string>(initialData?.subjectName || "");

  React.useEffect(() => {
    getAllClasses().then((classList) => {
      setAllClasses(Array.isArray(classList) ? classList : []);
    });
    getAllStreams().then((streamList) => {
      setAllStreams(Array.isArray(streamList) ? streamList : []);
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const teacher = teacherOptions.find((t) => t.value === teacherId)?.teacher;
    const selectedClass = allClasses.find((c) => c._id === classId);
    const selectedStream = allStreams.find((s) => s._id === streamId);
    if (!subjectName || !teacher || !classId || !streamId) {
      setError("Please select subject, teacher, class, and stream.");
      return;
    }
    setError(null);
    onSubmit({ subjectName, teacher, clas: selectedClass, stream: selectedStream });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded shadow max-w-md mx-auto">
      <h2 className="text-lg font-semibold">{initialData ? "Edit" : "Assign"} Subject</h2>
      {(error || classError || subjectError || teacherError) && <div className="text-red-600 text-sm">{error || classError || subjectError || teacherError}</div>}
      <div>
        <label className="block mb-1 font-medium">Subject</label>
        <select
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
          className="border p-2 rounded w-full"
          required
        >
          <option value="">Select subject</option>
          {subjectOptions.map((s) => (
            <option key={s.value} value={s.subjectName}>
              {s.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block mb-1 font-medium">Class</label>
        <select
          value={classId}
          onChange={(e) => setClassId(e.target.value)}
          className="border p-2 rounded w-full"
          required
        >
          <option value="">Select class</option>
          {classOptions.map((cls) => (
            <option key={cls.value} value={cls.value}>
              {cls.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block mb-1 font-medium">Stream</label>
        <select
          value={streamId}
          onChange={(e) => setStreamId(e.target.value)}
          className="border p-2 rounded w-full"
          required
        >
          <option value="">Select stream</option>
          {streamOptions.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
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
          {teacherOptions.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
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
