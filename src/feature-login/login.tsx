import { useForm } from 'react-hook-form';
import { useLoginMutation } from '../api';
import { LoginMutationFunctionArgs } from '../api/useLoginMutation';
import { Button } from '../components/button';
import { InputField } from '../components/input-field';

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
          <InputField
            register={register('email', { required: true })}
            label="Email"
          />
          <InputField
            register={register('password', { required: true })}
            label="Password"
            type="password"
          />
          <Button type="submit" variant="primary">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
