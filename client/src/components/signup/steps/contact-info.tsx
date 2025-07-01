// client/src/components/signup/steps/contact-info.tsx
import { useSignUpContext } from "../../../hooks/useSignUpContext";


const ContactInfoStep = ({ next, back }: { next: () => void; back: () => void }) => {
  const { formData, updateForm } = useSignUpContext();

  return (
    <div className="space-y-4">
      <input
        className="w-full p-2 border"
        placeholder="Primary Phone Number"
        value={formData.primaryPhoneNumber || ''}
        onChange={(e) => updateForm({ primaryPhoneNumber: e.target.value })}
      />
      <input
        className="w-full p-2 border"
        placeholder="Secondary Phone Number"
        value={formData.secondaryEmail|| ''}
        onChange={(e) => updateForm({ secondaryPhoneNumber: e.target.value })}
      />
      <input
        className="w-full p-2 border"
        placeholder="email"
        value={formData.lastName || ''}
        onChange={(e) => updateForm({ email: e.target.value })}
      />
      <input
        className="w-full p-2 border"
        placeholder="secondary email"
        value={formData.secondaryEmail|| ''}
        onChange={(e) => updateForm({ nationality: e.target.value })}
      />
        <div className="flex justify-between">
        <button onClick={back} className="px-4 py-2 text-white rounded bg-gray">Back</button>
        <button onClick={next} className="px-4 py-2 text-white bg-blue-600 rounded">Next</button>
      </div>
    </div>
  );
};

export default ContactInfoStep;