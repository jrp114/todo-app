import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button } from './shared/button';

export function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm();
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="text-2xl">Register</div>
        <form
          onSubmit={handleSubmit(async (v) => {
            if (v.password !== v.confirmPassword) {
              setError('confirmPassword', {
                type: 'manual',
                message: 'Passwords do not match',
              });
              return;
            }
            const result = await axios.post(
              `${process.env.REACT_APP_API_URL}/users`,
              v,
            );
            localStorage.setItem(
              'todo-app-session',
              JSON.stringify(result?.data),
            );
            navigate('/');
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
          {errors.confirmPassword && (
            <div className="text-red-500">{errors.confirmPassword.message}</div>
          )}
          <Button type="submit" variant="primary">
            Register
          </Button>
        </form>
      </div>
    </div>
  );
}
