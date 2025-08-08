// client/src/components/forms/signup/steps/account-info.tsx
import { useSignUpContext } from "../../../../context/signup/useSignUpContext";

const AccountInfoStep = ({ next, back }: { next: () => void; back: () => void }) => {
  const { formData, updateForm } = useSignUpContext();

  return (
    <div className="space-y-4 border-[1px] p-8 border-dashed border-gray-200">
      <input
        className="w-full p-2 border rounded"
        type="password"
        placeholder="Password"
        value={formData.password || ''}
        onChange={(e) => updateForm({ password: e.target.value })}
      />
      <input
        className="w-full p-2 border rounded"
        type="password"
        placeholder="Confirm Password"
        value={formData.confirmPassword || ''}
        onChange={(e) => updateForm({ confirmPassword: e.target.value })}
      />
      <label className="flex items-center space-x-2">
        <input
        className="border-rounded"
          type="checkbox"
          checked={formData.isTwoFactorEnabled || false}
          onChange={(e) => updateForm({ isTwoFactorEnabled: e.target.checked })}
        />
        <span>Enable Two-Factor Authentication</span>
      </label>
      <div className="flex justify-between">
        <button onClick={back} className="px-4 py-2 text-white rounded bg-gray">Back</button>
        <button onClick={next} className="px-4 py-2 text-white bg-teal-400 rounded hover:bg-teal-200 hover:text-gray">Next</button>
      </div>
    </div>
  );
};

export default AccountInfoStep;