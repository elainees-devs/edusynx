// client/src/hooks/useSchoolBySlug.ts
import { useEffect, useState } from "react";
import { getSchoolBySlug } from "../api";


export const useSchoolBySlug = (slug?: string) => {
  const [schoolId, setSchoolId] = useState<string | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchSchool = async () => {
      if (!slug) return;
      try {
        const school = await getSchoolBySlug(slug);
        setSchoolId(school._id ?? null);
        setError("");
      } catch (err) {
        console.error("Failed to fetch school:", err);
        setError("School not found.");
        setSchoolId(null);
      }
    };

    fetchSchool();
  }, [slug]);

  return { schoolId, error };
};
