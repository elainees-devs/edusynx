// client/src/shared/layout/ui/submit-button.tsx
import React from "react";

interface SubmitButtonProps {
  label: string;
  loadingLabel?: string;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  label,
  loadingLabel = "Submitting...",
  className = "",
  disabled = false,
  loading = false,
}) => {
  return (
    <button
      type="submit"
      disabled={disabled || loading}
      className={`bg-teal-400 text-white px-4 py-2 rounded hover:bg-teal-200 hover:text-gray disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 ${className}`}
    >
      {loading && (
        <svg
          className="animate-spin h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
      )}
      <span>{loading ? loadingLabel : label}</span>
    </button>
  );
};

export default SubmitButton;
