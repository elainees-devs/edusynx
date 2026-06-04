import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import type { Guardian, Student, StudentHistoryEntry } from "../../types";
import { getStudentHistory } from "../../api";
import { Sidebar, Topbar } from "../../shared";

const actionLabel: Record<string, string> = {
  admitted: "Admitted",
  promoted: "Promoted",
  transferred: "Transferred",
  graduated: "Graduated",
};

const StudentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getStudentHistory(id)
      .then((data) => {
        setStudent(data);
      })
      .catch(() => {
        setStudent(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-screen">
        <div className="w-64 flex-shrink-0 bg-gray-100 overflow-y-auto">
          <Sidebar role={["school-admin", "principal"]} />
        </div>
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-shrink-0">
            <Topbar role={["school-admin", "principal"]} />
          </div>
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Loading...
          </div>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="flex h-screen">
        <div className="w-64 flex-shrink-0 bg-gray-100 overflow-y-auto">
          <Sidebar role={["school-admin", "principal"]} />
        </div>
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-shrink-0">
            <Topbar role={["school-admin", "principal"]} />
          </div>
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Student not found.
          </div>
        </div>
      </div>
    );
  }

  const history: StudentHistoryEntry[] = student.history || [];

  return (
    <div className="flex h-screen">
      <div className="w-64 flex-shrink-0 bg-gray-100 overflow-y-auto">
        <Sidebar role={["school-admin", "principal"]} />
      </div>

      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="flex-shrink-0">
          <Topbar role={["school-admin", "principal"]} />
        </div>

        <div className="flex-1 overflow-auto p-6 space-y-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
          >
            <FaArrowLeft /> Back
          </button>

          <div className="bg-white rounded-lg shadow p-6">
            <h1 className="text-2xl font-bold mb-4">
              {student.studentFirstName} {student.studentMiddleName}{" "}
              {student.studentLastName}
            </h1>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-semibold">Admission No:</span>{" "}
                {student.adm}
              </div>
              <div>
                <span className="font-semibold">Gender:</span>{" "}
                {student.studentGender}
              </div>
              <div>
                <span className="font-semibold">Status:</span>{" "}
                {student.status}
              </div>
              <div>
                <span className="font-semibold">Previous School:</span>{" "}
                {student.previousSchool || "N/A"}
              </div>
              <div>
                <span className="font-semibold">Date of Birth:</span>{" "}
                {student.dateOfBirth
                  ? new Date(student.dateOfBirth).toLocaleDateString()
                  : "N/A"}
              </div>
              <div>
                <span className="font-semibold">Admission Date:</span>{" "}
                {student.admissionDate
                  ? new Date(student.admissionDate).toLocaleDateString()
                  : "N/A"}
              </div>
            </div>
          </div>

          {student.guardians && student.guardians.length > 0 && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Guardians</h2>
              <div className="space-y-3">
                {(student.guardians as Guardian[]).map((g) => (
                  <div key={g._id} className="border rounded p-3">
                    <p className="font-medium">{g.firstName} {g.lastName}</p>
                    <p className="text-sm text-gray-600">{g.email} | {g.primaryPhoneNumber}</p>
                    {g.familyNumber && (
                      <p className="text-sm text-gray-500">Family: {g.familyNumber}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {history.length > 0 && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">History</h2>
              <div className="space-y-4">
                {history.map((entry) => (
                  <div
                    key={entry._id}
                    className="border-l-4 border-blue-500 pl-4 py-2"
                  >
                    <p className="text-sm font-medium text-blue-700">
                      {actionLabel[entry.action] || entry.action}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(entry.date).toLocaleDateString()}
                    </p>
                    {entry.fromClass && (
                      <p className="text-sm text-gray-600">
                        From Class: {entry.fromClass}
                      </p>
                    )}
                    {entry.toClass && (
                      <p className="text-sm text-gray-600">
                        To Class: {entry.toClass}
                      </p>
                    )}
                    {entry.fromStream && (
                      <p className="text-sm text-gray-600">
                        From Stream: {entry.fromStream}
                      </p>
                    )}
                    {entry.toStream && (
                      <p className="text-sm text-gray-600">
                        To Stream: {entry.toStream}
                      </p>
                    )}
                    {entry.academicYear && (
                      <p className="text-sm text-gray-600">
                        Academic Year: {entry.academicYear}
                      </p>
                    )}
                    {entry.reason && (
                      <p className="text-sm text-gray-600 italic">
                        Reason: {entry.reason}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDetail;
