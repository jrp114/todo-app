import axios from 'axios';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import CardList from './card-list';
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
  const state = useMemo(() => {
    return {
      setTodos: addTodo,
    };
  }, []);
  return (
    <TodoContext.Provider value={state}>
      <TodosForm />
      <div className="flex flex-row">
        <CardList
          name="todo"
          current={current}
          setCurrent={setCurrent}
          items={todos}
          remove={removeTodo}
          dropItem={dropItem}
        />
        <CardList
          name="complete"
          current={current}
          setCurrent={setCurrent}
          items={completed}
          remove={removeCompleted}
          dropItem={dropItem}
        />
      </div>
    </TodoContext.Provider>
  );
}

export const useTodoContext = () => useContext(TodoContext);
