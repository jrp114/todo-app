import { useCallback, useEffect, useMemo, useState } from 'react';
import { Maybe } from 'yup';
import {
  useAddTodoMutation,
  useRemoveTodoMutation,
  useTodosQuery,
  useUpdateTodoMutation,
} from '../../api';
import CardList from '../shared/card-list';

export interface Todo {
  id: number;
  name: string;
  description: string;
  status: string;
  tags: Array<string>;
  position: number;
  projectName: string;
  projectId: number;
}

export default function Todos() {
  const [current, setCurrent] = useState<Maybe<Todo>>(undefined);
  const [projects, setProjects] = useState<Array<Todo>>([]);
  const [filterText, setFilterText] = useState<string>('');

  const handleSetProjects = useCallback((p: Array<any>) => {
    setProjects(p);
  }, []);

  const { refetch, filter, ref } = useTodosQuery(handleSetProjects, filterText);

  const { mutate: addTodo } = useAddTodoMutation(refetch);
  const { mutate: remove } = useRemoveTodoMutation(refetch);
  const { mutate } = useUpdateTodoMutation(refetch, current);

  useEffect(() => {
    // we want to show everything if no filter is defined
    if (filterText === '') {
      refetch();
    } else {
      filter();
    }
  }, [filterText, refetch]);

  const separatedProjects = useMemo(() => {
    const ordered: any = {};
    projects?.forEach((p) => {
      if (!ordered[p.projectId]) {
        ordered[p.projectId] = [];
      }
      ordered[p.projectId].push(p);
    });
    return ordered;
  }, [projects]);

  const dropItem = useCallback((projectId: number, position: number) => {
    mutate({ projectId, position });
  }, []);
  const debounce = useCallback((fn: () => void, delay: number) => {
    let timeout: ReturnType<typeof setTimeout>;
    return (...args: Array<any>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn(), delay);
    };
  }, []);

  return (
    <>
      <div className="pl-5 pt-5">
        <input
          placeholder="Filter"
          onChange={(e) => {
            // in case the previous network request is ongoing
            // when the next one fires we want to abort
            if (ref.current) {
              ref.current.abort();
            }
            debounce(async () => {
              setFilterText(e.target.value);
            }, 2000)();
          }}
          className="border bg-green-200 p-1"
        />
      </div>

      <div className="flex flex-row">
        {Object.keys(separatedProjects).map((p) => (
          <CardList
            key={p}
            listCategory={separatedProjects[p][0].projectName}
            listId={separatedProjects[p][0].projectId}
            current={current}
            setCurrent={setCurrent}
            items={separatedProjects[p]}
            remove={remove}
            dropItem={dropItem}
            add={addTodo}
          />
        ))}
      </div>
    </>
  );
}
