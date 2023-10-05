import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useFilterQuery } from '../../api';
import { useTodoContext } from '../../todos-context';
import { Button } from '../shared/button';

const debounce = (fn, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
};

export default function TodosForm() {
  const [step, setStep] = useState(0);
  const [tags, setTags] = useState([]);
  const [filter, setFilter] = useState(false);
  const [filterText, setFilterText] = useState('');
  const { addTodo, handleTodosSet, refetch: todosRefetch } = useTodoContext();
  const { refetch, ref } = useFilterQuery(filterText);
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

  useEffect(() => {
    // we want to show everything if no filter is defined
    if (filterText === '') {
      todosRefetch();
    } else {
      refetch().then((result) => {
        handleTodosSet(result?.data?.data);
      });
    }
  }, [filterText]);

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
            placeholder="Enter a name"
            {...register('name', { required: true })}
            className="border bg-green-200"
          />
        )}
        {step === 1 && (
          <textarea
            placeholder="Enter a description"
            {...register('description', { required: true })}
            className="border bg-green-200"
          />
        )}
        {step === 2 && (
          <input
            placeholder="Enter a tag"
            {...register('tag')}
            className="border bg-green-200"
          />
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
          <Button variant="primary" onClick={() => setFilter(!filter)}>
            Filter
          </Button>
        )}
        {filter && (
          <input
            placeholder="Filter by name or tags"
            onChange={(e) => {
              // in case the previous network request is ongoing
              // when the next one fires we want to abort
              if (ref.current) {
                ref.current.abort();
              }
              debounce(async () => {
                setFilterText(e.target.value);
              }, 2000)();
            }}
            className="border bg-green-200"
          />
        )}
      </form>
      {(errors.name || errors.description) && (
        <span className="text-red-500">Required</span>
      )}
    </div>
  );
}
