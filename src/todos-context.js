import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import {
  useAddTodoMutation,
  useRemoveTodoMutation,
  useTodosQuery,
} from './api';

const TodoContext = createContext(undefined);

export default function TodosProvider({ children }) {
  const [current, setCurrent] = useState(undefined);
  const [todos, setTodos] = useState([]);
  const [completed, setCompleted] = useState([]);

  const handleTodosSet = useCallback((result) => {
    if (result) {
      const t = [];
      const c = [];
      result.forEach((r) => {
        if (r.status === 'todo') {
          t.push(r);
        } else {
          c.push(r);
        }
      });
      setTodos(t);
      setCompleted(c);
    }
  }, []);
  const { refetch } = useTodosQuery(handleTodosSet);
  const { mutate: addTodo } = useAddTodoMutation(setTodos);
  const { mutate: remove } = useRemoveTodoMutation(
    setTodos,
    setCompleted,
    refetch,
  );

  const state = useMemo(() => {
    return {
      addTodo,
      todos,
      completed,
      current,
      setCurrent,
      remove,
      handleTodosSet,
      refetch,
    };
  }, [addTodo, todos, completed, current, remove, handleTodosSet, refetch]);
  return <TodoContext.Provider value={state}>{children}</TodoContext.Provider>;
}

export const useTodoContext = () => useContext(TodoContext);
