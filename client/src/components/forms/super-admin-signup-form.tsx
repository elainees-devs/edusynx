// client/src/components/forms/super-admin-signup-form.tsx
import React from "react";

interface SuperAdminFormData {
  email: string;
  password: string;
  role: string;
}

interface SuperAdminFormFieldsProps {
  formData: SuperAdminFormData;
  errors: Partial<SuperAdminFormData>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SuperAdminFormFields: React.FC<SuperAdminFormFieldsProps> = ({
  formData,
  errors,
  handleChange,
}) => {
  return (
    <>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
      </div>

      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
      </div>

      <div>
        <label>Role:</label>
        <input
          type="text"
          name="role"
          value={formData.role}
          onChange={handleChange}
          readOnly
        />
        {errors.role && <p style={{ color: "red" }}>{errors.role}</p>}
      </div>
    </>
  );
};

export default SuperAdminFormFields;
