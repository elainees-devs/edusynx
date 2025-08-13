// client/src/components/forms/register-guardian-form.tsx
import React from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import type { RegisterGuardianInput } from "../../types";
import { SubmitButton } from "../../shared";


interface Props {
  onSubmit: (data: RegisterGuardianInput) => void;
  schoolId: string;
}

const RegisterGuardianForm: React.FC<Props> = ({ onSubmit, schoolId }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterGuardianInput>({
    defaultValues: {
      isTwoFactorEnabled: false,
    },
  });

  const submitHandler: SubmitHandler<RegisterGuardianInput> = (data) => {
    const payload = { ...data, school: schoolId };
    onSubmit(payload);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-4 max-w-md mx-auto">
      <div>
        <label htmlFor="firstName" className="block font-medium">
          First Name
        </label>
        <input
          id="firstName"
          aria-label="First Name"
          autoComplete="given-name"
          {...register("firstName", { required: "First name is required" })}
          className="input"
          placeholder="First name"
        />
        {errors.firstName && <p className="text-red-600">{errors.firstName.message}</p>}
      </div>

      <div>
        <label htmlFor="middleName" className="block font-medium">
          Middle Name
        </label>
        <input
          id="middleName"
          aria-label="Middle Name"
          autoComplete="additional-name"
          {...register("middleName")}
          className="input"
          placeholder="Middle name (optional)"
        />
      </div>

      <div>
        <label htmlFor="lastName" className="block font-medium">
          Last Name
        </label>
        <input
          id="lastName"
          aria-label="Last Name"
          autoComplete="family-name"
          {...register("lastName", { required: "Last name is required" })}
          className="input"
          placeholder="Last name"
        />
        {errors.lastName && <p className="text-red-600">{errors.lastName.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          aria-label="Email"
          autoComplete="email"
          {...register("email", {
            required: "Email is required",
            pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" },
          })}
          className="input"
          placeholder="Email"
        />
        {errors.email && <p className="text-red-600">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="secondaryEmail" className="block font-medium">
          Secondary Email
        </label>
        <input
          id="secondaryEmail"
          type="email"
          aria-label="Secondary Email"
          autoComplete="email"
          {...register("secondaryEmail", {
            pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" },
          })}
          className="input"
          placeholder="Secondary Email (optional)"
        />
        {errors.secondaryEmail && <p className="text-red-600">{errors.secondaryEmail.message}</p>}
      </div>

      <div>
        <label htmlFor="primaryPhoneNumber" className="block font-medium">
          Primary Phone Number
        </label>
        <input
          id="primaryPhoneNumber"
          aria-label="Primary Phone Number"
          autoComplete="tel"
          {...register("primaryPhoneNumber", { required: "Primary phone number is required" })}
          className="input"
          placeholder="Primary phone number"
        />
        {errors.primaryPhoneNumber && <p className="text-red-600">{errors.primaryPhoneNumber.message}</p>}
      </div>

      <div>
        <label htmlFor="secondaryPhoneNumber" className="block font-medium">
          Secondary Phone Number
        </label>
        <input
          id="secondaryPhoneNumber"
          aria-label="Secondary Phone Number"
          autoComplete="tel"
          {...register("secondaryPhoneNumber")}
          className="input"
          placeholder="Secondary phone number (optional)"
        />
      </div>

      <div>
        <label htmlFor="nationality" className="block font-medium">
          Nationality
        </label>
        <input
          id="nationality"
          aria-label="Nationality"
          {...register("nationality", { required: "Nationality is required" })}
          className="input"
          placeholder="Nationality"
        />
        {errors.nationality && <p className="text-red-600">{errors.nationality.message}</p>}
      </div>

      <div>
        <label htmlFor="avatarUrl" className="block font-medium">
          Avatar URL
        </label>
        <input
          id="avatarUrl"
          aria-label="Avatar URL"
          {...register("avatarUrl")}
          className="input"
          placeholder="Avatar URL (optional)"
        />
      </div>

      <SubmitButton label="Register Guardian" />
    </form>
  );
};

export default RegisterGuardianForm;
