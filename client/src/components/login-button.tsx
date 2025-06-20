// src/components/login-button.tsx

const LoginButton: React.FC = () => {
  return (
    <div className="mt-16">
      <button className="w-full h-12 text-white transition bg-blue-700 rounded-lg hover:bg-blue-800">
        Login
      </button>
    </div>
  );
};

export default LoginButton;
