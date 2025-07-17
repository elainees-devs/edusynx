// client/src/components/forms/super-admin-login-form.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';

type LoginFormInputs = {
  email: string;
  password: string;
  role?: string;
};

interface SuperAdminLoginFormProps {
  onLogin: (data: LoginFormInputs) => void;
}

const SuperAdminLoginForm: React.FC<SuperAdminLoginFormProps> = ({ onLogin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    onLogin({ ...data, role: 'super-admin' });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="login-form">
      <h2>Super Admin Login</h2>

      <div>
        <label>Email:</label>
        <input
          type="email"
          {...register('email', { required: 'Email is required' })}
        />
        {errors.email && <span className="error">{errors.email.message}</span>}
      </div>

      <div>
        <label>Password:</label>
        <input
          type="password"
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          })}
        />
        {errors.password && <span className="error">{errors.password.message}</span>}
      </div>

      <button type="submit">Login</button>
    </form>
  );
};

export default SuperAdminLoginForm;
