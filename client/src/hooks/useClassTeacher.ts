// client/src/hooks/useClassTeachers.ts
import { useEffect, useState } from "react";
import { getAllClassTeachers } from "../api";
import type { ClassTeacher, ITeacher, IClass, IStream } from "../types";

export const useClassTeachers = () => {
  const [teachers, setTeachers] = useState<ClassTeacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const data = await getAllClassTeachers();
        setTeachers(data);
      } catch {
        setError("Failed to fetch class teacher and class details");
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  const getTeacherName = (teacher: ITeacher | string | null | undefined) => {
    if (!teacher) return "Not Assigned";
    if (typeof teacher === "string") return teacher;
    return `${teacher.firstName} ${teacher.middleName || ""} ${teacher.lastName}`.trim();
  };

  const getGradeDisplay = (grade: string | IClass | null | undefined) => {
    if (!grade) return "Not Assigned";
    if (typeof grade === "string") return grade;
    return grade.grade || "N/A";
  };

  const getStreamDisplay = (stream: string | IStream | null | undefined) => {
    if (!stream) return "Not Assigned";
    if (typeof stream === "string") return stream;
    return stream.streamName || "N/A";
  };

  const filtered = teachers.filter((t) =>
    getTeacherName(t.teacher).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) =>
    sortAsc
      ? getTeacherName(a.teacher).localeCompare(getTeacherName(b.teacher))
      : getTeacherName(b.teacher).localeCompare(getTeacherName(a.teacher))
  );

  return {
    teachers: sorted,
    loading,
    error,
    sortAsc,
    setSortAsc,
    searchTerm,
    setSearchTerm,
    getTeacherName,
    getGradeDisplay,
    getStreamDisplay,
  };
};
