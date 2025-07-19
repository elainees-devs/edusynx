// client/src/components/signup/steps/personal-info.tsx
import { useSignUpContext } from "../../../context/signup/useSignUpContext";

const PersonalInfoStep = ({ next }: { next: () => void }) => {
  const { formData, updateForm } = useSignUpContext();

  return (
    <div className="space-y-4">
      <input
        className="w-full p-2 border"
        placeholder="First Name"
        value={formData.firstName || ''}
        onChange={(e) => updateForm({ firstName: e.target.value })}
      />
      <input
        className="w-full p-2 border"
        placeholder="Middle Name"
        value={formData.middleName || ''}
        onChange={(e) => updateForm({ middleName: e.target.value })}
      />
      <input
        className="w-full p-2 border"
        placeholder="Last Name"
        value={formData.lastName || ''}
        onChange={(e) => updateForm({ lastName: e.target.value })}
      />
      <input
        className="w-full p-2 border"
        placeholder="Nationality"
        value={formData.nationality || ''}
        onChange={(e) => updateForm({ nationality: e.target.value })}
      />
      <button onClick={next} className="px-4 py-2 mt-4 text-white bg-green-600 rounded">Next</button>
    </div>
  );
};

export default PersonalInfoStep;