import { useCallback } from 'react';
import { useUpdateTodoMutation } from '../../api';
import { useTodoContext } from '../../todos-context';
import CardList from '../shared/card-list';
import TodosForm from './todos-form';

export default function Todos() {
  const { refetch, todos, completed, remove, current, setCurrent } =
    useTodoContext();
  const { mutate } = useUpdateTodoMutation(current, refetch);

  const dropItem = useCallback((current, list) => {
    if (current) {
      mutate(list);
    }
  }, []);

  return (
    <>
      <TodosForm />
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
