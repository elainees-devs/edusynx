// client/src/pages/signup/signup.tsx
import { SignUpStepper } from '../../components';
import SignUpProvider from '../../context/signup/SignUpProvider';

const SignUp = () => {
  return (
    <div className="h-full">
      <SignUpProvider>
        <SignUpStepper />
      </SignUpProvider>
    </div>
  );
};

export default SignUp;
