import { useEffect, useState } from "react";
import { getAllSubjects } from "../api";

export type SubjectOption = {
  value: string;
  label: string;
  subjectName: string;
};

export const useSubjectOptions = () => {
  const [subjects, setSubjects] = useState<SubjectOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSubjects = async () => {
      setLoading(true);
      try {
        const subjectList = await getAllSubjects();
        const subjectOptions: SubjectOption[] = subjectList.map((s) => ({
          value: s._id,
          subjectName: s.subjectName,
          label: s.subjectName,
        }));
        setSubjects(subjectOptions);
        setError("");
      } catch (err: unknown) {
        setError(
          err && typeof err === "object" && "message" in err
            ? (err as { message: string }).message
            : "Failed to fetch subjects",
        );
      } finally {
        setLoading(false);
      }
    };
    fetchSubjects();
  }, []);

  return {
    subjectOptions: subjects,
    loading,
    error,
  };
};
export default useSubjectOptions;
