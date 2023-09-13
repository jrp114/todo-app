import axios from 'axios';
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

const TodoContext = createContext(undefined);
const url = `${process.env.REACT_APP_API_URL}/todos`;

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

  const addTodo = useCallback((t) => {
    axios.post(url, { ...t, status: 'todo' }).then((result) => {
      setTodos((prev) => {
        return [...prev, result.data];
      });
    });
  }, []);
  const remove = useCallback((id) => {
    axios.delete(`${url}/${id}`).then((result) => {
      if (result.data.status === 'todo')
        setTodos((prev) => {
          return prev.filter((t) => t.id !== id);
        });
      else
        setCompleted((prev) => {
          return prev.filter((t) => t.id !== id);
        });
    });
  }, []);

  const state = useMemo(() => {
    return {
      addTodo,
      todos,
      completed,
      current,
      setCurrent,
      remove,
      handleTodosSet,
    };
  }, [addTodo, todos, completed, current, remove, handleTodosSet]);
  return <TodoContext.Provider value={state}>{children}</TodoContext.Provider>;
}

export const useTodoContext = () => useContext(TodoContext);
