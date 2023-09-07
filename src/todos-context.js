import axios from 'axios';
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

const TodoContext = createContext(undefined);
const url = 'http://localhost:8501/todos';

export default function TodosProvider(props) {
  const [current, setCurrent] = useState(undefined);
  const [todos, setTodos] = useState([]);
  const [completed, setCompleted] = useState([]);

  const addTodo = useCallback((t) => {
    axios.post(url, { ...t, status: 'todo' }).then((result) => {
      setTodos((prev) => {
        return [...prev, result.data];
      });
    });
  }, []);
  const removeTodo = useCallback((id) => {
    axios.delete(`${url}/${id}`).then((result) => {
      setTodos((prev) => {
        return prev.filter((t) => t.id !== id);
      });
    });
  }, []);
  const removeCompleted = useCallback((id) => {
    axios.delete(`${url}/${id}`).then((result) => {
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
      removeTodo,
      removeCompleted,
      setTodos,
      setCompleted,
    };
  }, [addTodo, todos, completed, current, removeTodo, removeCompleted]);
  return (
    <TodoContext.Provider value={state}>{props.children}</TodoContext.Provider>
  );
}

export const useTodoContext = () => useContext(TodoContext);
