// client/src/hooks/useClassOptions.ts
import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import type { IClass, IStream } from "../types";
import { getAllClasses, getAllStreams, getPublicClassesBySlug, getPublicStreamsBySlug } from "../api";

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
  const { slug } = useParams<{ slug: string }>();
  const [classes, setClasses] = useState<ClassOption[]>([]);
  const [streams, setStreams] = useState<StreamOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let classList: IClass[] = [];
        let streamList: IStream[] = [];

        if (slug) {
          // Public signup context
          const [classRes, streamRes] = await Promise.all([
            getPublicClassesBySlug(slug),
            getPublicStreamsBySlug(slug),
          ]);
          classList = classRes.data || classRes;
          streamList = streamRes.data || streamRes;
        } else {
          // Authenticated dashboard context
          [classList, streamList] = await Promise.all([
            getAllClasses(),
            getAllStreams(),
          ]);
        }

        // Map streams for dropdown
        const streamOptions: StreamOption[] = (Array.isArray(streamList) ? streamList : []).map((s) => ({
          value: s._id,
          streamName: s.streamName,
          label: s.streamName,
        }));
        setStreams(streamOptions);

        // Map classes
        const classOptions: ClassOption[] = (Array.isArray(classList) ? classList : []).map((cls) => ({
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
  }, [slug]);


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
