import { useSignUpContext } from '../../../hooks/useSignUpContext';

type SignUpRole = 'teacher' | 'headteacher' | 'school-admin' | 'accountant';

const allowedRoles: SignUpRole[] = ['teacher', 'headteacher', 'school-admin', 'accountant'];

const RoleSpecificStep = ({ back }: { back: () => void }) => {
  const { formData, updateForm } = useSignUpContext();

  const handleSubmit = () => {
    console.log('Final signup data:', formData);
    // Submit form logic here
  };

  return (
    <div className="space-y-4">
      {/* Role Selection Dropdown */}
      <label className="block">
        <span className="text-gray-700">Select Role</span>
        <select
          className="w-full p-2 border rounded"
          value={formData.role || ''}
          onChange={(e) => updateForm({ role: e.target.value as SignUpRole })}
        >
          <option value="">-- Select a role --</option>
          {allowedRoles.map((role) => (
            <option key={role} value={role}>
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </option>
          ))}
        </select>
      </label>

      {/* Additional Fields for Teacher and Headteacher */}
      {(formData.role === 'teacher' || formData.role === 'headteacher') && (
        <>
          <input
            className="w-full p-2 border"
            placeholder="Teacher ID"
            value={formData.teacherId || ''}
            onChange={(e) => updateForm({ teacherId: e.target.value })}
          />

          {/* Only show 'Is Class Teacher' for teachers */}
          {formData.role === 'teacher' && (
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.isClassTeacher || false}
                onChange={(e) => updateForm({ isClassTeacher: e.target.checked })}
              />
              <span>Is Class Teacher</span>
            </label>
          )}

          <input
            className="w-full p-2 border"
            placeholder="Class (ID or Name)"
            value={formData.class || ''}
            onChange={(e) => updateForm({ class: e.target.value })}
          />
          <input
            className="w-full p-2 border"
            placeholder="Teaching Subjects (comma separated)"
            value={formData.teachingSubjects?.join(', ') || ''}
            onChange={(e) =>
              updateForm({
                teachingSubjects: e.target.value.split(',').map((s) => s.trim()),
              })
            }
          />
        </>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button onClick={back} className="px-4 py-2 text-white bg-gray-500 rounded">
          Back
        </button>
        <button onClick={handleSubmit} className="px-4 py-2 text-white bg-green-600 rounded">
          Submit
        </button>
      </div>
    </div>
  );
};

export default RoleSpecificStep;
