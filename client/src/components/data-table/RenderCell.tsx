// client/src/components/data-table/render-cell.tsx
import React from "react";
import { normalizeValue } from "../../utils/normalizeValue";

export const renderCell = (
  field: { key: string; label: string; type?: string; isLink?: boolean },
  value: string | number | boolean | null | undefined,
  inputValue: string | number | boolean | null | undefined,
  isEditing: boolean,
  handleChange: React.ChangeEventHandler<HTMLInputElement>
) => {
  if (!isEditing) {
    if (field.isLink && typeof value === "string") {
      return (
        <a
          href={value}
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 hover:underline"
        >
          Website
        </a>
      );
    }

    if (field.key === "isActive") {
      return (
        <span
          className={
            value ? "text-green-600 font-medium" : "text-gray-600 font-medium"
          }
        >
          {value === "true" ? "Active" : "Inactive"}
        </span>
      );
    }

    return value !== null && value !== undefined ? String(value) : "N/A";
  }

  if (field.type === "checkbox") {
    return (
      <input
        type="checkbox"
        name={field.key}
        checked={Boolean(inputValue === "true" || inputValue === true)}
        onChange={handleChange}
      />
    );
  }

  return (
    <input
      type={field.type || "text"}
      name={field.key}
      value={normalizeValue(inputValue)}
      onChange={handleChange}
      className="w-full px-2 py-1 border"
    />
  );
};
