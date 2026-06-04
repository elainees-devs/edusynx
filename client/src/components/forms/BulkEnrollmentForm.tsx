import React, { useEffect, useState } from "react";
import { SubmitButton } from "../../shared";
import { getActiveAcademicYear } from "../../api/AcademicYearApi";
import { getStudentsByClass } from "../../api/StudentApi";
import { createEnrollment } from "../../api/EnrollmentApi";

interface Props {
  schoolId: string;
  onSuccess: () => void;
}

const BulkEnrollmentForm: React.FC<Props> = ({ schoolId, onSuccess }) => {
  const [classId, setClassId] = useState("");
  const [streamId, setStreamId] = useState("");
  const [academicYearId, setAcademicYearId] = useState("");
  const [enrollmentType, setEnrollmentType] = useState<"new" | "re-enrollment" | "promotion">("new");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!schoolId) return;
    getActiveAcademicYear(schoolId)
      .then((ay) => setAcademicYearId(ay._id))
      .catch(() => {});
  }, [schoolId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!classId || !streamId || !academicYearId) {
      setMessage("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const students = await getStudentsByClass(classId);
      if (students.length === 0) {
        setMessage("No students found in the selected class.");
        setLoading(false);
        return;
      }

      let created = 0;
      for (const student of students) {
        await createEnrollment({
          school: schoolId,
          student: student._id,
          clas: classId,
          stream: streamId,
          academicYear: academicYearId,
          enrollmentDate: new Date().toISOString(),
          status: "active",
          enrollmentType,
        });
        created++;
      }

      setMessage(`Successfully enrolled ${created} student(s).`);
      onSuccess();
    } catch (err: any) {
      setMessage(err?.message || "Bulk enrollment failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 border rounded shadow space-y-4">
      <h2 className="text-lg font-semibold">Bulk Enrollment</h2>

      <div>
        <label htmlFor="be-class" className="block mb-1 text-sm font-medium">Class ID</label>
        <input
          id="be-class"
          type="text"
          value={classId}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setClassId(e.target.value)}
          required
          className="border p-2 rounded w-full"
        />
      </div>

      <div>
        <label htmlFor="be-stream" className="block mb-1 text-sm font-medium">Stream ID</label>
        <input
          id="be-stream"
          type="text"
          value={streamId}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStreamId(e.target.value)}
          required
          className="border p-2 rounded w-full"
        />
      </div>

      <div>
        <label htmlFor="be-ay" className="block mb-1 text-sm font-medium">Academic Year</label>
        <input
          id="be-ay"
          type="text"
          value={academicYearId}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAcademicYearId(e.target.value)}
          required
          className="border p-2 rounded w-full"
          placeholder="Auto-filled from active year"
        />
      </div>

      <div>
        <label htmlFor="be-type" className="block mb-1 text-sm font-medium">Enrollment Type</label>
        <select
          id="be-type"
          value={enrollmentType}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setEnrollmentType(e.target.value as "new" | "re-enrollment" | "promotion")
          }
          required
          className="border p-2 rounded w-full"
        >
          <option value="new">New</option>
          <option value="re-enrollment">Re-enrollment</option>
          <option value="promotion">Promotion</option>
        </select>
      </div>

      {message && (
        <p className="text-sm text-gray-700 bg-gray-100 p-2 rounded">{message}</p>
      )}

      <SubmitButton label="Enroll All Students" loading={loading} />
    </form>
  );
};

export default BulkEnrollmentForm;
