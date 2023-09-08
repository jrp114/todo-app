import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

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
        <button className="text-red border bg-red-400" type="submit">
          Filter
        </button>
      </form>
    </div>
  );
}
