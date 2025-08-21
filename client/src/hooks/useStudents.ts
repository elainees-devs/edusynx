// cliet/src/hooks/useStudents.ts
import { useEffect, useState } from "react";
import { getAllStudents } from "../api/student.api";
import type { Student } from "../types";
import { searchConfig } from "../constants";

export const useStudents = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const { keys } = searchConfig.student;

  const handleSort = () => setSortAsc((prev) => !prev);

  const filteredStudents = students.filter((student) =>
    keys.some((key) =>
      String(student[key as keyof Student] ?? "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
  );

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    const nameA =
      `${a.studentFirstName} ${a.studentMiddleName} ${a.studentLastName}`.toLowerCase();
    const nameB =
      `${b.studentFirstName} ${b.studentMiddleName} ${b.studentLastName}`.toLowerCase();
    return sortAsc ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
  });

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getAllStudents();
        setStudents(data);
      } catch (err) {
        setError("Failed to fetch students");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  return {
    students: sortedStudents,
    loading,
    error,
    sortAsc,
    searchTerm,
    setSearchTerm,
    handleSort,
  };
};
