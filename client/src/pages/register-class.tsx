// client/src/pages/register-class.tsx
import { useState } from "react";
import type { IClass } from "../types";
import { RegisterClassForm } from "../components/forms";

const RegisterClass: React.FC = () => {
  const [ClassName, setClassName] = useState<string>("");
  const [stream, setStream] = useState<string>("");
  const [academicYear, setAcademicYear] = useState<string>("");

  // Handle submit

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Construct new class object
    const newClass: IClass = {
      ClassName,
      stream,
      academicYear,
    };
    console.log("submitted class ...", newClass)

     // You can send this to your backend/API here
    // reset form if needed:
    // setClassName("");
    // setStream("");
    // setAcademicYear("");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <RegisterClassForm
        ClassName={ClassName}
        stream={stream}
        academicYear={academicYear}
        setClassName={setClassName}
        setStream={setStream}
        setAcademicYear={setAcademicYear}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default RegisterClass;
