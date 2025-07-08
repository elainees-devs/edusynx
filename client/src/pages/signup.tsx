// client/src/pages/signup.tsx
import SignUpStepper from '../components/signup/signup-stepper';
import { SignUpProvider } from '../hooks/useSignUpContext';


const SignUp = () => {
  return (
    <div className="min-h-screen bg-light">
      <SignUpProvider>
        <SignUpStepper />
      </SignUpProvider>
    </div>
  );
};

export default SignUp;
