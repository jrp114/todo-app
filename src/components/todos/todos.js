import axios from 'axios';
import { useCallback, useEffect } from 'react';
import { useTodoContext } from '../../todos-context';
import CardList from '../shared/card-list';
import TodosForm from './todos-form';

const url = 'http://localhost:8501/todos';

export default function Todos() {
  const {
    todos,
    completed,
    remove,
    current,
    setCurrent,
    setTodos,
    setCompleted,
  } = useTodoContext();
  const refetch = useCallback(() => {
    axios.get(url).then((result) => {
      const t = [];
      const c = [];
      result.data.forEach((r) => {
        if (r.status === 'todo') {
          t.push(r);
        } else {
          c.push(r);
        }
      });
      setTodos(t);
      setCompleted(c);
    });
  }, []);
  useEffect(() => {
    refetch();
  }, []);
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
