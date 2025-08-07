// client/src/shared/ImageDropzone.tsx
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface ImageDropzoneProps<
  T extends Record<K, string | undefined>, 
  K extends keyof T
> {
  formData: T;
  setFormData: (partial: Partial<T>) => void;
  field: K;
  label: string;
}


function ImageDropzone<T extends Record<K, string | undefined>, K extends keyof T>({
  formData,
  setFormData,
  field,
  label = "image",
}: ImageDropzoneProps<T, K>) {

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setFormData({
            [field]: reader.result as T[K],
          } as unknown as Partial<T>);
        };

        reader.readAsDataURL(file);
      }
    },
    [setFormData, field]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  const imageUrl = formData[field];

  return (
  <div
    {...getRootProps()}
    className={`w-full p-4 mb-4 border-2 border-dashed rounded cursor-pointer ${
      isDragActive ? "bg-gray-100" : "bg-white"
    }`}
  >
    <input {...getInputProps()} />
    {typeof imageUrl === "string" && imageUrl ? (
      <img src={imageUrl} alt={`${label} preview`} className="mx-auto max-h-24" />
    ) : (
      <p className="text-center text-gray-500">
        {isDragActive
          ? `Drop the ${label} here...`
          : `Drag & drop ${label} here, or click to select`}
      </p>
    )}
  </div>
);
}
export default ImageDropzone;