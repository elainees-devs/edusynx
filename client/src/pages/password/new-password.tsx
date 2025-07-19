// client/src/pages/password/new-password.tsx
import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { NewPasswordBody } from "../../types/auth/new-password.types";
import { NewPasswordForm} from "../../components/forms"; 

const NewPassword: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewPasswordBody>();

  const onSubmit: SubmitHandler<NewPasswordBody> = async (data) => {
    try {
      // Call your password reset API here
      console.log("Submitted:", data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <NewPasswordForm register={register} errors={errors} />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-300 transition"
        >
          {isSubmitting ? "Sending..." : "Send Reset Email"}
        </button>
      </form>

      <div className="text-center mt-4">
        <a href="/signin" className="text-sm text-green-600 hover:underline">
          Back to Sign In
        </a>
      </div>
    </>
  );
};

export default NewPassword;
