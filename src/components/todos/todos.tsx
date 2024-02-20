import { useCallback, useEffect, useState } from 'react';
import {
  useAddTodoMutation,
  useRemoveTodoMutation,
  useTodosQuery,
  useUpdateTodoMutation,
} from '../../api';
import CardList from '../shared/card-list';

export default function Todos() {
  const [current, setCurrent] = useState(undefined);
  const [todos, setTodos] = useState<any>([]);
  const [completed, setCompleted] = useState<any>([]);
  const [filterText, setFilterText] = useState('');

  const handleTodosSet = useCallback((t: any, c: any) => {
    setTodos(t);
    setCompleted(c);
  }, []);

  const { refetch, filter, ref } = useTodosQuery(handleTodosSet, filterText);
  const { mutate: addTodo } = useAddTodoMutation(setTodos);
  const { mutate: remove } = useRemoveTodoMutation(
    setTodos,
    setCompleted,
    refetch,
  );
  const { mutate } = useUpdateTodoMutation(current, refetch);

  useEffect(() => {
    // we want to show everything if no filter is defined
    if (filterText === '') {
      refetch();
    } else {
      filter();
    }
  }, [filterText]);
  const dropItem = useCallback(
    (current: any, list: string, position: number | null) => {
      if (current) {
        mutate({ list, position });
      }
    },
    [],
  );
  const debounce = useCallback((fn: any, delay: number) => {
    let timeout: ReturnType<typeof setTimeout>;
    return (...args: Array<any>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn(...args), delay);
    };
  }, []);

  return (
    <>
      <div className="pl-5 pt-5">
        <input
          placeholder="Filter"
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
          className="border bg-green-200 p-1"
        />
      </div>

      <div className="flex flex-row">
        <CardList
          listCategory="todo"
          current={current}
          setCurrent={setCurrent}
          items={todos}
          remove={remove}
          dropItem={dropItem}
          add={addTodo}
        />
        <CardList
          listCategory="complete"
          current={current}
          setCurrent={setCurrent}
          items={completed}
          remove={remove}
          dropItem={dropItem}
          add={addTodo}
        />
      </div>
    </>
  );
}
