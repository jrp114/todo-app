import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTodoContext } from '../../todos-context';
import { Button } from '../shared/button';

interface TodosFormProps {
  done: () => void;
}

export default function TodosForm({ done }: TodosFormProps) {
  const [step, setStep] = useState(0);
  const [tags, setTags] = useState([]);
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
  const addTag = useCallback((tag: string) => {
    const temp = tags;
    temp.push(tag as never);
    setTags(temp);
    resetField('tag');
  }, []);

  return (
    <div>
      <form
        onSubmit={handleSubmit((v) => {
          addTodo({
            ...v,
            tag: undefined,
            tags,
          });
          setStep(0);
          reset();
          done();
        })}
        className="flex flex-row gap-1"
      >
        {step === 0 && (
          <input
            placeholder="Enter a name"
            {...register('name', { required: true })}
            className="border p-1"
          />
        )}
        {step === 1 && (
          <textarea
            placeholder="Enter a description"
            {...register('description', { required: true })}
            className="border "
          />
        )}
        {step === 2 && (
          <input
            placeholder="Enter a tag"
            {...register('tag')}
            className="border p-1"
          />
        )}
        {step === 2 && (
          <Button variant="primary" onClick={() => addTag(getValues('tag'))}>
            Add Tag
          </Button>
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
      {(errors.name || errors.description) && (
        <span className="text-red-500">Required</span>
      )}
    </div>
  );
}