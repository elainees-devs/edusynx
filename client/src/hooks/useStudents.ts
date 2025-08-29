// client/src/hooks/useStudents.ts
import { useEffect, useState } from "react";
import { getActiveStudents } from "../api/student.api";
import type { IClass, IStream, Student } from "../types";
import { searchConfig } from "../constants";
import { getAllClasses } from "../api";
import { getAllStreams } from "../api/stream.api";

export const useStudents = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [classes,setClasses] = useState<IClass[]>([]);
  const [streams,setStreams] = useState<IStream[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const { keys } = searchConfig.student;

  const handleSort = () => setSortAsc((prev) => !prev);

  // filtering
  const filteredStudents = students.filter((student) =>
    keys.some((key) =>
      String(student[key as keyof Student] ?? "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
  );

  // sorting
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    const nameA =
      `${a.studentFirstName} ${a.studentMiddleName} ${a.studentLastName}`.toLowerCase();
    const nameB =
      `${b.studentFirstName} ${b.studentMiddleName} ${b.studentLastName}`.toLowerCase();
    return sortAsc ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentData, classData, streamData] = await Promise.all([
          getActiveStudents(),
          getAllClasses(),
          getAllStreams(), 
        ]);
        setStudents(studentData);
        setClasses(classData);
        setStreams(streamData); 
      } catch (err) {
        setError("Failed to fetch students or classes");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    students, // raw state (for updates like delete/edit)
    setStudents,
    sortedStudents, // derived state (for UI display)
    loading,
    classes,
    streams,
    error,
    sortAsc,
    searchTerm,
    setSearchTerm,
    handleSort,
  };
};
