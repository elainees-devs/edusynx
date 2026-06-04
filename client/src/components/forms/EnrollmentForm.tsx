import React, { useState } from "react";
import { SubmitButton } from "../../shared";
import type {
  CreateEnrollmentPayload,
  UpdateEnrollmentPayload,
  IEnrollment,
} from "../../types/academics/EnrollmentTypes";

interface Props {
  initial?: IEnrollment;
  schoolId: string;
  onSubmit: (payload: CreateEnrollmentPayload | UpdateEnrollmentPayload) => void;
  loading?: boolean;
}

const EnrollmentForm: React.FC<Props> = ({ initial, schoolId, onSubmit, loading }) => {
  const [student, setStudent] = useState(initial?.student ?? "");
  const [clas, setClas] = useState(initial?.clas ?? "");
  const [stream, setStream] = useState(initial?.stream ?? "");
  const [academicYear, setAcademicYear] = useState(initial?.academicYear ?? "");
  const [enrollmentDate, setEnrollmentDate] = useState(
    initial?.enrollmentDate ? initial.enrollmentDate.slice(0, 10) : ""
  );
  const [status, setStatus] = useState<"active" | "transferred" | "withdrawn" | "graduated">(
    initial?.status ?? "active"
  );
  const [enrollmentType, setEnrollmentType] = useState<"new" | "re-enrollment" | "promotion">(
    initial?.enrollmentType ?? "new"
  );
  const [remarks, setRemarks] = useState(initial?.remarks ?? "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = initial
      ? ({
          student,
          clas,
          stream,
          academicYear,
          enrollmentDate,
          status,
          enrollmentType,
          remarks: remarks || undefined,
        } as UpdateEnrollmentPayload)
      : ({
          school: schoolId,
          student,
          clas,
          stream,
          academicYear,
          enrollmentDate,
          status,
          enrollmentType,
          remarks: remarks || undefined,
        } as CreateEnrollmentPayload);
    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 border rounded shadow space-y-4">
      <div>
        <label htmlFor="enr-student" className="block mb-1 text-sm font-medium">Student ID</label>
        <input
          id="enr-student"
          type="text"
          value={student}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStudent(e.target.value)}
          required
          className="border p-2 rounded w-full"
        />
      </div>

      <div>
        <label htmlFor="enr-class" className="block mb-1 text-sm font-medium">Class ID</label>
        <input
          id="enr-class"
          type="text"
          value={clas}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setClas(e.target.value)}
          required
          className="border p-2 rounded w-full"
        />
      </div>

      <div>
        <label htmlFor="enr-stream" className="block mb-1 text-sm font-medium">Stream ID</label>
        <input
          id="enr-stream"
          type="text"
          value={stream}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStream(e.target.value)}
          required
          className="border p-2 rounded w-full"
        />
      </div>

      <div>
        <label htmlFor="enr-ay" className="block mb-1 text-sm font-medium">Academic Year ID</label>
        <input
          id="enr-ay"
          type="text"
          value={academicYear}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAcademicYear(e.target.value)}
          required
          className="border p-2 rounded w-full"
        />
      </div>

      <div>
        <label htmlFor="enr-date" className="block mb-1 text-sm font-medium">Enrollment Date</label>
        <input
          id="enr-date"
          type="date"
          value={enrollmentDate}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEnrollmentDate(e.target.value)}
          required
          className="border p-2 rounded w-full"
        />
      </div>

      <div>
        <label htmlFor="enr-status" className="block mb-1 text-sm font-medium">Status</label>
        <select
          id="enr-status"
          value={status}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setStatus(e.target.value as "active" | "transferred" | "withdrawn" | "graduated")
          }
          required
          className="border p-2 rounded w-full"
        >
          <option value="active">Active</option>
          <option value="transferred">Transferred</option>
          <option value="withdrawn">Withdrawn</option>
          <option value="graduated">Graduated</option>
        </select>
      </div>

      <div>
        <label htmlFor="enr-type" className="block mb-1 text-sm font-medium">Enrollment Type</label>
        <select
          id="enr-type"
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

      <div>
        <label htmlFor="enr-remarks" className="block mb-1 text-sm font-medium">Remarks</label>
        <textarea
          id="enr-remarks"
          value={remarks}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setRemarks(e.target.value)}
          className="border p-2 rounded w-full"
          rows={3}
        />
      </div>

      <SubmitButton label={initial ? "Update" : "Create"} loading={loading} />
    </form>
  );
};

export default EnrollmentForm;
