// client/utils/type-guard.ts

// Type guard to check if the school is a populated object
export function isPopulatedSchool(
  school: unknown
): school is { _id: string; isActive: boolean } {
  return (
    typeof school === "object" &&
    school !== null &&
    "_id" in school
  );
}
