
  // Helpers to normalize IDs
export const resolveId = (value: string | { _id: string } | null | undefined): string | undefined => {
if (!value) return undefined;
return typeof value === "object" ? value._id : value;
};