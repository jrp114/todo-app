import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Todo } from '../feature-main/main';
import { Button } from './button';
import { InputField } from './input-field';

interface TodosFormProps {
  done: () => void;
  add: (v: Todo) => void;
  listId: number;
}

export default function TodosForm({ done, add, listId }: TodosFormProps) {
  const [step, setStep] = useState(0);
  const [tags, setTags] = useState<Array<string>>([]);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid },
    setError,
    clearErrors,
    getValues,
    resetField,
  } = useForm<Todo & { tag: string }>();
  const addTag = useCallback((tag: string) => {
    const temp = tags;
    temp.push(tag);
    setTags(temp);
    resetField('tag');
  }, []);

  return (
    <div>
      <form
        onSubmit={handleSubmit((v) => {
          add({
            ...v,
            tags,
            projectId: listId,
          });
          setStep(0);
          reset();
          done();
        })}
        className="flex flex-row gap-1"
      >
        {step === 0 && (
          <InputField
            register={register('name', { required: true })}
            label="Enter a name"
            classes="p-1"
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
          <InputField register={register('tag')} label="Tag" classes="p-1" />
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
