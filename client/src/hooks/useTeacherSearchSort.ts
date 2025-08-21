// cliet/src/hooks/useTeacherSearchSort.ts
import { useMemo, useState } from "react";
import type { Teacher } from "../types/school/allocation";
import { searchConfig } from "../constants";

export const useTeacherSearchSort = (teachers: Teacher[]) => {
  const [sortAsc, setSortAsc] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const { keys } = searchConfig.teacher;

  const filteredTeachers = useMemo(() => {
    return teachers.filter((teacher) =>
      keys.some((key) =>
        String(teacher[key] ?? "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    );
  }, [teachers, searchTerm, keys]);

  const sortedTeachers = useMemo(() => {
    return [...filteredTeachers].sort((a, b) => {
      const nameA = `${a.firstName} ${a.middleName} ${a.lastName}`.toLowerCase();
      const nameB = `${b.firstName} ${b.middleName} ${b.lastName}`.toLowerCase();
      return sortAsc ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    });
  }, [filteredTeachers, sortAsc]);

  const toggleSort = () => setSortAsc((prev) => !prev);

  return {
    sortAsc,
    searchTerm,
    setSearchTerm,
    toggleSort,
    sortedTeachers,
  };
};
