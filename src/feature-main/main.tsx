import { useCallback, useEffect, useMemo, useState } from 'react';
import { Maybe } from 'yup';
import {
  useAddTodoMutation,
  useRemoveTodoMutation,
  useTodosQuery,
  useUpdateTodoMutation,
} from '../api';
import useAddProjectMutation from '../api/useAddProjectMutation';
import { CardList, Filter } from '../components';
import { ProjectList } from '../components/project-list';

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

export function Todos() {
  const [current, setCurrent] = useState<Maybe<Todo>>(undefined);
  const [projects, setProjects] = useState<Array<Todo>>([]);
  const [filterText, setFilterText] = useState<string>('');
  const [selected, setSelected] = useState<Array<number>>([]);

  const handleSetProjects = useCallback((p: Array<any>) => {
    setProjects(p);
  }, []);

  const { refetch, filter, ref } = useTodosQuery(handleSetProjects, filterText);

  const { mutate: addTodo } = useAddTodoMutation(refetch);
  const { mutate: addProject } = useAddProjectMutation(refetch);
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

  // each project to have its own list of todos
  const separatedProjects = useMemo(() => {
    const ordered: { [key: string]: Array<Todo> } = {};
    projects?.forEach((p) => {
      if (!ordered[p.projectId]) {
        ordered[p.projectId] = [];
      }
      ordered[p.projectId].push(p);
    });
    return ordered;
  }, [projects, selected]);

  // get the project list for display and selection
  // we want to use separatedProjects const to retrieve the project id and name since it's already broken up into object
  // as { projectId: [todos] } key value pairs
  const projectList = useMemo(() => {
    const unique = new Set(projects?.map((p) => p.projectId));
    const final = Array.from(unique).map((p) => separatedProjects[p][0]);
    return final;
  }, [projects]);

  const dropItem = useCallback((projectId: number, position: number) => {
    mutate({ projectId, position });
  }, []);

  const handleProjectAdd = useCallback((v: any) => {
    addProject(v);
  }, []);

  return (
    <>
      <ProjectList
        selected={selected}
        setSelected={setSelected}
        projects={projectList}
        add={handleProjectAdd}
      />

      <Filter abortControllerRef={ref} setFilterText={setFilterText} />
      <div className="flex flex-row">
        {Object.keys(separatedProjects).map((p) => (
          <CardList
            key={p}
            setCurrent={setCurrent}
            items={separatedProjects[p]}
            remove={remove}
            dropItem={dropItem}
            add={addTodo}
            showList={!selected.includes(Number(p))}
          />
        ))}
      </div>
    </>
  );
}
