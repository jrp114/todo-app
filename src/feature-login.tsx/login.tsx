import { useForm } from 'react-hook-form';
import { useLoginMutation } from '../api';
import { LoginMutationFunctionArgs } from '../api/useLoginMutation';
import { Button } from '../components/button';

export function Login() {
  const { register, handleSubmit } = useForm<LoginMutationFunctionArgs>();
  const { mutate } = useLoginMutation();

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="text-2xl">Login</div>
        <form
          onSubmit={handleSubmit((v) => {
            mutate(v);
          })}
          className="flex flex-col items-center justify-center gap-4"
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
