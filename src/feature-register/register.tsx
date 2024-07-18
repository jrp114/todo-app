import { useRegisterMutation } from '@api';
import { RegisterMutationFunctionArgs } from '@api/useRegisterMutation';
import { Button, InputField } from '@components';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

const schema = yup.object().shape({
  // TODO: add validation for the account name
  email: yup
    .string()
    .email('Email must be in a valid format')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

export default function Register() {
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
  const { mutate } = useRegisterMutation(
    () => navigate('/'),
    () => {
      setError('email', {
        type: 'manual',
        message: 'Email already exists',
      });
    },
  );
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="text-2xl">Register</div>
        <form
          onSubmit={handleSubmit((v) => {
            mutate(v as RegisterMutationFunctionArgs);
          })}
          className="flex flex-col gap-4"
        >
          {/* TODO: add field for account name */}
          <InputField
            register={register('email', { required: true })}
            label="Email"
          />
          <InputField
            register={register('password', { required: true })}
            label="Password"
          />
          <InputField
            register={register('confirmPassword', { required: true })}
            label="Confirm Password"
            onChange={() => clearErrors('confirmPassword')}
          />
          <div className="flex flex-col items-center">
            {/* TODO: add error for the account name */}
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
