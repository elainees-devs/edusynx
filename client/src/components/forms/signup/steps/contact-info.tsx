// client/src/components/forms/signup/steps/contact-info.tsx
import { useSignUpContext } from "../../../../context/signup/useSignUpContext";

const ContactInfoStep = ({
  next,
  back,
}: {
  next: () => void;
  back: () => void;
}) => {
  const { formData, updateForm } = useSignUpContext();

  return (
      <div className="space-y-4 border-[1px] p-8 border-dashed border-gray-200">
      <input
        className="w-full p-2 border rounded"
        placeholder="Primary Phone Number"
        value={formData.primaryPhoneNumber || ""}
        onChange={(e) =>
          updateForm({ primaryPhoneNumber: e.target.value })
        }
      />

      <input
        className="w-full p-2 border rounded"
        placeholder="Secondary Phone Number"
        value={formData.secondaryPhoneNumber || ""}
        onChange={(e) =>
          updateForm({ secondaryPhoneNumber: e.target.value })
        }
      />

      <input
        className="w-full p-2 border rounded"
        placeholder="Email"
        value={formData.email || ""}
        onChange={(e) => updateForm({ email: e.target.value })}
      />

      <input
        className="w-full p-2 border rounded"
        placeholder="Secondary Email"
        value={formData.secondaryEmail || ""}
        onChange={(e) =>
          updateForm({ secondaryEmail: e.target.value })
        }
      />

      <input
        className="w-full p-2 border rounded"
        placeholder="Nationality"
        value={formData.nationality || ""}
        onChange={(e) =>
          updateForm({ nationality: e.target.value })
        }
      />

      <div className="flex justify-between mt-6">
            <button onClick={back} className="px-4 py-2 text-white rounded bg-gray">Back</button>
        <button
          onClick={next}
          className="px-4 py-2 text-white bg-teal-400 hover:bg-teal-200 hover:text-gray rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ContactInfoStep;
