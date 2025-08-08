// client/src/hooks/useClassOptions.ts
import { useEffect, useState } from "react";
import { getClassesByFilter } from "../api/class.api";

type ClassOption = {
  value: string;         // class _id
  label: string;         // e.g., "Grade 6 - East"
  grade: string;         // grade from API (string)
  streamId: string;      // stream ObjectId string
  streamName: string;    // stream name
};

export const useClassOptions = (schoolId: string | null) => {
  const [classOptions, setClassOptions] = useState<ClassOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClasses = async () => {
      if (!schoolId) return;

      setLoading(true);
      try {
        const classList = await getClassesByFilter(schoolId);

        const options: ClassOption[] = classList.map((cls) => {
          const stream =
            typeof cls.stream === "object" && cls.stream
              ? cls.stream
              : { _id: "unknown", streamName: "Unknown Stream" };

          return {
            value: cls._id,
            label: `Grade ${cls.grade} - ${stream.streamName}`,
            grade: cls.grade,
            streamId: stream._id,
            streamName: stream.streamName,
          };
        });

        setClassOptions(options);
        setError("");
      } catch (err: unknown) {
        if (err && typeof err === "object" && "message" in err) {
          setError((err as { message: string }).message);
        } else {
          setError("Failed to fetch classes.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, [schoolId]);

  return { classOptions, loading, error };
};
