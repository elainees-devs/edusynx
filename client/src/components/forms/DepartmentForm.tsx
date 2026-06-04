import React, { useEffect, useState } from "react";
import { SubmitButton } from "../../shared";
import { getAllStaff } from "../../api/StaffApi";
import type {
  CreateDepartmentDTO,
  UpdateDepartmentDTO,
} from "../../api/DepartmentApi";
import type { IStaff } from "../../types/people/StaffTypes";
import type { IDepartment } from "../../types/school/AcademicTypes";

interface DepartmentFormProps {
  initial?: IDepartment;
  schoolId: string;
  onSubmit: (payload: CreateDepartmentDTO | UpdateDepartmentDTO) => void;
  loading?: boolean;
}

const DepartmentForm: React.FC<DepartmentFormProps> = ({
  initial,
  schoolId,
  onSubmit,
  loading,
}) => {
  const [departmentName, setDepartmentName] = useState(
    initial?.departmentName ?? "",
  );
  const [headOfDepartment, setHeadOfDepartment] = useState(
    typeof initial?.headOfDepartment === "object" && initial?.headOfDepartment
      ? (initial.headOfDepartment as IStaff)._id ?? ""
      : typeof initial?.headOfDepartment === "string"
        ? initial.headOfDepartment
        : "",
  );
  const [staffList, setStaffList] = useState<IStaff[]>([]);

  useEffect(() => {
    getAllStaff({ schoolId: "", page: 1, limit: 999 })
      .then((res) => setStaffList(res.data))
      .catch(() => {});
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = initial
      ? ({
          departmentName,
          headOfDepartment: headOfDepartment || undefined,
        } as UpdateDepartmentDTO)
      : ({
          school: schoolId,
          departmentName,
          headOfDepartment: headOfDepartment || undefined,
        } as CreateDepartmentDTO);
    onSubmit(payload);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-4 border rounded shadow space-y-4"
    >
      <h2 className="text-lg font-semibold">
        {initial ? "Edit Department" : "Register Department"}
      </h2>

      <div>
        <label
          htmlFor="dept-name"
          className="block mb-1 text-sm font-medium"
        >
          Department Name
        </label>
        <input
          id="dept-name"
          type="text"
          value={departmentName}
          onChange={(e) => setDepartmentName(e.target.value)}
          required
          minLength={3}
          className="border p-2 rounded w-full"
        />
      </div>

      <div>
        <label
          htmlFor="dept-hod"
          className="block mb-1 text-sm font-medium"
        >
          Head of Department
        </label>
        <select
          id="dept-hod"
          value={headOfDepartment}
          onChange={(e) => setHeadOfDepartment(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="">— Select —</option>
          {staffList.map((s) => (
            <option key={s._id} value={s._id}>
              {s.firstName} {s.middleName ? s.middleName + " " : ""}
              {s.lastName} ({s.employeeNumber})
            </option>
          ))}
        </select>
      </div>

      <SubmitButton
        label={initial ? "Update" : "Create Department"}
        loading={loading}
      />
    </form>
  );
};

export default DepartmentForm;
