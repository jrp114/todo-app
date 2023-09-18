import axios from 'axios';
import { useCallback, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../../auth-context';
import { useTodoContext } from '../../todos-context';
import CardList from '../shared/card-list';
import FilterForm from './filter-form';

const url = `${process.env.REACT_APP_API_URL}/todos`;

export default function Filter() {
  const { todos, completed, remove, current, setCurrent, handleTodosSet } =
    useTodoContext();
  const { value: paramValue } = useParams();
  const navigate = useNavigate();
  const { session } = useAuthContext();
  useEffect(() => {
    if (!session) {
      navigate('/login');
    }
  }, [session]);
  const { refetch } = useQuery('filter', {
    queryFn: () =>
      axios.get(`${url}/filter?value=${paramValue}`, {
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      }),
  });
  const dropItem = useCallback((current, list) => {
    if (current) {
      axios
        .put(
          `${url}/${current.id}`,
          {
            ...current,
            status: list,
          },
          {
            headers: {
              Authorization: `Bearer ${session.token}`,
            },
          },
        )
        .then((result) => {
          refetch().then((result) => {
            handleTodosSet(result?.data?.data);
          });
        });
    }
  }, []);

  useEffect(() => {
    refetch().then((result) => {
      handleTodosSet(result?.data?.data);
    });
  }, [paramValue]);

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
