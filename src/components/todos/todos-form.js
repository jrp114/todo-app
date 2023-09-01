import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTodoContext } from './todos';

export default function TodosForm() {
  const [step, setStep] = useState(0);
  const { setTodos } = useTodoContext();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid },
    setError,
    clearErrors,
  } = useForm();
  return (
    <div className="pl-5 pt-5">
      <form
        onSubmit={handleSubmit((v) => {
          setTodos(v);
          setStep(0);
          reset();
        })}
      >
        {step === 0 && (
          <input
            {...register('name', { required: true })}
            className="border bg-green-200"
          />
        )}
        {step === 1 && (
          <textarea
            {...register('description', { required: true })}
            className="border bg-green-200"
          />
        )}
        {step !== 1 && (
          <button
            className="text-red border bg-red-400"
            type="button"
            onClick={() => {
              if (isValid) {
                setStep(step + 1);
                clearErrors();
              } else {
                setError('name');
              }
            }}
          >
            Next
          </button>
        )}
        {step === 1 && (
          <button className="text-red border bg-red-400" type="submit">
            Submit
          </button>
        )}
      </form>
      {(errors.name || errors.description) && (
        <span className="text-red-500">Required</span>
      )}
    </div>
  );
}
