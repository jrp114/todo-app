import axios from 'axios';
import { useCallback, useEffect } from 'react';
import useQuery from '../../helpers/useQuery';
import { useTodoContext } from '../../todos-context';
import CardList from '../shared/card-list';
import TodosForm from './todos-form';

const url = `${process.env.REACT_APP_API_URL}/todos`;

export default function Todos() {
  const { todos, completed, remove, current, setCurrent, handleTodosSet } =
    useTodoContext();
  const { data, loading, refetch } = useQuery('todos', {});
  useEffect(() => {
    if (!loading) {
      handleTodosSet(data);
    }
  }, [data, loading, handleTodosSet]);
  const dropItem = useCallback((current, list) => {
    if (current) {
      axios
        .put(`${url}/${current.id}`, {
          ...current,
          status: list,
        })
        .then((result) => {
          refetch();
        });
    }
  }, []);

  return (
    <>
      <TodosForm />
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
