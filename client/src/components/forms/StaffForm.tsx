import React, { useState } from "react";
import { SubmitButton } from "../../shared";
import type { CreateStaffDTO, UpdateStaffDTO, IStaff, StaffRole } from "../../types/people/StaffTypes";

interface StaffFormProps {
  initial?: IStaff;
  schoolId: string;
  onSubmit: (payload: CreateStaffDTO | UpdateStaffDTO) => void;
  loading?: boolean;
}

const roles: { value: StaffRole; label: string }[] = [
  { value: "teacher", label: "Teacher" },
  { value: "principal", label: "Principal" },
  { value: "deputy-principal", label: "Deputy Principal" },
  { value: "accountant", label: "Accountant" },
  { value: "school-admin", label: "School Admin" },
];

const StaffForm: React.FC<StaffFormProps> = ({ initial, schoolId, onSubmit, loading }) => {
  const [firstName, setFirstName] = useState(initial?.firstName ?? "");
  const [middleName, setMiddleName] = useState(initial?.middleName ?? "");
  const [lastName, setLastName] = useState(initial?.lastName ?? "");
  const [email, setEmail] = useState(initial?.email ?? "");
  const [primaryPhoneNumber, setPrimaryPhoneNumber] = useState(initial?.primaryPhoneNumber ?? "");
  const [secondaryPhoneNumber, setSecondaryPhoneNumber] = useState(initial?.secondaryPhoneNumber ?? "");
  const [nationality, setNationality] = useState(initial?.nationality ?? "Kenyan");
  const [role, setRole] = useState<StaffRole>(initial?.role ?? "teacher");
  const [position, setPosition] = useState(initial?.position ?? "");
  const [isClassTeacher, setIsClassTeacher] = useState(initial?.isClassTeacher ?? false);
  const [assignedClass, setAssignedClass] = useState(
    typeof initial?.assignedClass === "string" ? initial.assignedClass : ""
  );
  const [employmentDate, setEmploymentDate] = useState(
    initial?.employmentDate ? initial.employmentDate.slice(0, 10) : ""
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const base = {
      firstName,
      middleName: middleName || undefined,
      lastName,
      email,
      primaryPhoneNumber,
      secondaryPhoneNumber: secondaryPhoneNumber || undefined,
      nationality,
      role,
      position: position || undefined,
      employmentDate: employmentDate || undefined,
    };
    const payload = initial
      ? (base as UpdateStaffDTO)
      : ({
          ...base,
          school: schoolId,
          ...(role === "teacher"
            ? { isClassTeacher: isClassTeacher || undefined, assignedClass: assignedClass || undefined }
            : {}),
        } as CreateStaffDTO);
    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 border rounded shadow space-y-4">
      <h2 className="text-lg font-semibold">{initial ? "Edit Staff" : "Register Staff"}</h2>

      <div>
        <label htmlFor="sf-first" className="block mb-1 text-sm font-medium">First Name</label>
        <input id="sf-first" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required className="border p-2 rounded w-full" />
      </div>

      <div>
        <label htmlFor="sf-middle" className="block mb-1 text-sm font-medium">Middle Name</label>
        <input id="sf-middle" type="text" value={middleName} onChange={(e) => setMiddleName(e.target.value)} className="border p-2 rounded w-full" />
      </div>

      <div>
        <label htmlFor="sf-last" className="block mb-1 text-sm font-medium">Last Name</label>
        <input id="sf-last" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required className="border p-2 rounded w-full" />
      </div>

      <div>
        <label htmlFor="sf-email" className="block mb-1 text-sm font-medium">Email</label>
        <input id="sf-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="border p-2 rounded w-full" />
      </div>

      <div>
        <label htmlFor="sf-phone" className="block mb-1 text-sm font-medium">Primary Phone</label>
        <input id="sf-phone" type="tel" value={primaryPhoneNumber} onChange={(e) => setPrimaryPhoneNumber(e.target.value)} required className="border p-2 rounded w-full" />
      </div>

      <div>
        <label htmlFor="sf-phone2" className="block mb-1 text-sm font-medium">Secondary Phone</label>
        <input id="sf-phone2" type="tel" value={secondaryPhoneNumber} onChange={(e) => setSecondaryPhoneNumber(e.target.value)} className="border p-2 rounded w-full" />
      </div>

      <div>
        <label htmlFor="sf-nationality" className="block mb-1 text-sm font-medium">Nationality</label>
        <input id="sf-nationality" type="text" value={nationality} onChange={(e) => setNationality(e.target.value)} required className="border p-2 rounded w-full" />
      </div>

      <div>
        <label htmlFor="sf-role" className="block mb-1 text-sm font-medium">Role</label>
        <select id="sf-role" value={role} onChange={(e) => setRole(e.target.value as StaffRole)} required className="border p-2 rounded w-full">
          {roles.map((r) => (
            <option key={r.value} value={r.value}>{r.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="sf-position" className="block mb-1 text-sm font-medium">Position (optional)</label>
        <input id="sf-position" type="text" value={position} onChange={(e) => setPosition(e.target.value)} placeholder="e.g. Senior Teacher" className="border p-2 rounded w-full" />
      </div>

      <div>
        <label htmlFor="sf-edate" className="block mb-1 text-sm font-medium">Employment Date</label>
        <input id="sf-edate" type="date" value={employmentDate} onChange={(e) => setEmploymentDate(e.target.value)} className="border p-2 rounded w-full" />
      </div>

      {role === "teacher" && !initial && (
        <>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={isClassTeacher} onChange={(e) => setIsClassTeacher(e.target.checked)} />
            Class Teacher
          </label>
          {isClassTeacher && (
            <div>
              <label htmlFor="sf-class" className="block mb-1 text-sm font-medium">Assigned Class</label>
              <input id="sf-class" type="text" value={assignedClass} onChange={(e) => setAssignedClass(e.target.value)} placeholder="Class ID" className="border p-2 rounded w-full" />
            </div>
          )}
        </>
      )}

      <SubmitButton label={initial ? "Update" : "Create Staff"} loading={loading} />
    </form>
  );
};

export default StaffForm;
