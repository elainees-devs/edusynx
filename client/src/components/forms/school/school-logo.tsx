// src/components/SchoolLogoDropzone.tsx
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface Props {
  value: string;
  onChange: (url: string) => void;
}

const SchoolLogoDropzone: React.FC<Props> = ({ value, onChange }) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          onChange(reader.result as string); // update logoUrl in form
        };
        reader.readAsDataURL(file);
      }
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className={`w-full p-4 mb-4 border-2 border-dashed rounded cursor-pointer ${
        isDragActive ? "bg-gray-100" : "bg-white"
      }`}
    >
      <input {...getInputProps()} />
      {value ? (
        <img src={value} alt="Logo preview" className="mx-auto max-h-24" />
      ) : (
        <p className="text-center text-gray-500">
          {isDragActive
            ? "Drop the logo here..."
            : "Drag & drop logo here, or click to select"}
        </p>
      )}
    </div>
  );
};

export default SchoolLogoDropzone;
