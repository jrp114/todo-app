import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from './button';
import { InputField } from './input-field';

interface ProjectsFormProps {
  // done: () => void;
  add: (v: any) => void;
}

export default function ProjectsForm({ add }: ProjectsFormProps) {
  const [step, setStep] = useState(0);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid },
    setError,
    clearErrors,
  } = useForm<any>();

  return (
    <div>
      <form
        onSubmit={handleSubmit((v) => {
          add(v);
          setStep(0);
          reset();
        })}
        className="flex flex-row gap-1"
      >
        {step === 0 && (
          <InputField
            register={register('name', { required: true })}
            label="Enter a name"
            classes="p-1"
          />
        )}
        {step === 1 && (
          <textarea
            placeholder="Enter a description"
            {...register('description')}
            className="border "
          />
        )}
        {step !== 1 && (
          <Button
            variant="secondary"
            onClick={() => {
              if (isValid) {
                setStep(step + 1);
                clearErrors();
              } else {
                setError('name', {});
              }
            }}
          >
            Next
          </Button>
        )}
        {step === 1 && (
          <Button variant="secondary" type="submit">
            Submit
          </Button>
        )}
      </form>
      {errors.name && <span className="text-red-500">Required</span>}
    </div>
  );
}
