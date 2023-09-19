import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { Button } from './shared/button';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Email must be in a valid format')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

export function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="text-2xl">Register</div>
        <form
          onSubmit={handleSubmit((v) => {
            axios
              .post(`${process.env.REACT_APP_API_URL}/users`, v)
              .then((result) => {
                localStorage.setItem(
                  'todo-app-session',
                  JSON.stringify(result?.data),
                );
                navigate('/');
              })
              .catch((e) => {
                setError('email', {
                  type: 'manual',
                  message: 'Email already exists',
                });
              });
          })}
          className="flex flex-col justify-center items-center gap-4"
        >
          <input
            {...register('email', { required: true })}
            className="border"
            placeholder="Email"
          />
          <input
            {...register('password', { required: true })}
            type="password"
            className="border"
            placeholder="Password"
          />
          <input
            {...register('confirmPassword', { required: true })}
            type="password"
            className="border"
            placeholder="Confirm Password"
            onChange={() => clearErrors('confirmPassword')}
          />
          <div className="flex flex-col items-center">
            {errors.email && (
              <div className="text-red-500">{errors.email.message}</div>
            )}
            {errors.password && (
              <div className="text-red-500">{errors.password.message}</div>
            )}
            {errors.confirmPassword && (
              <div className="text-red-500">
                {errors.confirmPassword.message}
              </div>
            )}
          </div>

          <Button type="submit" variant="primary">
            Register
          </Button>
        </form>
      </div>
    </div>
  );
}
