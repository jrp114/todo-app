import axios from 'axios';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from './auth-context';

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
  const navigate = useNavigate();
  const { session } = useAuthContext();
  useEffect(() => {
    if (!session) {
      navigate('/login');
    }
  }, [session]);
  const { refetch } = useQuery('todos', {
    queryFn: session?.token
      ? () =>
          axios.get(url, {
            headers: {
              Authorization: `Bearer ${session.token}`,
            },
          })
      : () => void 0,
    onSuccess: (result) => {
      handleTodosSet(result.data);
    },
  });
  const { mutate: addTodo } = useMutation({
    mutationFn: (t) =>
      axios.post(
        url,
        { ...t, status: 'todo' },
        {
          headers: {
            Authorization: `Bearer ${session.token}`,
          },
        },
      ),
    onSuccess: (result) => {
      setTodos((prev) => {
        return [...prev, result.data];
      });
    },
  });
  const { mutate: remove } = useMutation({
    mutationFn: (id) =>
      axios.delete(`${url}/${id}`, {
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      }),
    onSuccess: (result, id) => {
      if (result.data.status === 'todo')
        setTodos((prev) => {
          return prev.filter((t) => t.id !== id);
        });
      else
        setCompleted((prev) => {
          return prev.filter((t) => t.id !== id);
        });
    },
  });

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
