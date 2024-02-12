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

interface TodoContextProps {
  children: React.ReactNode;
}

const TodoContext = createContext<any>(undefined);

export default function TodosProvider({ children }: TodoContextProps) {
  const [current, setCurrent] = useState(undefined);
  const [todos, setTodos] = useState<any>([]);
  const [completed, setCompleted] = useState<any>([]);

  const handleTodosSet = useCallback((result: any) => {
    if (result) {
      const t: Array<any> = [];
      const c: Array<any> = [];
      result.forEach((r: any) => {
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
