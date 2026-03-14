// client/src/hooks/useClassOptions.ts
import { useEffect, useState, useMemo } from "react";
import type { IClass, IStream } from "../types";
import { getAllClasses, getAllStreams } from "../api";

export type ClassOption = {
  value: string;
  label: string;
  clasName: string;
};

export type StreamOption = {
  value: string;
  label: string;
  streamName: string;
};

export const useClassOptions = () => {
  const [classes, setClasses] = useState<ClassOption[]>([]);
  const [streams, setStreams] = useState<StreamOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [classList, streamList]: [IClass[], IStream[]] =
          await Promise.all([getAllClasses(), getAllStreams()]);

        // Map streams for dropdown
        const streamOptions: StreamOption[] = streamList.map((s) => ({
          value: s._id,
          streamName: s.streamName,
          label: s.streamName,
        }));
        setStreams(streamOptions);

        // Map classes
        const classOptions: ClassOption[] = classList.map((cls) => ({
          value: cls._id,
          clasName: cls.clasName,
          label: cls.clasName,
        }));

        setClasses(classOptions);
        setError("");
      } catch (err: unknown) {
        setError(
          err && typeof err === "object" && "message" in err
            ? (err as { message: string }).message
            : "Failed to fetch classes or streams",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredClassOptions = useMemo(() => classes, [classes]);
  const filteredStreamOptions = useMemo(() => streams, [streams]);

  return {
    classOptions: filteredClassOptions,
    streamOptions: filteredStreamOptions,
    loading,
    error,
  };
};
export default useClassOptions;
