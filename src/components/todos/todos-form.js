import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTodoContext } from './todos';

export default function TodosForm() {
  const [step, setStep] = useState(0);
  const [tags, setTags] = useState([]);
  const { setTodos } = useTodoContext();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid },
    setError,
    clearErrors,
    getValues,
    resetField,
  } = useForm();
  const addTag = useCallback((tag) => {
    const temp = tags;
    temp.push(tag);
    setTags(temp);
    resetField('tag');
  }, []);
  return (
    <div className="pl-5 pt-5">
      <form
        onSubmit={handleSubmit((v) => {
          setTodos({
            ...v,
            tag: undefined,
            tags,
          });
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
        {step === 2 && (
          <input {...register('tag')} className="border bg-green-200" />
        )}
        {step === 2 && (
          <button
            className="text-red border bg-green-400"
            type="button"
            onClick={() => addTag(getValues('tag'))}
          >
            Add Tag
          </button>
        )}
        {step !== 3 && (
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
        {step === 3 && (
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
