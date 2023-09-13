import axios from 'axios';
import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useQuery from '../../helpers/useQuery';
import { useTodoContext } from '../../todos-context';
import CardList from '../shared/card-list';
import FilterForm from './filter-form';

const url = `${process.env.REACT_APP_API_URL}/todos`;

export default function Filter() {
  const { todos, completed, remove, current, setCurrent, handleTodosSet } =
    useTodoContext();
  const { value: paramValue } = useParams();
  const { refetch } = useQuery(`todos/filter?value=${paramValue}`, {});
  const dropItem = useCallback((current, list) => {
    if (current) {
      axios
        .put(`${url}/${current.id}`, {
          ...current,
          status: list,
        })
        .then((result) => {
          refetch().then((result) => {
            handleTodosSet(result.data.data);
          });
        });
    }
  }, []);

  useEffect(() => {
    refetch().then((result) => {
      handleTodosSet(result.data.data);
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
