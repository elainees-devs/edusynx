// client/src/components/signup/steps/personal-info.tsx
import { useSignUpContext } from "../../../context/signup/useSignUpContext";

const PersonalInfoStep = ({ next }: { next: () => void }) => {
  const { formData, updateForm } = useSignUpContext();

  return (
    <div className="space-y-4 border-[1px] p-8 border-dashed border-gray-200">
      <input
        className="w-full p-2 border rounded"
        placeholder="First Name"
        value={formData.firstName || ""}
        onChange={(e) => updateForm({ firstName: e.target.value })}
        autoFocus
      />
      <input
        className="w-full p-2 border rounded"
        placeholder="Middle Name"
        value={formData.middleName || ""}
        onChange={(e) => updateForm({ middleName: e.target.value })}
      />
      <input
        className="w-full p-2 border rounded"
        placeholder="Last Name"
        value={formData.lastName || ""}
        onChange={(e) => updateForm({ lastName: e.target.value })}
      />
      <input
        className="w-full p-2 border rounded"
        placeholder="Nationality"
        value={formData.nationality || ""}
        onChange={(e) => updateForm({ nationality: e.target.value })}
      />
      <div className="flex justify-end mt-4">
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

export default PersonalInfoStep;
