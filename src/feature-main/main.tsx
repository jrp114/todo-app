import { useCallback, useEffect, useMemo, useState } from 'react';
import { Maybe } from 'yup';
import {
  useAddTaskMutation,
  useRemoveTaskMutation,
  useTasksQuery,
  useUpdateTaskMutation,
} from '../api';
import useAddProjectMutation from '../api/useAddProjectMutation';
import { CardList, Filter } from '../components';
import { ProjectList } from '../components/project-list';

export interface Task {
  id: number;
  name: string;
  description: string;
  status: string;
  tags: Array<string>;
  position: number;
  taskListName: string;
  taskListId: number;
}

export function Tasks() {
  const [current, setCurrent] = useState<Maybe<Task>>(undefined);
  const [projects, setProjects] = useState<Array<Task>>([]);
  const [filterText, setFilterText] = useState<string>('');
  const [selected, setSelected] = useState<Array<number>>([]);

  const handleSetProjects = useCallback((p: Array<any>) => {
    setProjects(p);
  }, []);

  const { refetch, filter, ref } = useTasksQuery(handleSetProjects, filterText);

  const { mutate: addTask } = useAddTaskMutation(refetch);
  const { mutate: addProject } = useAddProjectMutation(refetch);
  const { mutate: remove } = useRemoveTaskMutation(refetch);
  const { mutate } = useUpdateTaskMutation(refetch, current);

  useEffect(() => {
    // we want to show everything if no filter is defined
    if (filterText === '') {
      refetch();
    } else {
      filter();
    }
  }, [filterText, refetch]);

  // each project to have its own list of tasks
  const separatedProjects = useMemo(() => {
    const ordered: { [key: string]: Array<Task> } = {};
    projects?.forEach((p) => {
      if (!ordered[p.taskListId]) {
        ordered[p.taskListId] = [];
      }
      ordered[p.taskListId].push(p);
    });
    return ordered;
  }, [projects, selected]);

  // get the project list for display and selection
  // we want to use separatedProjects const to retrieve the project id and name since it's already broken up into object
  // as { taskListId: [tasks] } key value pairs
  const projectList = useMemo(() => {
    const unique = new Set(projects?.map((p) => p.taskListId));
    const final = Array.from(unique).map((p) => separatedProjects[p][0]);
    return final;
  }, [projects]);

  const dropItem = useCallback((taskListId: number, position: number) => {
    mutate({ taskListId, position });
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
            add={addTask}
            showList={!selected.includes(Number(p))}
          />
        ))}
      </div>
    </>
  );
}
