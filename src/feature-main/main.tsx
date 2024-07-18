import {
  useAddProjectMutation,
  useAddTaskListMutation,
  useAddTaskMutation,
  useRemoveTaskMutation,
  useTasksQuery,
  useUpdateTaskMutation,
} from '@api';
import { Button } from '@components';
import { Task } from '@types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Maybe } from 'yup';
import { useModalContext } from '../modal-context';
import CardList from './card-list';
import { Filter } from './filter';
import { ProjectsForm } from './project-form';
import { TaskList } from './task-list';

export default function Tasks() {
  const [current, setCurrent] = useState<Maybe<Task>>(undefined);
  const [tasks, setTasks] = useState<Array<Task>>([]);
  const [filterText, setFilterText] = useState<string>('');
  const [selected, setSelected] = useState<Array<number>>([]);
  const { setModal } = useModalContext();

  const handleSetTasks = useCallback((p: Array<any>) => {
    setTasks(p);
  }, []);

  const { refetch, filter } = useTasksQuery(handleSetTasks, filterText);

  const { mutate: addTask } = useAddTaskMutation(refetch);
  const { mutate: addTaskList } = useAddTaskListMutation(refetch);
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

  // each task list to have its own list of tasks
  const separatedTasks = useMemo(() => {
    const ordered: { [key: string]: Array<Task> } = {};
    tasks?.forEach((p) => {
      if (!ordered[p.taskListId]) {
        ordered[p.taskListId] = [];
      }
      ordered[p.taskListId].push(p);
    });
    return ordered;
  }, [tasks, selected]);

  // get the task list for display and selection
  // we want to use separatedTaskLists const to retrieve the task list id and name since it's already broken up into object
  // as { taskListId: [tasks] } key value pairs
  const taskLists = useMemo(() => {
    const unique = new Set(tasks?.map((p) => p.taskListId));
    const final = Array.from(unique).map((p) => separatedTasks[p][0]);
    return final;
  }, [tasks]);

  const dropItem = useCallback((taskListId: number, position: number) => {
    mutate({ taskListId, position });
  }, []);

  const handleTaskListAdd = useCallback((v: any) => {
    addTaskList(v);
  }, []);

  const handleProjectAdd = useCallback((v: any) => {
    addProject(v);
  }, []);

  return (
    <div className="m-5 flex flex-col gap-4">
      <div>
        <Button
          variant="transparent"
          icon="plus"
          onClick={() =>
            setModal({
              header: 'Add New Project',
              message: <ProjectsForm add={handleProjectAdd} />,
              noCancelButton: true,
            })
          }
        >
          Add Project
        </Button>
      </div>

      <TaskList
        selected={selected}
        setSelected={setSelected}
        taskLists={taskLists}
        add={handleTaskListAdd}
      />

      <Filter setFilterText={setFilterText} />
      <div className="flex flex-row gap-4">
        {Object.keys(separatedTasks).map((p) => (
          <CardList
            key={p}
            setCurrent={setCurrent}
            items={separatedTasks[p]}
            remove={remove}
            dropItem={dropItem}
            add={addTask}
            showList={selected.includes(Number(p)) || selected.length === 0}
          />
        ))}
      </div>
    </div>
  );
}
