import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button } from '../shared/button';

export default function FilterForm() {
  const { handleSubmit, register } = useForm();
  const navigate = useNavigate();
  return (
    <div className="pl-5 pt-5">
      <form
        onSubmit={handleSubmit((v) => {
          navigate(`/filter/${v.value}`);
        })}
      >
        <input
          {...register('value', { required: true })}
          className="border bg-green-200"
        />
        <Button variant="secondary" type="submit">
          Filter
        </Button>
      </form>
    </div>
  );
}
