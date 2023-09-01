import axios from 'axios';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import Completed from './completed';
import Todo from './todo';
import TodosForm from './todos-form';

const TodoContext = createContext(undefined);
const url = 'http://localhost:8501/todos';

export default function Todos() {
  const [current, setCurrent] = useState(undefined);
  const [todos, setTodos] = useState([]);
  const [completed, setCompleted] = useState([]);
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

  const addTodo = (t) => {
    axios.post(url, { ...t, status: 'todo' }).then((result) => {
      setTodos((prev) => {
        return [...prev, result.data];
      });
    });
  };
  const changeCompleted = (c) => {
    setCompleted((prev) => {
      return [...prev, c];
    });
  };
  const removeTodo = (id) => {
    axios.delete(`${url}/${id}`).then((result) => {
      setTodos((prev) => {
        return prev.filter((t) => t.id !== id);
      });
    });
  };
  const removeCompleted = (id) => {
    axios.delete(`${url}/${id}`).then((result) => {
      setCompleted((prev) => {
        return prev.filter((t) => t.id !== id);
      });
    });
  };
  const dropItem = (current, list) => {
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
  };
  const state = useMemo(() => {
    return {
      todos,
      setTodos: addTodo,
      removeTodo,
      dropItem,
      completed,
      setCompleted: changeCompleted,
      removeCompleted,
    };
  }, [todos, completed]);
  return (
    <TodoContext.Provider value={state}>
      <TodosForm />
      <div className="flex flex-row">
        <Todo current={current} setCurrent={setCurrent} />
        <Completed current={current} setCurrent={setCurrent} />
      </div>
    </TodoContext.Provider>
  );
}

export const useTodoContext = () => useContext(TodoContext);
