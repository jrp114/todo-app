import axios from 'axios';
import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTodoContext } from '../../todos-context';
import CardList from '../shared/card-list';
import FilterForm from './filter-form';

const url = `${process.env.API_URL}/todos`;

export default function Filter() {
  const {
    todos,
    completed,
    remove,
    current,
    setCurrent,
    setTodos,
    setCompleted,
  } = useTodoContext();
  const { value: paramValue } = useParams();
  const refetch = useCallback((value) => {
    axios.get(url + `/filter?value=${value}`).then((result) => {
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
  const dropItem = useCallback((current, list) => {
    if (current) {
      axios
        .put(`${url}/${current.id}`, {
          ...current,
          status: list,
        })
        .then((result) => {
          refetch(paramValue);
        });
    }
  }, []);

  useEffect(() => refetch(paramValue), [paramValue]);

  return (
    <>
      <FilterForm />
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
