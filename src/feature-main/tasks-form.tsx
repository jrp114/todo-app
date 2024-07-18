import { Form, InputField } from '@components';
import { useModalContext } from '@modal-context';
import { Task } from '@types';
import { useForm } from 'react-hook-form';

interface TasksFormProps {
  add: (v: Task) => void;
  listId: number;
}

export default function TasksForm({ add, listId }: TasksFormProps) {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid },
    setError,
    clearErrors,
    getValues,
    resetField,
  } = useForm<Task & { tag: string }>();
  const { setModal } = useModalContext();

  return (
    <div className="w-96 py-4">
      <Form
        handleSubmit={handleSubmit((v: any) => {
          add({
            ...v,
            tags: getValues('tag').split(/,|;|:|\|/),
            taskListId: listId,
          });
          reset();
          setModal({ show: false });
        })}
      >
        <InputField
          register={register('name', { required: true })}
          label="Enter a name"
          classes="p-1"
          error={errors.name ? 'Name is required' : undefined}
        />
        <InputField
          register={register('description', { required: true })}
          label="Description"
          classes="p-1"
          textarea
          error={errors.description ? 'Description is required' : undefined}
        />
        <InputField register={register('tag')} label="Tags" classes="p-1" />
      </Form>
    </div>
  );
}
