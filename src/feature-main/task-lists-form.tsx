import { useGetProjectsQuery } from '@api';
import { Form, InputField } from '@components';
import { useModalContext } from '@modal-context';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthContext } from '../auth-context';

interface TaskListsFormProps {
  add: (v: any) => void;
}

export function TaskListsForm({ add }: TaskListsFormProps) {
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
  const { setModal } = useModalContext();
  const { refetch } = useGetProjectsQuery(session?.accountId);

  useEffect(() => {
    refetch().then((result) => setProjects(result.data));
  }, []);

  return (
    <div className="w-96 py-4">
      <Form
        handleSubmit={handleSubmit((v) => {
          add(v);
          reset();
          setModal({ show: false });
        })}
      >
        {/* TODO: Create a Dropdown component */}
        <select
          {...register('projectId', { required: true })}
          className="border"
        >
          <option value="" disabled selected>
            Select a project
          </option>
          {projects.map((p: any) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
        <InputField
          register={register('name', { required: true })}
          label="Enter a name"
          classes="p-1"
          error={errors.name ? 'Name is required' : undefined}
        />
        <InputField
          register={register('description')}
          label="Description"
          classes="p-1"
          textarea
          error={errors.description ? 'Description is required' : undefined}
        />
      </Form>
    </div>
  );
}
