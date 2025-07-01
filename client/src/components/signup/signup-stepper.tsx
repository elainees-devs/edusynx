// client/src/components/signup/signup-stepper.tsx
import { useState } from 'react';
import { AccountInfoStep, ContactInfoStep, PersonalInfoStep, RoleSpecificStep } from './steps';


const steps = ['Personal Info', 'Contact Info', 'Account Info', 'Role Specific'];

const SignUpStepper = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const next = () => setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setCurrentStep((s) => Math.max(s - 1, 0));

  const StepComponent = [
    <PersonalInfoStep key="step1" next={next} />, 
    <ContactInfoStep key="step2" next={next} back={back} />,
    <AccountInfoStep key="step3" next={next} back={back} />,
    <RoleSpecificStep key="step4" back={back} />
  ][currentStep];

  return (
    <div className="max-w-xl pt-4 mx-auto mt-4">
     <p className='pb-4'>To access your account, please finish setting up your profile by completing the signup process.</p>

      <h2 className="mb-4 text-xl font-bold">{steps[currentStep]}</h2>
      {StepComponent}
    </div>
  );
};

export default SignUpStepper;