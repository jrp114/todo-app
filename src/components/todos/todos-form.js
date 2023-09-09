import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useTodoContext } from '../../todos-context';
import { Button } from '../shared/button';

export default function TodosForm() {
  const [step, setStep] = useState(0);
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();
  const { addTodo } = useTodoContext();
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
          addTodo({
            ...v,
            tag: undefined,
            tags,
          });
          setStep(0);
          reset();
        })}
        className="flex flex-row gap-1"
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
          <Button variant="primary" onClick={() => addTag(getValues('tag'))}>
            Add Tag
          </Button>
        )}
        {step !== 3 && (
          <Button
            variant="secondary"
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
          </Button>
        )}
        {step === 3 && (
          <Button variant="secondary" type="submit">
            Submit
          </Button>
        )}
        {step === 0 && (
          <Button variant="primary" onClick={() => navigate('/filter/')}>
            Filter
          </Button>
        )}
      </form>
      {(errors.name || errors.description) && (
        <span className="text-red-500">Required</span>
      )}
    </div>
  );
}
