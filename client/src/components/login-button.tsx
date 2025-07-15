// src/components/login-button.tsx

const LoginButton: React.FC = () => {
  return (
    <div className="mt-16">
      <button className="w-full h-12 text-white transition bg-[#0F9D58] rounded-lg hover:bg-[#d2fadf] hover:text-[#0F9D58]">
        Login
      </button>
    </div>
  );
};

export default LoginButton;
