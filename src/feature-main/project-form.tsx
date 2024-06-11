import { useForm } from 'react-hook-form';
import { useAuthContext } from '../auth-context';
import { Button, InputField } from '../components';
import { useModalContext } from '../modal-context';

interface ProjectsFormProps {
  add: (v: any) => void;
}

export function ProjectsForm({ add }: ProjectsFormProps) {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
    setError,
  } = useForm<any>();
  const { session } = useAuthContext();
  const modal = useModalContext();

  return (
    <div className="w-96 p-4">
      <form
        onSubmit={handleSubmit((v) => {
          console.log(v);
          if (oninvalid) {
            setError('name', { message: 'Required' });
            return;
          }
          add({
            ...v,
            accountId: session?.accountId,
          });
          reset();
          modal.setShowModal(false);
        })}
        className="flex flex-col gap-4"
      >
        <InputField
          register={register('name', { required: true })}
          label="Enter a name"
          classes="p-3"
          error={errors.name ? 'Name is required' : undefined}
        />
        <InputField
          register={register('description')}
          label="Enter a description"
          classes="p-3"
          textarea
        />
        <Button size="sm" type="submit">
          Add
        </Button>
      </form>
    </div>
  );
}
