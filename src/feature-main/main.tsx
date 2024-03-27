import { useCallback, useEffect, useMemo, useState } from 'react';
import { Maybe } from 'yup';
import {
  useAddTaskListMutation,
  useAddTaskMutation,
  useRemoveTaskMutation,
  useTasksQuery,
  useUpdateTaskMutation,
} from '../api';
import { CardList, Filter } from '../components';
import { TaskList } from '../components/task-list';

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
  const [tasks, setTasks] = useState<Array<Task>>([]);
  const [filterText, setFilterText] = useState<string>('');
  const [selected, setSelected] = useState<Array<number>>([]);

  const handleSetTasks = useCallback((p: Array<any>) => {
    setTasks(p);
  }, []);

  const { refetch, filter, ref } = useTasksQuery(handleSetTasks, filterText);

  const { mutate: addTask } = useAddTaskMutation(refetch);
  const { mutate: addTaskList } = useAddTaskListMutation(refetch);
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

  return (
    <div className="m-5 flex flex-col gap-4">
      <TaskList
        selected={selected}
        setSelected={setSelected}
        taskLists={taskLists}
        add={handleTaskListAdd}
      />

      <Filter abortControllerRef={ref} setFilterText={setFilterText} />
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
