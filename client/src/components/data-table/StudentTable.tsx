import React, { useEffect, useMemo, useState } from "react";
import { FaUserPlus, FaEdit, FaTrash, FaSave, FaTimes, FaExchangeAlt } from "react-icons/fa";
import type { Guardian, IClass, IStream, Student } from "../../types";
import { countStudents, getAllClasses, getAllStreams } from "../../api";
import { resolveId, sortByAdmissionNumber, sortByFirstName } from "../../utils";
import GuardianFormModal from "../forms/RegisterGuardianFormModal";

interface StudentTableProps {
  students: Student[];
  onSort: () => void;
  onAdd: () => void;
  onAddGuardian?: (student: Student, newGuardian: Guardian) => void;
  onEdit: (id: string, updatedData: Partial<Student>) => void;
  onDelete: (student: Student) => void;
  onTransfer: (student: Student) => void;
  selectedIds: string[];
  onSelectionChange: (ids: string[]) => void;
  page: number;
  limit: number;
}

const StudentTable: React.FC<StudentTableProps> = ({
  students,
  onEdit,
  onDelete,
  onTransfer,
  selectedIds,
  onSelectionChange,
  page,
  limit,
}) => {
  const [classes, setClasses] = useState<IClass[]>([]);
  const [streams, setStreams] = useState<IStream[]>([]);
  const [totalStudents, setTotalStudents] = useState<number>(0);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Student>>({});
  const [sortAsc, setSortAsc] = useState(true);
  const [sortField, setSortField] = useState<"adm" | "studentFirstName">("adm");

  const [guardianModalStudent, setGuardianModalStudent] =
    useState<Student | null>(null);
  const [studentGuardians, setStudentGuardians] = useState<
    Record<string, Guardian[]>
  >({});

  useEffect(() => {
    const loadData = async () => {
      try {
        const [studentClasses, streamsData, totalStudentsData] =
          await Promise.all([
            getAllClasses(),
            getAllStreams(),
            countStudents(),
          ]);

        setClasses(studentClasses || []);
        setStreams(streamsData || []);
        setTotalStudents(totalStudentsData.count || 0);
      } catch (error) {
        console.error("Failed to load classes/streams/total students:", error);
        setClasses([]);
        setStreams([]);
        setTotalStudents(0);
      }
    };
    loadData();
  }, []);

  const classMap = useMemo(
    () => new Map(classes.map((cls) => [cls._id, cls.clasName])),
    [classes],
  );
  const streamMap = useMemo(
    () => new Map(streams.map((s) => [s._id, s.streamName])),
    [streams],
  );

  const startEditing = (student: Student) => {
    setEditingId(student._id);
    setEditData({
      studentFirstName: student.studentFirstName,
      studentMiddleName: student.studentMiddleName,
      studentLastName: student.studentLastName,
      studentGender: student.studentGender,
      classId: resolveId(student.classId),
      stream:
        typeof student.stream === "object"
          ? (student.stream as IStream)._id
          : student.stream,
      status: student.status,
    });
  };
  const cancelEditing = () => {
    setEditingId(null);
    setEditData({});
  };
  const handleChange = (field: keyof Partial<Student>, value: string) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };
  const saveEdit = () => {
    if (!editingId) return;
    const updatedData: Partial<Student> = {
      studentFirstName: editData.studentFirstName?.trim(),
      studentMiddleName: editData.studentMiddleName?.trim(),
      studentLastName: editData.studentLastName?.trim(),
      studentGender: editData.studentGender,
      classId: editData.classId,
      stream: editData.stream,
      status: editData.status,
    };
    onEdit(editingId, updatedData);
    cancelEditing();
  };

  const allSelected =
    students.length > 0 && selectedIds.length === students.length;
  const toggleAll = () => {
    if (allSelected) {
      onSelectionChange([]);
    } else {
      onSelectionChange(students.map((s) => s._id));
    }
  };
  const toggleOne = (id: string) => {
    if (selectedIds.includes(id)) {
      onSelectionChange(selectedIds.filter((x) => x !== id));
    } else {
      onSelectionChange([...selectedIds, id]);
    }
  };

  if (!students || students.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">No students found.</div>
    );
  }

  let sortedStudents = [...students];
  if (sortField === "adm")
    sortedStudents = sortByAdmissionNumber(sortedStudents);
  else if (sortField === "studentFirstName")
    sortedStudents = sortByFirstName(sortedStudents);
  if (!sortAsc) sortedStudents.reverse();

  return (
    <div className="overflow-x-auto">
      <p className="mb-2 mr-8 text-right font-semibold text-gray-700">
        Total number of students: <span className="table-data-count">{totalStudents}</span>
      </p>
      <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr className="text-left text-sm font-semibold text-gray-700">
            <th className="px-4 py-2 border w-10">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={toggleAll}
              />
            </th>
            <th className="px-4 py-2 border">#</th>
            <th
              className="px-4 py-2 border cursor-pointer select-none"
              onClick={() => {
                if (sortField === "adm") setSortAsc(!sortAsc);
                else {
                  setSortField("adm");
                  setSortAsc(true);
                }
              }}
            >
              Adm No {sortField === "adm" ? (sortAsc ? "▲" : "▼") : "↕"}
            </th>
            <th
              className="px-4 py-2 border cursor-pointer select-none"
              onClick={() => {
                if (sortField === "studentFirstName") setSortAsc(!sortAsc);
                else {
                  setSortField("studentFirstName");
                  setSortAsc(true);
                }
              }}
            >
              First Name{" "}
              {sortField === "studentFirstName" ? (sortAsc ? "▲" : "▼") : "↕"}
            </th>
            <th className="px-4 py-2 border">Middle</th>
            <th className="px-4 py-2 border">Last</th>
            <th className="px-4 py-2 border">Gender</th>
            <th className="px-4 py-2 border">Previous School</th>
            <th className="px-4 py-2 border">Class</th>
            <th className="px-4 py-2 border">Stream</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Guardian</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>

        <tbody>
          {sortedStudents.map((student, index) => {
            const isEditing = editingId === student._id;
            const classId = resolveId(student.classId);

            const guardianName =
              typeof student.guardianId === "object" &&
              student.guardianId !== null
                ? student.guardianId.firstName
                : (student.guardianId ?? "");

            const statusColor: Record<string, string> = {
              Active: "bg-green-100 text-green-800",
              Inactive: "bg-gray-100 text-gray-600",
              Suspended: "bg-yellow-100 text-yellow-800",
              Graduated: "bg-blue-100 text-blue-800",
              transferred: "bg-purple-100 text-purple-800",
              graduated: "bg-blue-100 text-blue-800",
            };

            return (
              <React.Fragment key={student._id}>
                <tr className="hover:bg-gray-50 text-sm">
                  <td className="px-4 py-2 border">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(student._id)}
                      onChange={() => toggleOne(student._id)}
                    />
                  </td>
                  <td className="px-4 py-2 border">
                    {(page - 1) * limit + index + 1}
                  </td>
                  <td className="px-4 py-2 border">{student.adm}</td>
                  <td className="px-4 py-2 border">
                    {isEditing ? (
                      <input
                        type="text"
                        autoFocus
                        value={editData.studentFirstName || ""}
                        onChange={(e) =>
                          handleChange("studentFirstName", e.target.value)
                        }
                        className="border p-1 rounded w-full"
                      />
                    ) : (
                      student.studentFirstName
                    )}
                  </td>
                  <td className="px-4 py-2 border">
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.studentMiddleName || ""}
                        onChange={(e) =>
                          handleChange("studentMiddleName", e.target.value)
                        }
                        className="border p-1 rounded w-full"
                      />
                    ) : (
                      student.studentMiddleName
                    )}
                  </td>
                  <td className="px-4 py-2 border">
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.studentLastName || ""}
                        onChange={(e) =>
                          handleChange("studentLastName", e.target.value)
                        }
                        className="border p-1 rounded w-full"
                      />
                    ) : (
                      student.studentLastName
                    )}
                  </td>
                  <td className="px-4 py-2 border">
                    {isEditing ? (
                      <select
                        value={editData.studentGender || ""}
                        onChange={(e) =>
                          handleChange("studentGender", e.target.value)
                        }
                        className="border p-1 rounded w-full"
                      >
                        <option value="">-- Select Gender --</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    ) : (
                      student.studentGender
                    )}
                  </td>
                  <td className="px-4 py-2 border">{student.previousSchool}</td>
                  <td className="px-4 py-2 border">
                    {isEditing ? (
                      <select
                        value={editData.classId || ""}
                        onChange={(e) =>
                          handleChange("classId", e.target.value)
                        }
                        className="border p-1 rounded w-full"
                      >
                        <option value="">-- Select Class --</option>
                        {classes.map((cls) => (
                          <option key={cls._id} value={cls._id}>
                            {cls.clasName}
                          </option>
                        ))}
                      </select>
                    ) : (
                      (classMap.get(classId!) ?? "Unknown Class")
                    )}
                  </td>
                  <td className="px-4 py-2 border">
                    {isEditing ? (
                      <select
                        value={editData.stream || ""}
                        onChange={(e) => handleChange("stream", e.target.value)}
                        className="border p-1 rounded w-full"
                      >
                        <option value="">-- Select Stream --</option>
                        {streams.map((s) => (
                          <option key={s._id} value={s._id}>
                            {s.streamName}
                          </option>
                        ))}
                      </select>
                    ) : (
                      (streamMap.get(student.stream) ?? "Unknown Stream")
                    )}
                  </td>
                  <td className="px-4 py-2 border">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                        statusColor[student.status] || "bg-gray-100"
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 border">{guardianName}</td>
                  <td className="px-4 py-2 border">
                    <div className="flex gap-2 items-center">
                      {isEditing ? (
                        <>
                          <button type="button" title="Save" onClick={saveEdit}>
                            <FaSave className="text-green-600 hover:text-green-800" />
                          </button>
                          <button
                            type="button"
                            title="Cancel"
                            onClick={cancelEditing}
                          >
                            <FaTimes className="text-gray-600 hover:text-gray-800" />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            type="button"
                            title="Add Guardian"
                            onClick={() => setGuardianModalStudent(student)}
                          >
                            <FaUserPlus className="text-blue-600 hover:text-blue-800" />
                          </button>
                          <button
                            type="button"
                            title="Edit Student"
                            onClick={() => startEditing(student)}
                          >
                            <FaEdit className="text-green-600 hover:text-green-800" />
                          </button>
                          <button
                            type="button"
                            title="Transfer Student"
                            onClick={() => onTransfer(student)}
                          >
                            <FaExchangeAlt className="text-purple-600 hover:text-purple-800" />
                          </button>
                          <button
                            type="button"
                            title="Delete Student"
                            onClick={() => onDelete(student)}
                          >
                            <FaTrash className="text-red-600 hover:text-red-800" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>

                {(studentGuardians[student._id] || []).length > 0 && (
                  <tr>
                    <td colSpan={13} className="bg-gray-50 px-4 py-2">
                      <strong>Guardians:</strong>
                      <ul className="ml-4 list-disc">
                        {studentGuardians[student._id].map((g) => (
                          <li key={g._id}>
                            {g.firstName} {g.lastName} (
                            {g.familyNumber ?? "N/A"}) | {g.email} |{" "}
                            {g.primaryPhoneNumber}
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>

      {guardianModalStudent && (
        <GuardianFormModal
          student={{
            _id: guardianModalStudent._id,
            school: guardianModalStudent.school,
            adm: Number(guardianModalStudent.adm),
          }}
          onClose={() => setGuardianModalStudent(null)}
          onSuccess={(newGuardian: Guardian) => {
            setStudentGuardians((prev) => ({
              ...prev,
              [guardianModalStudent._id]: [
                ...(prev[guardianModalStudent._id] || []),
                newGuardian,
              ],
            }));
          }}
        />
      )}
    </div>
  );
};

export default StudentTable;
