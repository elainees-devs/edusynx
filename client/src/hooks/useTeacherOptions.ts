import { useEffect, useState } from "react";
import { getTeachers } from "../api/BaseUserApi";
import type { Teacher } from "../types/school/Allocation";

export type TeacherOption = {
  value: string;
  label: string;
  teacher: Teacher;
};

export const useTeacherOptions = () => {
  const [teacherOptions, setTeacherOptions] = useState<TeacherOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTeachers = async () => {
      setLoading(true);
      try {
        const res = await getTeachers({ page: 1, limit: 100 });
        const teachers: Teacher[] = Array.isArray(res.data) ? res.data : [];
        const options: TeacherOption[] = teachers.map((t) => ({
          value: t._id,
          label: `${t.firstName} ${t.lastName} (${t.employmentNo})`,
          teacher: t,
        }));
        setTeacherOptions(options);
        setError("");
      } catch (err: unknown) {
        setError(
          err && typeof err === "object" && "message" in err
            ? (err as { message: string }).message
            : "Failed to fetch teachers",
        );
      } finally {
        setLoading(false);
      }
    };
    fetchTeachers();
  }, []);

  return {
    teacherOptions,
    loading,
    error,
  };
};
export default useTeacherOptions;
