import { Form, InputField } from '@components';
import { useForm } from 'react-hook-form';
import { useAuthContext } from '../auth-context';
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
  const { setModal } = useModalContext();

  return (
    <div className="w-96 py-4">
      <Form
        submitText="Add"
        handleSubmit={handleSubmit((v: any) => {
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
          setModal({ show: false });
        })}
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
      </Form>
    </div>
  );
}
