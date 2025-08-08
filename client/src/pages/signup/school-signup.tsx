// client/src/pages/signup/school-signup.tsx
import React, { useEffect, useState } from "react";
import type { ISchool } from "../../types";
import { registerSchool } from "../../api/school-api";
import { SchoolLogoDropzone } from "../../components";


const defaultSchoolData: ISchool = {
  name: "",
  address: "",
  phoneNumber: "",
  email: "",
  website: "",
  establishedYear: new Date().getFullYear(),
  logoUrl: "",
  isActive: false,
  schoolCode: "",
  role: "HEADTEACHER",
};

const SchoolRegistrationPage: React.FC = () => {
  const [formData, setFormData] = useState<ISchool>(defaultSchoolData);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setFormData((prev) => ({ ...prev, role: "HEADTEACHER" }));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "establishedYear"
          ? parseInt(value) || 0
          : type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  };

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setLoading(true);
  setMessage("");

  try {
    await registerSchool(formData);
    setMessage("School registered successfully!");
    setFormData(defaultSchoolData);
  } catch (err: unknown) {
    if (err instanceof Error) {
      setMessage(`${err.message}`);
    } else {
      setMessage("Registration failed");
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-50">
      <form
        className="w-full max-w-xl p-6 my-4 space-y-5 bg-white rounded-lg shadow"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-semibold text-center">Register School</h2>

        {message && (
          <div
            className={`p-2 text-center rounded ${
              message.includes("success")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        <input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="School Name"
          className="w-full p-2 border rounded"
          required
        />

        <textarea
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
          className="w-full p-2 border rounded"
          required
        />

        <input
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full p-2 border rounded"
          required
        />

        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 border rounded"
          required
        />

        <input
          id="website"
          name="website"
          value={formData.website}
          onChange={handleChange}
          placeholder="Website (optional)"
          className="w-full p-2 border rounded"
        />

        <input
          id="establishedYear"
          name="establishedYear"
          type="number"
          min={1800}
          max={new Date().getFullYear()}
          value={formData.establishedYear}
          onChange={handleChange}
          placeholder="Established Year"
          className="w-full p-2 border rounded"
          required
        />

        <SchoolLogoDropzone formData={formData} setFormData={setFormData} />

        <input
          id="schoolCode"
          name="schoolCode"
          value={formData.schoolCode}
          onChange={handleChange}
          placeholder="School Code"
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          name="role"
          value="HEADTEACHER"
          disabled
          readOnly
          className="w-full p-2 text-gray-600 bg-gray-100 border rounded cursor-not-allowed"
        />

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SchoolRegistrationPage;
