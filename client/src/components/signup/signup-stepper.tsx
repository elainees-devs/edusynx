// client/src/components/signup/signup-stepper.tsx
import { useState } from "react";
import {
  AccountInfoStep,
  ContactInfoStep,
  PersonalInfoStep,
  RoleSpecificStep,
} from "./steps";
import { registerUser } from "../../api/base-user.api";
import { useSignUpContext } from "../../context/signup/useSignUpContext";
import Swal from "sweetalert2";
import type { IBaseUser } from "../../types";

const steps = [
  "Personal Info",
  "Contact Info",
  "Account Info",
  "Role Specific",
];

const SignUpStepper = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const { formData } = useSignUpContext();

  const next = () => {
    setLoading(true);
    setTimeout(() => {
      setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
      setLoading(false);
    }, 800);
  };

  const back = () => {
    setLoading(true);
    setTimeout(() => {
      setCurrentStep((s) => Math.max(s - 1, 0));
      setLoading(false);
    }, 800);
  };

  const submit = async () => {
    setLoading(true);
    console.log("📝 Form Data:", formData);
    try {
      // Validate required fields
      if (
        !formData.email ||
        !formData.firstName ||
        !formData.middleName ||
        !formData.lastName ||
        !formData.password ||
        !formData.role ||
        !formData.school ||
        !formData.primaryPhoneNumber ||
        !formData.nationality
      ) {
        throw new Error("Please fill in all required fields.");
      }

      const userPayload: IBaseUser = {
        school: formData.school,
        firstName: formData.firstName,
        middleName: formData.middleName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        primaryPhoneNumber: formData.primaryPhoneNumber,
        nationality: formData.nationality,
        role: formData.role,

        // Optional fields
        secondaryEmail: formData.secondaryEmail,
        secondaryPhoneNumber: formData.secondaryPhoneNumber,
        avatarUrl: formData.avatarUrl,
        isActive: formData.isActive ?? true,
        isLocked: formData.isLocked ?? false,
        lastLogin: undefined,
        passwordChangedAt: undefined,
        isTwoFactorEnabled: false,

        // Add this if role is teacher
        ...(formData.role === "teacher" && {
          classId: formData.classId,
          isClassTeacher: formData.isClassTeacher ?? false,
        }),
      };

      await registerUser(userPayload);

      Swal.fire({
        icon: "success",
        title: "Registration Complete",
        text: "User registered successfully!",
      });
    } catch (err: unknown) {
      let message = "An unexpected error occurred.";
      if (err instanceof Error) {
        message = err.message;
      } else if (typeof err === "object" && err !== null && "message" in err) {
        message = String((err as { message?: string }).message);
      }

      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: message,
      });
    } finally {
      setLoading(false);
    }
  };

  const StepComponent = [
    <PersonalInfoStep key="step1" next={next} />,
    <ContactInfoStep key="step2" next={next} back={back} />,
    <AccountInfoStep key="step3" next={next} back={back} />,
    <RoleSpecificStep key="step4" back={back} submit={submit} />,
  ][currentStep];

  return (
    <div className="max-w-xl pt-4 mx-auto mt-4">
      <p className="pb-4">
        To access your account, please finish setting up your profile by
        completing the signup process.
      </p>

      <h2 className="mb-4 text-xl font-bold">{steps[currentStep]}</h2>

      {loading ? (
        <div className="flex flex-col items-center py-8">
          <div className="loader mb-2"></div>
          <p>Loading...</p>
        </div>
      ) : (
        StepComponent
      )}
    </div>
  );
};

export default SignUpStepper;
