// client/src/components/signup/steps/account-info.tsx
import { useSignUpContext } from "../../../context/signup/useSignUpContext";

const AccountInfoStep = ({ next, back }: { next: () => void; back: () => void }) => {
  const { formData, updateForm } = useSignUpContext();

  return (
    <div className="space-y-4">
      <input
        className="w-full p-2 border"
        type="password"
        placeholder="Password"
        value={formData.password || ''}
        onChange={(e) => updateForm({ password: e.target.value })}
      />
      <input
        className="w-full p-2 border"
        type="password"
        placeholder="Confirm Password"
        value={formData.confirmPassword || ''}
        onChange={(e) => updateForm({ confirmPassword: e.target.value })}
      />
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={formData.isTwoFactorEnabled || false}
          onChange={(e) => updateForm({ isTwoFactorEnabled: e.target.checked })}
        />
        <span>Enable Two-Factor Authentication</span>
      </label>
      <div className="flex justify-between">
        <button onClick={back} className="px-4 py-2 text-white rounded bg-gray">Back</button>
        <button onClick={next} className="px-4 py-2 text-white bg-green-600 rounded">Next</button>
      </div>
    </div>
  );
};

export default AccountInfoStep;