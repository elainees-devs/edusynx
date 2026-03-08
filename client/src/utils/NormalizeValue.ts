// client/src/utils/normalizeValue.ts

// Helper to format values safely for input fields
export const normalizeValue = (
  val: string | number | boolean | Date | null | undefined
): string | number | undefined => {
  if (val instanceof Date) return val.toISOString().split("T")[0];
  if (typeof val === "boolean") return val ? "true" : "false";
  if (val === null || val === undefined) return "";
  return val;
};
