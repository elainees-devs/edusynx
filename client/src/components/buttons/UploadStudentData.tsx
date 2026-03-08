// client/src/components/forms/UploadStudentsButton.tsx
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Swal from "sweetalert2";
import { uploadStudentsFile } from "../../api/student.api";
import type { Student } from "../../types";

interface UploadStudentsButtonProps {
  onUploadSuccess?: (students: Student[]) => void;
}

const UploadStudentsButton: React.FC<UploadStudentsButtonProps> = ({ onUploadSuccess }) => {
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;

      try {
        const uploadedStudents = await uploadStudentsFile(acceptedFiles[0]);

        Swal.fire({
          icon: "success",
          title: "Upload Successful",
          text: `Successfully uploaded ${uploadedStudents.length} students`,
        });

        if (onUploadSuccess) onUploadSuccess(uploadedStudents);
      } catch (error: unknown) {
        let message = "Unexpected error while uploading";
        if (error instanceof Error) message = error.message;

        Swal.fire({
          icon: "error",
          title: "Upload Failed",
          text: message,
        });
      }
    },
    [onUploadSuccess]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx", ".xls"],
    },
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={`p-4 border-2 border-dashed rounded-md cursor-pointer text-center ${
        isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
      }`}
    >
      <input {...getInputProps()} />
      {isDragActive ? <p>Drop the file here...</p> : <p>Drag & drop a CSV/Excel file here, or click to select file</p>}
    </div>
  );
};

export default UploadStudentsButton;