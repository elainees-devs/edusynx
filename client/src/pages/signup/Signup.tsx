// client/src/pages/signup/signup.tsx
import { SignUpStepper } from '../../components';
import { NavBar } from '../../components';
import Footer from '../../shared/layout/Footer';

const SignUp = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow pt-24 bg-gray-50 pb-12">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 md:p-8 max-w-2xl mx-auto">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2 text-center">User Registration</h1>
            <p className="text-gray-500 mb-8 text-center">Join your school community</p>
            <SignUpStepper />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignUp;
