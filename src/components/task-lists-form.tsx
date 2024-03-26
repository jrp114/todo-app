import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useGetProjectsQuery from '../api/useGetProjectsQuery';
import { useAuthContext } from '../auth-context';
import { Button } from './button';
import { InputField } from './input-field';

interface TaskListsFormProps {
  add: (v: any) => void;
}

export function TaskListsForm({ add }: TaskListsFormProps) {
  const [step, setStep] = useState(0);
  const [projects, setProjects] = useState<any>([]);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid },
    setError,
    clearErrors,
  } = useForm<any>();
  const { session } = useAuthContext();

  const { refetch } = useGetProjectsQuery(session?.accountId);

  useEffect(() => {
    refetch().then((result) => setProjects(result.data));
  }, []);

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
        {/* TODO: Create a Dropdown component */}
        {step === 0 && (
          <select
            {...register('projectId', { required: true })}
            className="border"
          >
            {projects.map((p: any) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        )}
        {step === 1 && (
          <InputField
            register={register('name', { required: true })}
            label="Enter a name"
            classes="p-1"
          />
        )}
        {step === 2 && (
          <textarea
            placeholder="Enter a description"
            {...register('description')}
            className="border "
          />
        )}
        {step !== 2 && (
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
        {step === 2 && (
          <Button variant="secondary" type="submit">
            Submit
          </Button>
        )}
      </form>
      {errors.name && <span className="text-red-500">Required</span>}
    </div>
  );
}
