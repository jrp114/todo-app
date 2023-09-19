import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../api';
import { Button } from './shared/button';

export function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { mutate } = useLoginMutation(
    () => navigate('/'),
    () => navigate('/login'),
  );
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="text-2xl">Login</div>
        <form
          onSubmit={handleSubmit((v) => {
            mutate(v);
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
          <Button type="submit" variant="primary">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
