import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFilterQuery, useUpdateTodoMutation } from '../../api';
import { useTodoContext } from '../../todos-context';
import CardList from '../shared/card-list';
import FilterForm from './filter-form';

export default function Filter() {
  const { todos, completed, remove, current, setCurrent, handleTodosSet } =
    useTodoContext();
  const { value: paramValue } = useParams();
  const { refetch } = useFilterQuery(paramValue);
  const { mutate } = useUpdateTodoMutation(current, refetch);
  const dropItem = useCallback((current, list) => {
    if (current) {
      mutate(list);
    }
  }, []);

  useEffect(() => {
    refetch().then((result) => {
      handleTodosSet(result?.data?.data);
    });
  }, [paramValue]);

  return (
    <>
      <FilterForm />
      <div className="flex flex-row">
        <CardList
          name="todo"
          current={current}
          setCurrent={setCurrent}
          items={todos}
          remove={remove}
          dropItem={dropItem}
        />
        <CardList
          name="complete"
          current={current}
          setCurrent={setCurrent}
          items={completed}
          remove={remove}
          dropItem={dropItem}
        />
      </div>
    </>
  );
}
