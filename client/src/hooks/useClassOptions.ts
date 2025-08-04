// client/src/hooks/useClassOptions.ts
import { useEffect, useState } from "react";
import { getClassesByFilter } from "../api/class.api";

type ClassOption = { value: string; label: string };

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
        const options = classList.map((cls) => {
          const streamName =
            typeof cls.stream === "object" && "streamName" in cls.stream
              ? cls.stream.streamName
              : "Unknown Stream";

          return {
            value: cls._id,
            label: `Grade ${cls.grade} - ${streamName}`,
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
