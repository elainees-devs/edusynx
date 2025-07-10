import React, { useState } from "react";

interface AdminFormData {
  email: string;
  password: string;
}

const AdminRegisterForm: React.FC = () => {
  const [formData, setFormData] = useState<AdminFormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<AdminFormData>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    const newErrors: Partial<AdminFormData> = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      // Submit logic here (e.g., API call)
      console.log("Admin Registered:", formData);
      setSubmitted(true);
    } else {
      setErrors(validationErrors);
      setSubmitted(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Admin Registration</h2>
      {submitted && <p className="text-green-600 mb-4">Registered successfully!</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-medium mb-1" htmlFor="email">
            Email
          </label>
          <input
            className="w-full border border-gray-300 p-2 rounded"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1" htmlFor="password">
            Password
          </label>
          <input
            className="w-full border border-gray-300 p-2 rounded"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default AdminRegisterForm;
