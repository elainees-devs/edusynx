// client/src/pages/signup.tsx
import SignUpStepper from '../components/signup/signup-stepper';
import { SignUpProvider } from '../hooks/useSignUpContext';


const SignUp= () => {
  return (
    <SignUpProvider>
      <SignUpStepper />
    </SignUpProvider>
  );
};

export default SignUp;
