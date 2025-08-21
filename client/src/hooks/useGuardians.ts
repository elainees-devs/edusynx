// client/src/hooks/useGuardian.ts
import { useEffect, useState } from "react";
import type { Guardian } from "../types";
import { getAllGuardians } from "../api";
import { searchConfig } from "../constants";
import { capitalizeWord } from "../utils";


export const useGuardians = () => {
  const [guardians, setGuardians] = useState<Guardian[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const { keys } = searchConfig.guardian;

  const handleSort = () => setSortAsc((prev) => !prev);

  const filteredGuardians = guardians
    .filter((guardian) =>
      keys.some((key) =>
        String(guardian[key as keyof Guardian] ?? "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    )
    .sort((a, b) => {
      const nameA = a.firstName.toLowerCase();
      const nameB = b.firstName.toLowerCase();
      return sortAsc ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    });

  useEffect(() => {
    const fetchGuardians = async () => {
      try {
        const data = await getAllGuardians();

            // Capitalize names before storing
        const formattedNames = data.map((g: Guardian) => ({
          ...g,
          firstName: capitalizeWord(g.firstName),
          middleName: g.middleName ? capitalizeWord(g.middleName) : "",
          lastName: capitalizeWord(g.lastName),
        }));

        setGuardians(formattedNames);
      } catch (err) {
        setError("Failed to fetch guardians");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGuardians();
  }, []);

  return {
    guardians: filteredGuardians,
    loading,
    error,
    sortAsc,
    searchTerm,
    setSearchTerm,
    handleSort,
  };
};
