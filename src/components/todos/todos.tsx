import { useCallback, useEffect, useState } from 'react';
import { Maybe } from 'yup';
import {
  useAddTodoMutation,
  useRemoveTodoMutation,
  useTodosQuery,
  useUpdateTodoMutation,
} from '../../api';
import CardList from '../shared/card-list';

export interface Todo {
  id: number;
  name: string;
  description: string;
  status: string;
  tags: Array<string>;
  position: number;
}

export default function Todos() {
  const [current, setCurrent] = useState<Maybe<Todo>>(undefined);
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const [completed, setCompleted] = useState<Array<Todo>>([]);
  const [filterText, setFilterText] = useState<string>('');

  const handleTodosSet = useCallback((t: Array<Todo>, c: Array<Todo>) => {
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
  const { mutate } = useUpdateTodoMutation(refetch, current);

  useEffect(() => {
    // we want to show everything if no filter is defined
    if (filterText === '') {
      refetch();
    } else {
      filter();
    }
  }, [filterText]);
  const dropItem = useCallback(
    (current: Maybe<Todo>, list: string, position: number) => {
      console.log('dropItem', current, list, position);
      if (current) {
        mutate({ list, position });
      }
    },
    [],
  );
  const debounce = useCallback((fn: () => void, delay: number) => {
    let timeout: ReturnType<typeof setTimeout>;
    return (...args: Array<any>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn(), delay);
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
