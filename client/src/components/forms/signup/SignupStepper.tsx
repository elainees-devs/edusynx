// client/src/components/forms/signup/signup-stepper.tsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

import {
  AccountInfoStep,
  ContactInfoStep,
  PersonalInfoStep,
  RoleSpecificStep,
} from "./steps";

import { useAppDispatch, useAppSelector } from "../../../hooks/storeHooks";
import {
  nextStep,
  prevStep,
  setSchoolDetails,
  resetSignup,
} from "../../../store/slices/signupSlice";

import { signupUser, getSchoolBySlug } from "../../../api";

const steps = [
  "Personal Info",
  "Contact Info",
  "Account Info",
  "Role Specific",
];

const SignUpStepper = () => {
  const dispatch = useAppDispatch();
  const { slug } = useParams<{ slug: string }>();

  const { currentStep, formData } = useAppSelector(
    (state) => state.signup
  );

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSchool = async () => {
      if (!slug) return;

      try {
        const school = await getSchoolBySlug(slug);
        dispatch(setSchoolDetails(school));
      } catch (error) {
        console.error("Failed to fetch school:", error);

        Swal.fire({
          icon: "error",
          title: "School Not Found",
          text: "Registration link is invalid or the school is inactive.",
        });
      }
    };

    fetchSchool();

    return () => {
      dispatch(resetSignup());
    };
  }, [slug, dispatch]);

  const next = () => {
    setLoading(true);

    setTimeout(() => {
      dispatch(nextStep());
      setLoading(false);
    }, 800);
  };

  const back = () => {
    setLoading(true);

    setTimeout(() => {
      dispatch(prevStep());
      setLoading(false);
    }, 800);
  };

  const submit = async () => {
    if (!slug) {
      Swal.fire({
        icon: "error",
        title: "Invalid Link",
        text: "School registration link is missing.",
      });
      return;
    }

    setLoading(true);

    try {
      console.log("📝 Form Data:", formData);

      if (
        !formData.email ||
        !formData.firstName ||
        !formData.lastName ||
        !formData.password ||
        !formData.role ||
        !formData.school ||
        !formData.primaryPhoneNumber ||
        !formData.nationality
      ) {
        throw new Error("Please fill in all required fields.");
      }

      const {
        classId,
        isClassTeacher,
        familyNumber,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        confirmPassword,
        ...restBaseData
      } = formData;

      const userPayload: Record<string, unknown> = {
        ...restBaseData,
      };

      if (formData.role === "teacher") {
        userPayload.isClassTeacher = isClassTeacher;
        userPayload.assignedClass = classId;
      } else if (formData.role === "guardian") {
        userPayload.familyNumber = familyNumber;
      }

      await signupUser(slug, userPayload);

      await Swal.fire({
        icon: "success",
        title: "Registration Complete",
        text: "User registered successfully!",
      });

      dispatch(resetSignup());
    } catch (err) {
      let message = "An unexpected error occurred.";

      if (err && typeof err === "object" && "issues" in err && Array.isArray(err.issues)) {
        message = (err.issues as { path: string[]; message: string }[])
          .map((i) => `${i.path.join(".")}: ${i.message}`)
          .join("\n");
      } else if (err && typeof err === "object" && "message" in err && typeof err.message === "string") {
        message = err.message;
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

  const stepComponents = [
    <PersonalInfoStep key="step1" next={next} />,
    <ContactInfoStep key="step2" next={next} back={back} />,
    <AccountInfoStep key="step3" next={next} back={back} />,
    <RoleSpecificStep key="step4" back={back} submit={submit} />,
  ];

  const StepComponent =
    stepComponents[currentStep] ?? stepComponents[0];

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          {steps[currentStep] ?? steps[0]}
        </h2>

        <div className="mb-4 flex gap-2">
          {steps.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 flex-1 rounded-full ${
                idx <= currentStep
                  ? "bg-teal-400"
                  : "bg-gray-200"
              }`}
            />
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center py-12">
          <div className="loader mb-4"></div>
          <p className="font-medium text-gray-500">
            Processing...
          </p>
        </div>
      ) : (
        StepComponent
      )}
    </div>
  );
};

export default SignUpStepper;

